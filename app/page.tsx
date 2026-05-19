import { TopNav } from "@/components/layout/top-nav";
import { StatCard } from "@/components/dashboard/stat-card";
import { IssueTrendChart } from "@/components/charts/issue-trend-chart";
import { EnvironmentChart } from "@/components/charts/environment-chart";
import { PredictionCards } from "@/components/dashboard/prediction-cards";
import { CityMapClient } from "@/components/map/city-map-client";
import { aiPredictions, environment, mapPoints, stats, trend } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="grid-bg min-h-screen pb-10">
      <TopNav />
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Government Intelligence Layer</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Coimbatore Smart City Control Center</h1>
        </div>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <StatCard key={item.title} title={item.title} value={item.value} delta={item.delta} index={idx} />
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-2">
          <IssueTrendChart data={trend} />
          <EnvironmentChart data={environment} />
        </section>

        <section className="mt-6">
          <CityMapClient markers={mapPoints} />
        </section>

        <section className="mt-6">
          <PredictionCards predictions={aiPredictions} />
        </section>
      </section>
    </main>
  );
}
