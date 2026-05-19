import { requireRole } from "@/lib/auth/session";
import { AdminIssueBoard } from "@/components/issues/admin-issue-board";

export default async function AdminIssuesPage() {
  await requireRole("employee");

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Issue Operations</h1>
      <p className="mt-2 text-neon-100/70">Realtime issue queue with assignment and closure workflow.</p>
      <div className="mt-6">
        <AdminIssueBoard />
      </div>
    </main>
  );
}
