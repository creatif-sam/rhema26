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
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Le compte à rebours a commencé !
        </h3>
        <p className="text-white/90 text-lg">
          15-17 Mai 2026 • 19h00
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl md:text-6xl font-bold text-white mb-2">
            {timeLeft.days}
          </div>
          <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">
            Jours
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl md:text-6xl font-bold text-white mb-2">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">
            Heures
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl md:text-6xl font-bold text-white mb-2">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">
            Minutes
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border-2 border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl md:text-6xl font-bold text-white mb-2">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <div className="text-white/80 text-sm md:text-base font-medium uppercase tracking-wider">
            Secondes
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a 
          href="#registration-form"
          className="inline-block bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 transition-colors duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
        >
          S&apos;inscrire Maintenant
        </a>
      </div>
    </div>
  );
}
