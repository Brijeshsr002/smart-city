# Coimbatore Smart City Control Center

Production-ready Smart City Management Platform built with Next.js 15 App Router and Supabase.

## Stack

- Next.js 15 + TypeScript + Tailwind CSS
- Supabase (Auth, Postgres, Realtime, Storage, RLS)
- React Query + Zustand + Framer Motion
- Recharts + React Leaflet
- React Hook Form + Zod + Sonner

## Core Modules

- Citizen login and guest access
- Hidden admin auth route at `/system-access-panel`
- Public dashboard with city overview, traffic, water and environmental indicators
- Public issue reporting with category, priority and GPS capture
- Admin issue operations with realtime status updates
- Alerts, analytics, employee and operations modules
- API validation, basic captcha hook, rate-limiting
- Role-based route and data protection design

## Role Model

- `public`: Dashboard access, report/track issues
- `employee`: Update assigned issues
- `manager`: Assign issues, manage alerts and employees
- `super_admin`: Full platform access and audit visibility

## Local Setup

1. Copy `.env.example` to `.env.local`
2. Fill Supabase keys and project URL
3. Run SQL migration in Supabase SQL Editor:
   - `supabase/migrations/202605190001_initial_schema.sql`
4. Install dependencies:
   - `npm install`
5. Run seed (optional):
   - `npm run seed`
6. Start dev server:
   - `npm run dev`

## Supabase Requirements

- Enable email/password auth
- Create storage bucket `issue-media` (migration includes it)
- Realtime publication enabled for configured tables
- Add your admin users and set role in `public.users`

## Deployment (Vercel)

1. Push repository to Git provider
2. Import project in Vercel
3. Add environment variables from `.env.example`
4. Set custom domain (`.com`) and DNS records
5. Redeploy

## Security Notes

- Middleware protects admin routes
- Zod validates all issue payloads
- API routes have request throttling
- Supabase RLS policies enforce row-level access controls
- HttpOnly secure cookies used where applicable

## VS Code-Friendly Structure

- `app/` route modules and API handlers
- `components/` UI and dashboard blocks
- `lib/` auth, security, validation, Supabase clients
- `hooks/` realtime hooks
- `store/` Zustand state
- `types/` shared domain types
- `supabase/` migrations and seed scripts

## Production Checklist

- Replace temporary captcha verifier with Turnstile or reCAPTCHA backend verification
- Configure SMTP for password reset emails
- Add Sentry/Datadog monitoring
- Add integration tests for auth and issue workflow
- Upload real Coimbatore image assets under `public/images/coimbatore`
