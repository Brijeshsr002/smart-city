export type UserRole = "public" | "employee" | "manager" | "super_admin";

export type IssueStatus = "new" | "assigned" | "in_progress" | "resolved" | "rejected";

export type IssuePriority = "low" | "medium" | "high" | "critical";

export type IssueCategory =
  | "water_leakage"
  | "road_damage"
  | "garbage"
  | "traffic_issue"
  | "street_light_issue"
  | "drainage"
  | "public_safety";

export interface DashboardStat {
  label: string;
  value: number | string;
  delta: string;
}
