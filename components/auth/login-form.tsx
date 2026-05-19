"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const schema = loginSchema;
type FormValues = z.infer<typeof schema>;

export function LoginForm({ adminOnly = false }: { adminOnly?: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rememberMe: true }
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Authentication successful");
      router.push(adminOnly ? "/admin" : "/");
      router.refresh();
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-1 block text-sm text-neon-100/80">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-cyan-300"
          placeholder="official@coimbatore.gov.in"
        />
        {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1 block text-sm text-neon-100/80">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 outline-none focus:border-cyan-300"
        />
        {errors.password && <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>}
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-neon-100/70">
          <input type="checkbox" {...register("rememberMe")} />
          Remember me
        </label>
        {!adminOnly && (
          <a href="/forgot-password" className="text-cyan-200 hover:text-cyan-100">
            Forgot password?
          </a>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-[#6070ff] to-[#7f5bff] px-4 py-2 font-medium text-white shadow-neon disabled:opacity-50"
      >
        {pending ? "Signing in..." : adminOnly ? "Secure Admin Sign In" : "Sign In"}
      </button>
    </form>
  );
}
