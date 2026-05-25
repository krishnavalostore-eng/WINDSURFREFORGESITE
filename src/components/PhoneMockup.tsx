import React from 'react';
import { Bell, Flame, CheckCircle2, TrendingUp } from 'lucide-react';

/**
 * Stylized iPhone-style mockup with a Reforge dashboard placeholder screen.
 * Pure CSS / SVG — no external image asset required.
 */
export const PhoneMockup: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Cyan glow halo */}
      <div className="absolute -inset-8 bg-cyan-500/20 blur-3xl rounded-[3rem] pointer-events-none" />

      <div
        className="relative animate-phone-float"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Phone body */}
        <div className="relative w-[220px] sm:w-[260px] md:w-[280px] aspect-[9/19] rounded-[2.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-black p-[6px] shadow-[0_30px_80px_-10px_rgba(6,182,212,0.5),0_0_60px_-10px_rgba(34,211,238,0.4)] border border-slate-700/60">
          {/* Inner bezel */}
          <div className="w-full h-full rounded-[2.1rem] overflow-hidden bg-gradient-to-br from-[#031927] via-[#082f49] to-[#0e7490] relative">
            {/* Dynamic island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-20" />

            {/* Screen content */}
            <div className="absolute inset-0 pt-10 px-4 pb-4 flex flex-col gap-3 text-white">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-cyan-200/70 tracking-wider">Welcome Back</p>
                  <p className="text-sm font-semibold text-white">Hunter</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-xl font-bold leading-tight">Daily<br/>Insights</h3>
              </div>

              {/* Big stat card */}
              <div className="rounded-2xl bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/30 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] text-cyan-200/70 tracking-wider uppercase">Progress</p>
                    <p className="text-2xl font-bold text-cyan-300">89<span className="text-sm">%</span></p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-cyan-300" />
                </div>
                <div className="mt-2 h-1.5 bg-slate-900/60 rounded-full overflow-hidden">
                  <div className="h-full w-[89%] bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-full" />
                </div>
              </div>

              {/* Reminder row */}
              <div className="rounded-xl bg-slate-900/50 border border-cyan-500/15 p-2.5 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-white truncate">Break Negative Patterns</p>
                  <p className="text-[8px] text-cyan-200/60">17 min · Meditation</p>
                </div>
              </div>

              {/* Bottom row stats */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <div className="rounded-xl bg-slate-900/60 border border-cyan-500/15 p-2">
                  <p className="text-[8px] text-cyan-200/60 uppercase tracking-wider">Streak</p>
                  <p className="text-base font-bold text-white">15<span className="text-[9px] text-cyan-300 ml-1">days</span></p>
                  <div className="mt-1 relative w-7 h-7">
                    <svg viewBox="0 0 36 36" className="w-7 h-7 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#0f172a" strokeWidth="3" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#22d3ee" strokeWidth="3" strokeDasharray="65 100" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-900/60 border border-cyan-500/15 p-2">
                  <p className="text-[8px] text-cyan-200/60 uppercase tracking-wider">Weekly</p>
                  <p className="text-base font-bold text-white">5<span className="text-[9px] text-cyan-300 ml-1">/7</span></p>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-10 bg-slate-700 rounded-l" />
        <div className="absolute -left-[3px] top-40 w-[3px] h-16 bg-slate-700 rounded-l" />
        <div className="absolute -right-[3px] top-32 w-[3px] h-20 bg-slate-700 rounded-r" />
      </div>
    </div>
  );
};

export default PhoneMockup;
