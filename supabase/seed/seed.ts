import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

const supabase = createClient(url, key);

async function seed() {
  await supabase.from("alerts").upsert([
    {
      title: "Heavy Rain Warning",
      severity: "high",
      description: "Drainage stress expected around Ukkadam and Town Hall",
      status: "open"
    },
    {
      title: "Signal Fault - Gandhipuram",
      severity: "medium",
      description: "Signal phase mismatch detected",
      status: "investigating"
    }
  ]);

  await supabase.from("traffic_signals").upsert([
    {
      junction_name: "Gandhipuram",
      signal_status: "amber",
      duration: 80,
      coordinates: { lat: 11.0183, lng: 76.9674 },
      operational: true
    },
    {
      junction_name: "Race Course",
      signal_status: "green",
      duration: 60,
      coordinates: { lat: 11.0016, lng: 76.9645 },
      operational: true
    }
  ]);

  await supabase.from("pipelines").upsert([
    {
      zone_name: "West Zone",
      pressure: 58.2,
      flow_rate: 130.5,
      maintenance_status: "healthy"
    },
    {
      zone_name: "North Zone",
      pressure: 49.1,
      flow_rate: 118.3,
      maintenance_status: "inspection_due"
    }
  ]);

  await supabase.from("projects").upsert([
    {
      project_name: "Smart LED Corridor",
      budget: 12500000,
      progress: 68,
      status: "on_track",
      benefits: "Energy savings and safer roads",
      start_date: "2025-06-01",
      end_date: "2026-10-01"
    }
  ]);

  await supabase.from("environmental_data").insert([
    {
      location: "Town Hall",
      aqi: 84,
      temperature: 31.2,
      humidity: 61,
      rainfall: 4.3,
      wind_speed: 13.4
    },
    {
      location: "Ukkadam",
      aqi: 96,
      temperature: 30.1,
      humidity: 68,
      rainfall: 7.2,
      wind_speed: 11.2
    }
  ]);

  await supabase.from("ai_predictions").upsert([
    {
      title: "Monsoon Drainage Risk",
      prediction: "Central wards may face 20% overflow probability in next 12 hours.",
      confidence: 86,
      urgency: "high",
      recommendation: "Deploy pumping units near Ukkadam and low-lying lanes"
    }
  ]);

  console.log("Seed complete");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
