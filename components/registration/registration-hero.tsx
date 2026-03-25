"use client";

import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";

export function RegistrationHero() {
  return (
    <div className="relative min-h-[520px] flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10 z-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

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

        {/* Register Button */}
        <a
          href="#registration-form"
          className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none hover:scale-105"
        >
          <span className="text-lg">S'inscrire Maintenant</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
