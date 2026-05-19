"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { issueSchema } from "@/lib/validation/schemas";
import { toast } from "sonner";

const schema = issueSchema;

type FormValues = z.infer<typeof schema>;

export function IssueForm() {
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "road_damage",
      priority: "medium",
      department: "Public Works",
      latitude: 11.0168,
      longitude: 76.9558
    }
  });

  const grabLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is unavailable in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setValue("latitude", Number(coords.latitude.toFixed(6)));
        setValue("longitude", Number(coords.longitude.toFixed(6)));
        toast.success("GPS location captured.");
      },
      () => toast.error("Failed to fetch location. Please fill manually.")
    );
  };

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        toast.error("Failed to report issue.");
        return;
      }

      const result = await response.json();
      setTrackingId(result.trackingId);
      toast.success("Issue submitted successfully.");
    });
  };

  return (
    <section className="glass mx-auto w-full max-w-3xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Public Smart City Issues</h2>
      <p className="mt-1 text-sm text-neon-100/70">Report civic issues with media and GPS coordinates.</p>

      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm">Issue title</label>
          <input {...register("title")} className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" />
          {errors.title && <p className="text-xs text-red-300">{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm">Description</label>
          <textarea {...register("description")} rows={5} className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm">Category</label>
          <select {...register("category")} className="w-full rounded-xl border border-white/20 bg-[#131b49] px-3 py-2">
            <option value="water_leakage">Water leakage</option>
            <option value="road_damage">Road damage</option>
            <option value="garbage">Garbage</option>
            <option value="traffic_issue">Traffic issue</option>
            <option value="street_light_issue">Street light issue</option>
            <option value="drainage">Drainage</option>
            <option value="public_safety">Public safety</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm">Priority</label>
          <select {...register("priority")} className="w-full rounded-xl border border-white/20 bg-[#131b49] px-3 py-2">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm">Latitude</label>
          <input type="number" step="0.000001" {...register("latitude", { valueAsNumber: true })} className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" />
        </div>

        <div>
          <label className="mb-1 block text-sm">Longitude</label>
          <input type="number" step="0.000001" {...register("longitude", { valueAsNumber: true })} className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2" />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <button type="button" onClick={grabLocation} className="rounded-xl border border-cyan-300/50 px-4 py-2 text-cyan-200">
            Auto GPS Location
          </button>
          <input type="text" {...register("mediaUrl")} placeholder="Uploaded media URL" className="flex-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" disabled={pending} className="w-full rounded-xl bg-gradient-to-r from-[#597dff] to-[#8e57ff] px-4 py-3 font-semibold">
            {pending ? "Submitting..." : "Submit Issue"}
          </button>
        </div>
      </form>

      {trackingId && (
        <div className="mt-5 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-3 text-sm text-emerald-200">
          Issue registered. Your tracking ID: <strong>{trackingId}</strong>
        </div>
      )}
    </section>
  );
}
