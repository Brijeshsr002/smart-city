import { LoginForm } from "@/components/auth/login-form";

export default function SystemAccessPanelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <section className="glass w-full max-w-md rounded-2xl p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Restricted Entry</p>
        <h1 className="mt-2 text-2xl font-semibold">System Access Panel</h1>
        <p className="mt-1 text-sm text-neon-100/70">Authorized control-center personnel only.</p>
        <div className="mt-5">
          <LoginForm adminOnly />
        </div>
      </section>
    </main>
  );
}
