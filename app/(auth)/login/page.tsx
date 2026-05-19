import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { CitySlideshow } from "@/components/auth/city-slideshow";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#6a5cff_0%,_transparent_40%),radial-gradient(circle_at_bottom,_#3696ff_0%,_transparent_35%)]" />
      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2">
        <section className="glass rounded-3xl p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200">Citizen Access</p>
          <h1 className="mt-3 text-3xl font-semibold">Welcome Back</h1>
          <p className="mt-2 text-sm text-neon-100/75">Securely access smart city dashboards and services.</p>
          <div className="mt-6">
            <LoginForm />
          </div>
          <p className="mt-4 text-center text-sm text-neon-100/70">
            Continue without login? <Link href="/" className="text-cyan-200">Use Guest Access</Link>
          </p>
        </section>
        <CitySlideshow />
      </div>
    </main>
  );
}
