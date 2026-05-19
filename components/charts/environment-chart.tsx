"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function EnvironmentChart({
  data
}: {
  data: Array<{ label: string; aqi: number; rainfall: number }>;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="mb-3 text-sm font-semibold text-neon-100">Environment Monitoring</p>
      <div className="h-72 w-full">
        <ResponsiveContainer minWidth={280} minHeight={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#59b3ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#59b3ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" stroke="#c4d2ff" />
            <YAxis stroke="#c4d2ff" />
            <Tooltip contentStyle={{ background: "#111a45", border: "1px solid rgba(255,255,255,0.15)" }} />
            <Area type="monotone" dataKey="aqi" stroke="#59b3ff" fill="url(#aqiGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
