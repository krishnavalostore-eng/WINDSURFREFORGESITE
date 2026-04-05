import React from 'react';
import { ShieldAlert, Fingerprint, Activity } from 'lucide-react';

export const ForgeGuardSection = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden bg-black border-y border-system-neon/20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-system-neon/10 via-black to-black pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Icon Header */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-system-neon/20 blur-xl rounded-full animate-pulse"></div>
              <div className="w-20 h-20 bg-black border-2 border-system-neon rounded-2xl flex items-center justify-center relative z-10 transform rotate-45 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                <ShieldAlert className="w-10 h-10 text-system-neon -rotate-45" />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
            Introducing <span className="text-system-neon neon-text">ForgeGuard</span>
          </h2>

          {/* Main Description */}
          <div className="glass-panel border border-system-neon/30 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Scanline effect inside the box */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-system-neon/5 to-transparent h-full animate-scanline pointer-events-none"></div>
            
            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light mb-8">
              The Architect's ultimate countermeasure. <strong className="text-white font-bold">ForgeGuard</strong> is an advanced anti-cheat protocol designed to ensure absolute fairness within the System.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-black/50 border border-system-neon/20 p-6 rounded-xl flex items-start gap-4 hover:border-system-neon/50 transition-colors">
                <Activity className="w-8 h-8 text-system-neon shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">Anomaly Detection</h3>
                  <p className="text-slate-400 text-sm">Detects and neutralizes 99% of unauthorized system modifications and unnatural stat progressions.</p>
                </div>
              </div>

              <div className="bg-black/50 border border-system-neon/20 p-6 rounded-xl flex items-start gap-4 hover:border-system-neon/50 transition-colors">
                <Fingerprint className="w-8 h-8 text-system-neon shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider">Quest Verification</h3>
                  <p className="text-slate-400 text-sm">Strict validation protocols prevent fake quest completions. Only true effort yields rewards.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 inline-block border border-red-500/50 bg-red-500/10 px-6 py-3 rounded-full">
              <p className="text-red-400 font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Violators will be sent to the Penalty Zone
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
