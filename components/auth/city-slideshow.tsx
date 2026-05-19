"use client";

import { useEffect, useState } from "react";

const slides = [
  { label: "Gandhipuram", src: "/images/coimbatore/gandhipuram.jpg" },
  { label: "Race Course", src: "/images/coimbatore/race-course.jpg" },
  { label: "Ukkadam", src: "/images/coimbatore/ukkadam.jpg" },
  { label: "Town Hall", src: "/images/coimbatore/town-hall.jpg" },
  { label: "Brookefields", src: "/images/coimbatore/brookefields.jpg" },
  { label: "Smart Roads", src: "/images/coimbatore/smart-roads.jpg" },
  { label: "Coimbatore Skyline", src: "/images/coimbatore/skyline.jpg" }
];

export function CitySlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="glass relative hidden h-[500px] overflow-hidden rounded-3xl md:block">
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.label}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b1ef0] to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-[#050817cc] p-4 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Live City View</p>
        <p className="mt-1 text-lg font-semibold">{slides[index]?.label}</p>
      </div>
    </section>
  );
}
