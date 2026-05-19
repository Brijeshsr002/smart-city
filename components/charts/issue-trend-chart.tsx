"use client";

import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export function IssueTrendChart({
  data
}: {
  data: Array<{ day: string; opened: number; closed: number }>;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="mb-3 text-sm font-semibold text-neon-100">Issue Trend</p>
      <div className="h-72 w-full">
        <ResponsiveContainer minWidth={280} minHeight={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
            <XAxis dataKey="day" stroke="#c4d2ff" />
            <YAxis stroke="#c4d2ff" />
            <Tooltip
              contentStyle={{ background: "#111a45", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10 }}
            />
            <Line type="monotone" dataKey="opened" stroke="#9d7bff" strokeWidth={2} />
            <Line type="monotone" dataKey="closed" stroke="#2af598" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
