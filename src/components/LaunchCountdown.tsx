import React, { useState, useEffect } from 'react';
import { Timer, Calendar, Zap } from 'lucide-react';

export const LaunchCountdown = () => {
  const calculateTimeLeft = () => {
    const launchDate = new Date('2026-03-23T12:30:00');
    const now = new Date();
    const difference = launchDate.getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 relative overflow-hidden bg-slate-900 border-y border-system-neon/20">
       {/* Background elements similar to system interface */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
       
       <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-system-neon font-mono text-sm tracking-[0.3em] uppercase mb-8 animate-pulse">
            <Zap className="w-4 h-4" />
            <span>System Initialization Imminent</span>
            <Zap className="w-4 h-4" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-serif tracking-wider uppercase drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]">
            Global <span className="text-system-neon">Launch</span>
          </h2>
          
          <p className="text-slate-400 text-lg md:text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
            The System is preparing to go online. All Hunters must be ready. The gates will open on <span className="text-white font-bold">March 23rd, 2026</span>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mb-8 md:mb-12">
             {/* Timer Blocks */}
             <div className="bg-slate-800/50 border border-system-neon/30 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-system-neon/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-mono mb-1 md:mb-2 relative z-10">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="text-system-neon text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold relative z-10">Days</div>
             </div>
             
             <div className="bg-slate-800/50 border border-system-neon/30 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-system-neon/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-mono mb-1 md:mb-2 relative z-10">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-system-neon text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold relative z-10">Hours</div>
             </div>
             
             <div className="bg-slate-800/50 border border-system-neon/30 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-system-neon/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-mono mb-1 md:mb-2 relative z-10">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-system-neon text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold relative z-10">Minutes</div>
             </div>

             <div className="bg-slate-800/50 border border-system-neon/30 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl backdrop-blur-sm relative group overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all duration-500 flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-system-neon/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-mono mb-1 md:mb-2 relative z-10">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-system-neon text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold relative z-10">Seconds</div>
             </div>
          </div>
          
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-system-neon/10 border border-system-neon/50 rounded-full text-system-neon font-mono text-sm md:text-base tracking-widest uppercase shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            <Calendar className="w-5 h-5" />
            <span>23.03.2026 // 12:30 PM</span>
          </div>
       </div>
    </section>
  );
};
