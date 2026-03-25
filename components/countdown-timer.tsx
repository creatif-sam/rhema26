'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-05-15T19:00:00').getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-3xl font-bold text-red-600 mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Le compte à rebours a commencé !
        </h3>
        <p className="text-red-700 font-semibold text-base md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          15-17 Mai 2026 • 19h00
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-red-600 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-red-600 mb-1 md:mb-2">
            {timeLeft.days}
          </div>
          <div className="text-red-700 text-xs md:text-base font-bold uppercase tracking-wide">
            Jours
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-red-600 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-red-600 mb-1 md:mb-2">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-red-700 text-xs md:text-base font-bold uppercase tracking-wide">
            Heures
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-red-600 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-red-600 mb-1 md:mb-2">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-red-700 text-xs md:text-base font-bold uppercase tracking-wide">
            Minutes
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-red-600 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-red-600 mb-1 md:mb-2">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-red-700 text-xs md:text-base font-bold uppercase tracking-wide">
            Secondes
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <a 
          href="#registration-form"
          className="inline-block bg-white text-red-600 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          S&apos;inscrire Maintenant
        </a>
      </div>
    </div>
  );
}
