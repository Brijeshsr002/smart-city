import type { UserRole } from "@/types/domain";

const hierarchy: Record<UserRole, number> = {
  public: 0,
  employee: 1,
  manager: 2,
  super_admin: 3
};

export function hasMinimumRole(current: UserRole | null, required: UserRole) {
  if (!current) return false;
  return hierarchy[current] >= hierarchy[required];
}

export function canAssignIssues(role: UserRole | null) {
  return hasMinimumRole(role, "manager");
}

export function canManageEmployees(role: UserRole | null) {
  return hasMinimumRole(role, "manager");
}

export function canViewAdmin(role: UserRole | null) {
  return hasMinimumRole(role, "employee");
}
