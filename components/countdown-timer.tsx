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
        <h3 className="text-xl md:text-3xl font-bold text-red-600 mb-2 drop-shadow-[0_3px_6px_rgba(0,0,0,0.9)] [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]">
          Le compte à rebours a commencé !
        </h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 md:gap-6">
        <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
            {timeLeft.days}
          </div>
          <div className="text-white/95 text-xs md:text-base font-bold uppercase tracking-wide">
            Jours
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-white/95 text-xs md:text-base font-bold uppercase tracking-wide">
            Heures
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-white/95 text-xs md:text-base font-bold uppercase tracking-wide">
            Minutes
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 via-red-500 to-orange-500 rounded-xl md:rounded-2xl p-3 md:p-6 border-2 border-white/30 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-3xl md:text-6xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-white/95 text-[9px] md:text-base font-bold uppercase tracking-wide">
            <span className="md:hidden">Sec</span>
            <span className="hidden md:inline">Secondes</span>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 text-center">
        <a 
          href="#registration-form"
          className="inline-block bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg border-2 border-white/30 hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          S&apos;inscrire Maintenant
        </a>
      </div>
    </div>
  );
}
