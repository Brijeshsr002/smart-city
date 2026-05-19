export const stats = [
  { title: "Active Issues", value: 128, delta: "+12% from yesterday" },
  { title: "Resolved Today", value: 47, delta: "+8% efficiency" },
  { title: "Live Alerts", value: 9, delta: "3 critical" },
  { title: "Traffic Signals Online", value: "96%", delta: "172 / 179 junctions" }
];

export const trend = [
  { day: "Mon", opened: 42, closed: 34 },
  { day: "Tue", opened: 48, closed: 41 },
  { day: "Wed", opened: 51, closed: 44 },
  { day: "Thu", opened: 45, closed: 49 },
  { day: "Fri", opened: 60, closed: 52 },
  { day: "Sat", opened: 38, closed: 40 },
  { day: "Sun", opened: 30, closed: 36 }
];

export const environment = [
  { label: "Zone A", aqi: 86, rainfall: 4 },
  { label: "Zone B", aqi: 72, rainfall: 2 },
  { label: "Zone C", aqi: 95, rainfall: 8 },
  { label: "Zone D", aqi: 65, rainfall: 1 }
];

export const mapPoints = [
  { id: "1", title: "Gandhipuram Junction", lat: 11.0183, lng: 76.9674, status: "Congestion" },
  { id: "2", title: "Race Course Signal", lat: 11.0016, lng: 76.9645, status: "Normal" },
  { id: "3", title: "Ukkadam Bus Stand", lat: 10.9891, lng: 76.9552, status: "Road repair" },
  { id: "4", title: "Town Hall", lat: 10.9979, lng: 76.9597, status: "Streetlight fault" }
];

export const aiPredictions = [
  {
    id: "1",
    title: "Flood Risk - Ukkadam",
    prediction: "Heavy rainfall may increase drainage overflow probability in 6 hours.",
    confidence: 87,
    urgency: "High"
  },
  {
    id: "2",
    title: "Traffic Spike - Gandhipuram",
    prediction: "Predicting 18% traffic surge between 5 PM and 7 PM due to event activity.",
    confidence: 79,
    urgency: "Medium"
  },
  {
    id: "3",
    title: "Water Pressure Drop",
    prediction: "Likely pressure drop in West Zone pipeline segment P-12.",
    confidence: 83,
    urgency: "High"
  }
];
