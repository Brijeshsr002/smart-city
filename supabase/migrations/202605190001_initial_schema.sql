-- Coimbatore Smart City Control Center schema
create extension if not exists "uuid-ossp";

create type user_role as enum ('public', 'employee', 'manager', 'super_admin');
create type issue_status as enum ('new', 'assigned', 'in_progress', 'resolved', 'rejected');
create type issue_priority as enum ('low', 'medium', 'high', 'critical');

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role user_role not null default 'public',
  department text,
  created_at timestamptz not null default now()
);

create table if not exists public.issues (
  id uuid primary key default uuid_generate_v4(),
  tracking_id text unique not null,
  title text not null,
  description text not null,
  category text not null,
  priority issue_priority not null default 'medium',
  status issue_status not null default 'new',
  image_url text,
  proof_image_url text,
  latitude double precision,
  longitude double precision,
  reported_by uuid references public.users(id),
  assigned_to uuid references public.users(id),
  fixed_by uuid references public.users(id),
  fixed_date timestamptz,
  department text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.issue_updates (
  id uuid primary key default uuid_generate_v4(),
  issue_id uuid not null references public.issues(id) on delete cascade,
  updated_by uuid references public.users(id),
  old_status issue_status,
  new_status issue_status not null,
  notes text,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  severity text not null,
  description text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists public.traffic_signals (
  id uuid primary key default uuid_generate_v4(),
  junction_name text not null,
  signal_status text not null,
  duration integer not null default 60,
  coordinates jsonb not null,
  operational boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.pipelines (
  id uuid primary key default uuid_generate_v4(),
  zone_name text not null,
  pressure numeric(8,2) not null,
  flow_rate numeric(8,2) not null,
  maintenance_status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  project_name text not null,
  budget numeric(14,2) not null,
  progress integer not null default 0,
  status text not null,
  benefits text,
  start_date date,
  end_date date
);

create table if not exists public.environmental_data (
  id uuid primary key default uuid_generate_v4(),
  location text not null,
  aqi integer not null,
  temperature numeric(5,2),
  humidity numeric(5,2),
  rainfall numeric(8,2),
  wind_speed numeric(8,2),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_predictions (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  prediction text not null,
  confidence integer not null check (confidence >= 0 and confidence <= 100),
  urgency text not null,
  recommendation text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  actor_id uuid references public.users(id),
  action text not null,
  entity text not null,
  entity_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger issues_updated_at
before update on public.issues
for each row execute function public.handle_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), new.email, 'public')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_auth_user();

alter table public.users enable row level security;
alter table public.issues enable row level security;
alter table public.issue_updates enable row level security;
alter table public.alerts enable row level security;
alter table public.traffic_signals enable row level security;
alter table public.pipelines enable row level security;
alter table public.projects enable row level security;
alter table public.environmental_data enable row level security;
alter table public.ai_predictions enable row level security;
alter table public.audit_logs enable row level security;

create or replace function public.current_user_role()
returns user_role language sql stable as $$
  select role from public.users where id = auth.uid();
$$;

create policy "Users can read own profile"
on public.users for select
using (id = auth.uid() or public.current_user_role() in ('manager', 'super_admin'));

create policy "Super admin manages users"
on public.users for all
using (public.current_user_role() = 'super_admin')
with check (public.current_user_role() = 'super_admin');

create policy "Public can read issues"
on public.issues for select
using (true);

create policy "Authenticated can create issues"
on public.issues for insert
with check (auth.uid() is not null or true);

create policy "Employees update issues"
on public.issues for update
using (public.current_user_role() in ('employee', 'manager', 'super_admin'))
with check (public.current_user_role() in ('employee', 'manager', 'super_admin'));

create policy "Issue updates readable"
on public.issue_updates for select
using (true);

create policy "Staff create issue updates"
on public.issue_updates for insert
with check (public.current_user_role() in ('employee', 'manager', 'super_admin'));

create policy "Public can read city datasets"
on public.alerts for select using (true);
create policy "Public can read traffic"
on public.traffic_signals for select using (true);
create policy "Public can read pipelines"
on public.pipelines for select using (true);
create policy "Public can read projects"
on public.projects for select using (true);
create policy "Public can read environmental"
on public.environmental_data for select using (true);
create policy "Public can read ai"
on public.ai_predictions for select using (true);

create policy "Managers maintain alerts"
on public.alerts for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Managers maintain operations"
on public.traffic_signals for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Managers maintain pipelines"
on public.pipelines for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Managers maintain projects"
on public.projects for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Managers maintain environmental"
on public.environmental_data for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Managers maintain ai"
on public.ai_predictions for all
using (public.current_user_role() in ('manager', 'super_admin'))
with check (public.current_user_role() in ('manager', 'super_admin'));

create policy "Super admin reads audit"
on public.audit_logs for select
using (public.current_user_role() = 'super_admin');

insert into storage.buckets (id, name, public)
values ('issue-media', 'issue-media', true)
on conflict (id) do nothing;

create policy "Public upload issue media"
on storage.objects for insert to authenticated
with check (bucket_id = 'issue-media');

create policy "Public read issue media"
on storage.objects for select
using (bucket_id = 'issue-media');

alter publication supabase_realtime add table public.issues;
alter publication supabase_realtime add table public.issue_updates;
alter publication supabase_realtime add table public.alerts;
alter publication supabase_realtime add table public.traffic_signals;
alter publication supabase_realtime add table public.pipelines;
alter publication supabase_realtime add table public.environmental_data;
