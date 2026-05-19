import { requireRole } from "@/lib/auth/session";

export default async function AnalyticsPage() {
  await requireRole("employee");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Smart City Analytics</h1>
      <p className="mt-2 text-neon-100/70">Cross-department KPIs, trends, and AI-assisted forecasts.</p>
    </main>
  );
}
