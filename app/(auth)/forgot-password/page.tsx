import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="glass w-full max-w-md rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="mt-2 text-sm text-neon-100/70">Use Supabase Auth reset email workflow from your auth provider settings.</p>
        <Link href="/login" className="mt-5 inline-block text-cyan-200">Back to login</Link>
      </div>
    </main>
  );
}
