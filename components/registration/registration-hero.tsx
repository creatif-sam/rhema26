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
  "/photos2025/photo5.jpg",
  "/photos2025/photo6.jpg",
  "/photos2025/photo7-overall.jpg",
  "/photos2025/photo8.jpg",
  "/photos2025/photo9.jpg",
];

export function RegistrationHero() {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 4000); // Change photo every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      {/* Animated Photo Collage Background */}
      <div className="absolute inset-0 z-0">
        {/* Main rotating photo with overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          {photos.map((photo, index) => (
            <div
              key={photo}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentPhotoIndex ? "opacity-30" : "opacity-0"
              }`}
            >
              <Image
                src={photo}
                alt={`RHEMA 2025 Event Photo ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-primary/50 backdrop-blur-[2px]" />
            </div>
          ))}
        </div>

        {/* Floating photo grid for desktop */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {/* Top left cluster */}
          <div className="absolute top-8 left-8 w-32 h-32 rounded-2xl overflow-hidden shadow-xl animate-float opacity-60 hover:opacity-90 transition-opacity">
            <Image src={photos[0]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute top-24 left-48 w-28 h-28 rounded-2xl overflow-hidden shadow-xl animate-float-delayed opacity-50 hover:opacity-90 transition-opacity">
            <Image src={photos[1]} alt="Event" fill className="object-cover" />
          </div>
          
          {/* Top right cluster */}
          <div className="absolute top-12 right-12 w-36 h-36 rounded-2xl overflow-hidden shadow-xl animate-float opacity-60 hover:opacity-90 transition-opacity">
            <Image src={photos[2]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute top-32 right-56 w-24 h-24 rounded-2xl overflow-hidden shadow-xl animate-float-slow opacity-50 hover:opacity-90 transition-opacity">
            <Image src={photos[3]} alt="Event" fill className="object-cover" />
          </div>

          {/* Bottom left cluster */}
          <div className="absolute bottom-16 left-16 w-28 h-28 rounded-2xl overflow-hidden shadow-xl animate-float-delayed opacity-60 hover:opacity-90 transition-opacity">
            <Image src={photos[4]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute bottom-32 left-52 w-32 h-32 rounded-2xl overflow-hidden shadow-xl animate-float opacity-50 hover:opacity-90 transition-opacity">
            <Image src={photos[5]} alt="Event" fill className="object-cover" />
          </div>

          {/* Bottom right cluster */}
          <div className="absolute bottom-20 right-20 w-28 h-28 rounded-2xl overflow-hidden shadow-xl animate-float-slow opacity-60 hover:opacity-90 transition-opacity">
            <Image src={photos[6]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute bottom-40 right-60 w-24 h-24 rounded-2xl overflow-hidden shadow-xl animate-float-delayed opacity-50 hover:opacity-90 transition-opacity">
            <Image src={photos[7]} alt="Event" fill className="object-cover" />
          </div>
        </div>

        {/* Mobile/Tablet photo corners */}
        <div className="lg:hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-20 h-20 rounded-xl overflow-hidden shadow-lg animate-float opacity-40">
            <Image src={photos[0]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute top-4 right-4 w-24 h-24 rounded-xl overflow-hidden shadow-lg animate-float-delayed opacity-40">
            <Image src={photos[2]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-xl overflow-hidden shadow-lg animate-float-slow opacity-40">
            <Image src={photos[4]} alt="Event" fill className="object-cover" />
          </div>
          <div className="absolute bottom-4 right-4 w-20 h-20 rounded-xl overflow-hidden shadow-lg animate-float opacity-40">
            <Image src={photos[6]} alt="Event" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/30 rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase text-primary mb-8 shadow-sm">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          8ème Édition · RHEMA 2026
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 leading-none">
          <span className="block text-foreground">Séminaire</span>
          <span className="block bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            RHEMA
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground italic mb-12 font-medium">
          Grandir ensemble dans la Parole et l'Esprit
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <div className="flex items-center gap-3 bg-white/95 border-2 border-border rounded-2xl px-5 py-3 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <FiCalendar className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">Dates</div>
              <div className="text-sm font-bold">15 – 17 Mai 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/95 border-2 border-border rounded-2xl px-5 py-3 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <FiMapPin className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">Lieu</div>
              <div className="text-sm font-bold">Casablanca, Maroc</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/95 border-2 border-border rounded-2xl px-5 py-3 backdrop-blur shadow-md hover:shadow-lg transition-shadow">
            <FiClock className="w-5 h-5 text-primary" />
            <div className="text-left">
              <div className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide">Ouverture</div>
              <div className="text-sm font-bold">Vendredi 19h – 21h</div>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer />
      </div>
    </div>
  );
}
