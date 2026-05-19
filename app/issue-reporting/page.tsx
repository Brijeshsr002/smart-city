import { TopNav } from "@/components/layout/top-nav";
import { IssueForm } from "@/components/issues/issue-form";

export default function IssueReportingPage() {
  return (
    <main className="min-h-screen">
      <TopNav />
      <div className="mx-auto max-w-7xl px-4 py-10">
        <IssueForm />
      </div>
    </main>
  );
}
