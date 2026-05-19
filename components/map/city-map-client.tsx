"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/city-map").then((mod) => mod.CityMap), {
  ssr: false
});

type MarkerType = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  status: string;
};

export function CityMapClient({ markers }: { markers: MarkerType[] }) {
  return <Map markers={markers} />;
}
