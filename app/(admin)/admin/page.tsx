import { redirect } from "next/navigation";
import { TopNav } from "@/components/layout/top-nav";
import { requireRole } from "@/lib/auth/session";
import { StatCard } from "@/components/dashboard/stat-card";
import { IssueTrendChart } from "@/components/charts/issue-trend-chart";
import { PredictionCards } from "@/components/dashboard/prediction-cards";
import { aiPredictions, stats, trend } from "@/lib/mock-data";

export default async function AdminDashboardPage() {
  const session = await requireRole("employee");

  if (!session.user) {
    redirect("/system-access-panel");
  }

  return (
    <main className="min-h-screen pb-10">
      <TopNav />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Control Room</h1>
          <a href="/admin/issues" className="rounded-xl bg-neon-600 px-4 py-2 text-sm font-semibold">Manage Issues</a>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <StatCard key={item.title} title={item.title} value={item.value} delta={item.delta} index={idx} />
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <IssueTrendChart data={trend} />
          <PredictionCards predictions={aiPredictions} />
        </section>
      </section>
    </main>
  );
}
