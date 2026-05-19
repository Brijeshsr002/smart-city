import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/domain";

export async function getServerSession() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, role: null as UserRole | null };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  return { user, role: (profile?.role as UserRole | null) ?? "public" };
}

export async function requireRole(minRole: UserRole) {
  const session = await getServerSession();
  const order: Record<UserRole, number> = {
    public: 0,
    employee: 1,
    manager: 2,
    super_admin: 3
  };

  if (!session.user || !session.role || order[session.role] < order[minRole]) {
    redirect("/login");
  }

  return session;
}
