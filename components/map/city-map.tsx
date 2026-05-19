"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type MarkerType = {
  id: string;
  title: string;
  lat: number;
  lng: number;
  status: string;
};

export function CityMap({ markers }: { markers: MarkerType[] }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="mb-3 text-sm font-semibold text-neon-100">Realtime City Map</p>
      <div className="h-80 overflow-hidden rounded-xl">
        <MapContainer center={[11.0168, 76.9558]} zoom={12} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker) => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup>
                <div>
                  <p className="font-semibold">{marker.title}</p>
                  <p>Status: {marker.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
