import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Instagram, Globe } from 'lucide-react';

export const HunterRegistered = () => {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-rajdhani relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className={`max-w-xl w-full transition-all duration-1000 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-system-neon/30 shadow-[0_0_50px_rgba(37,99,235,0.2)] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-system-neon/5 to-transparent pointer-events-none"></div>
          
          <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center relative z-10">
             
             {/* Success Icon */}
             <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-dashed border-system-neon/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-system-neon/10 rounded-full flex items-center justify-center border border-system-neon shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    <CheckCircle2 className="w-8 h-8 text-system-neon" />
                  </div>
                </div>
             </div>

             <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-widest uppercase font-serif">
                Hunter <span className="text-system-neon">Registered</span>
             </h1>
             
             <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-system-neon/50"></div>
                <span className="text-system-neon font-mono text-[10px] tracking-[0.2em] uppercase font-bold animate-pulse">System Link Established</span>
                <div className="h-[1px] w-8 bg-system-neon/50"></div>
             </div>

             <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Your soul signature has been recorded. You are officially recognized as a Player.
             </p>

             {/* Instagram Promo Section (Moved Up) */}
             <div className="w-full bg-gradient-to-br from-purple-900/20 to-slate-800/50 rounded-2xl p-6 border border-purple-500/20 mb-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                   <Instagram className="w-24 h-24 text-purple-500 transform rotate-12" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                   <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 mb-3 shadow-lg shadow-purple-500/30">
                      <Instagram className="w-6 h-6 text-white" />
                   </div>
                   
                   <h2 className="text-lg font-bold text-white mb-2 font-serif">
                      Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">Community</span>
                   </h2>
                   
                   <p className="text-slate-300 text-xs mb-4 leading-relaxed max-w-xs">
                      Follow and Support our Instagram community. Your support means a lot to us!
                   </p>

                   <a 
                      href="https://www.instagram.com/reforged.system?igsh=b3YyeGV4MTFqOWdz" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-wider hover:from-purple-500 hover:to-pink-500 transition-all rounded-xl shadow-lg shadow-purple-500/20 group w-full justify-center text-sm"
                   >
                      <Instagram className="w-4 h-4" />
                      <span>Follow on Instagram</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </a>
                </div>
             </div>

             <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 font-bold uppercase tracking-wider hover:bg-slate-700 hover:text-white transition-all rounded-xl border border-slate-700 w-full justify-center group text-sm"
             >
                <Globe className="w-4 h-4" />
                <span>Continue to Web</span>
             </button>

          </div>
        </div>
      </div>
    </div>
  );
};
