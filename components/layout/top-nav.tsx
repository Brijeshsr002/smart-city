"use client";

import Link from "next/link";
import { Bell, Building2, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Public Dashboard" },
  { href: "/issue-reporting", label: "Report Issues" },
  { href: "/login", label: "Citizen Login" }
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b1ecc] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-neon-600/20 p-2">
            <Building2 className="h-5 w-5 text-neon-100" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-neon-100/70">Control Center</p>
            <p className="font-semibold">Coimbatore Smart City</p>
          </div>
        </div>
        <nav className="hidden items-center gap-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                pathname === item.href ? "bg-neon-600 text-white" : "text-neon-100/80 hover:bg-white/10"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-neon-100" />
          <ShieldCheck className="h-4 w-4 text-green-300" />
        </div>
      </div>
    </header>
  );
}
