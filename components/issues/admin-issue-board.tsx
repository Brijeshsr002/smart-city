"use client";

import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRealtimeTable } from "@/hooks/use-realtime-table";

type Issue = {
  id: string;
  tracking_id: string;
  title: string;
  category: string;
  priority: string;
  status: string;
};

async function fetchIssues(): Promise<Issue[]> {
  const response = await fetch("/api/issues", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch issues");
  return response.json();
}

export function AdminIssueBoard() {
  const queryClient = useQueryClient();
  const refresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["issues"] });
  }, [queryClient]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: fetchIssues
  });

  useRealtimeTable("issues", refresh);

  const updateStatus = async (id: string, status: string) => {
    const response = await fetch(`/api/issues/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes: `Updated to ${status}` })
    });

    if (!response.ok) {
      toast.error("Status update failed");
      return;
    }

    toast.success("Issue status updated");
    refresh();
  };

  if (isLoading) {
    return <div className="rounded-2xl border border-white/10 p-6">Loading issues...</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/10">
          <tr>
            <th className="px-4 py-3">Tracking ID</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((issue) => (
            <tr key={issue.id} className="border-t border-white/10">
              <td className="px-4 py-3">{issue.tracking_id}</td>
              <td className="px-4 py-3">{issue.title}</td>
              <td className="px-4 py-3">{issue.category}</td>
              <td className="px-4 py-3">{issue.priority}</td>
              <td className="px-4 py-3">{issue.status}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  <button className="rounded-lg border border-white/20 px-2 py-1" onClick={() => updateStatus(issue.id, "assigned")}>
                    Assign
                  </button>
                  <button className="rounded-lg border border-white/20 px-2 py-1" onClick={() => updateStatus(issue.id, "in_progress")}>
                    In Progress
                  </button>
                  <button className="rounded-lg border border-green-300/40 px-2 py-1" onClick={() => updateStatus(issue.id, "resolved")}>
                    Resolve
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
