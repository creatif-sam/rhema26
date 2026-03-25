"use client";

import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CountdownTimer } from "@/components/countdown-timer";

const photos = [
  "/photos2025/photo1.jpg",
  "/photos2025/photo2.jpg",
  "/photos2025/photo3.jpg",
  "/photos2025/photo4.jpg",
];

export function RegistrationHero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 5000); // Change photo every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
      {/* Photo Slider Background */}
      <div className="absolute inset-0 z-0">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentPhotoIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={photo}
              alt={`RHEMA 2026 Photo ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#51bfc8]/30 via-transparent to-[#b82938]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase text-white mb-8 shadow-sm">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          8ème Édition · RHEMA 2026
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 leading-none">
          <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">Séminaire</span>
          <span className="block text-[#51bfc8] drop-shadow-[0_4px_12px_rgba(81,191,200,0.8)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
            RHEMA
          </span>
        </h1>

        <p className="text-lg md:text-xl text-red-500 italic mb-12 font-bold drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
          Grandir ensemble dans la Parole et l'Esprit
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <div className="flex items-center gap-3 bg-white/95 border-2 border-[#b82938] rounded-2xl px-5 py-3 backdrop-blur shadow-xl hover:shadow-2xl transition-shadow">
            <FiCalendar className="w-5 h-5 text-[#b82938]" />
            <div className="text-left">
              <div className="text-[11px] text-[#b82938] font-semibold uppercase tracking-wide">Dates</div>
              <div className="text-sm font-bold text-[#51bfc8]">15 – 17 Mai 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/95 border-2 border-[#b82938] rounded-2xl px-5 py-3 backdrop-blur shadow-xl hover:shadow-2xl transition-shadow">
            <FiMapPin className="w-5 h-5 text-[#b82938]" />
            <div className="text-left">
              <div className="text-[11px] text-[#b82938] font-semibold uppercase tracking-wide">Lieu</div>
              <div className="text-sm font-bold text-[#51bfc8]">Casablanca, Maroc</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/95 border-2 border-[#b82938] rounded-2xl px-5 py-3 backdrop-blur shadow-xl hover:shadow-2xl transition-shadow">
            <FiClock className="w-5 h-5 text-[#b82938]" />
            <div className="text-left">
              <div className="text-[11px] text-[#b82938] font-semibold uppercase tracking-wide">Ouverture</div>
              <div className="text-sm font-bold text-[#51bfc8]">Vendredi 19h – 21h</div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer />
      </div>

      {/* Photo Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPhotoIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentPhotoIndex
                ? "w-10 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
