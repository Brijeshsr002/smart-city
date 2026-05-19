import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(6).max(120),
  description: z.string().min(20).max(2000),
  category: z.enum([
    "water_leakage",
    "road_damage",
    "garbage",
    "traffic_issue",
    "street_light_issue",
    "drainage",
    "public_safety"
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  latitude: z.number().min(8).max(14),
  longitude: z.number().min(74).max(82),
  department: z.string().min(2).max(60),
  captchaToken: z.string().optional(),
  mediaUrl: z.string().url().optional()
});

export const issueStatusUpdateSchema = z.object({
  issueId: z.string().uuid(),
  status: z.enum(["assigned", "in_progress", "resolved", "rejected"]),
  notes: z.string().min(5).max(500),
  imageUrl: z.string().url().optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean().optional()
});

export const employeeSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  role: z.enum(["employee", "manager", "super_admin"]),
  department: z.string().min(2).max(80)
});
