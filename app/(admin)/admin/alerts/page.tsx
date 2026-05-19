import { requireRole } from "@/lib/auth/session";

export default async function AlertsPage() {
  await requireRole("manager");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Alert Management</h1>
      <p className="mt-2 text-neon-100/70">Realtime critical alerts from traffic, water, and environment systems appear here.</p>
    </main>
  );
}
