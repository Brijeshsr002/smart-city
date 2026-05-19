"use client";

import { motion } from "framer-motion";

export function StatCard({
  title,
  value,
  delta,
  index
}: {
  title: string;
  value: string | number;
  delta: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
      className="glass neon-ring rounded-2xl p-5"
    >
      <p className="text-xs uppercase tracking-[0.15em] text-neon-100/70">{title}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-cyan-200">{delta}</p>
    </motion.article>
  );
}
