import React from 'react';
import { Instagram, ArrowRight } from 'lucide-react';

export const InstagramPromo = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-slate-900 border-b border-system-neon/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(168,85,247,0.15)] flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
          
          {/* Decorative Background Elements */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl group-hover:bg-purple-600/30 transition-all duration-500"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-pink-600/20 rounded-full blur-3xl group-hover:bg-pink-600/30 transition-all duration-500"></div>

          {/* Icon Section */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 p-1 shadow-lg shadow-purple-500/30 animate-pulse">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 via-red-500/20 to-purple-600/20"></div>
                 <Instagram className="w-12 h-12 md:w-16 md:h-16 text-white relative z-10" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-2 border border-slate-700">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
              Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500">Hunter Community</span>
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Follow us on Instagram for exclusive updates, behind-the-scenes content, and to connect with fellow Hunters. Your support fuels the System!
            </p>

            <a 
              href="https://www.instagram.com/reforged.system?igsh=b3YyeGV4MTFqOWdz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold uppercase tracking-widest hover:from-purple-500 hover:to-pink-500 transition-all rounded-xl shadow-lg shadow-purple-500/20 group transform hover:-translate-y-1"
            >
              <Instagram className="w-5 h-5" />
              <span>Follow Our Community</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
