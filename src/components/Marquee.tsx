import React, { useState, useEffect } from 'react';

interface MarqueeItem {
  id: number;
  imageUrl: string;
  text: string;
}

const defaultItems: MarqueeItem[] = [
  { id: 1, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313293/Screenshot_2026-04-04_193750_vab3tw.png", text: "REALTIME AI PROGRESS TRACKING" },
  { id: 2, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313293/Screenshot_2026-04-04_193820_nnbrzs.png", text: "ACCOUNTABILITY MENTOR WHO CELEBRATES WINS AND ANALYSE FAILURES" },
  { id: 3, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313293/Screenshot_2026-04-04_193847_sihhog.png", text: "FOOD SCANNING" },
  { id: 4, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313294/Screenshot_2026-04-04_193934_ql6pzr.png", text: "PERSONALISED WORKOUT PLANS ACCORDING TO YOUR LIMITS" },
  { id: 5, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313294/Screenshot_2026-04-04_193951_zqnhtp.png", text: "TALK TO MENTOR/BUDDY" },
  { id: 6, imageUrl: "https://res.cloudinary.com/dmhauc0gn/image/upload/q_auto/f_auto/v1775313293/Screenshot_2026-04-04_194007_a9j86l.png", text: "CREATE AND COMPLETE REAL WORLD QUESTS" }
];

export const Marquee = () => {
  const [items, setItems] = useState<MarqueeItem[]>(defaultItems);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/marquee');
        const data = await res.json();
        if (data && data.length > 0) {
          setItems(data);
        }
      } catch (err) {
        console.error('Failed to fetch marquee items:', err);
      }
    };
    fetchItems();
  }, []);

  if (items.length === 0) return null;

  // Duplicate items to create a seamless loop
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-[#050b14] border-y border-blue-900/40">
      {/* Background Grid/Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="relative z-10 mb-16 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[1px] w-12 bg-blue-500/50"></div>
          <span className="text-blue-400 font-mono text-xs tracking-[0.4em] uppercase font-semibold">Visual Database</span>
          <div className="h-[1px] w-12 bg-blue-500/50"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white tracking-widest uppercase font-serif drop-shadow-[0_0_15px_rgba(37,99,235,0.4)]">
          System <span className="text-blue-500">Interface</span>
        </h2>
      </div>
      
      {/* Gradient Mask for fading edges */}
      <div className="relative w-full flex overflow-hidden group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] py-4">
          {displayItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="relative w-72 h-[400px] mx-4 shrink-0 rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] group/card cursor-pointer"
            >
              <img 
                src={item.imageUrl.includes('cloudinary.com') ? item.imageUrl.replace('/upload/', '/upload/q_auto:best,f_auto,e_sharpen:100,e_improve/') : item.imageUrl} 
                alt={item.text} 
                className="w-full h-full object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-700 group-hover/card:scale-105" 
                referrerPolicy="no-referrer" 
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent opacity-90 group-hover/card:opacity-80 transition-opacity duration-500"></div>
              
              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-2 mb-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
                    <span className="text-blue-400 font-mono text-[10px] tracking-widest uppercase">Record // {String(index + 1).padStart(3, '0')}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-wider uppercase border-l-2 border-blue-500 pl-4 group-hover/card:text-blue-50 transition-colors duration-300 whitespace-normal break-words leading-tight">
                    {item.text}
                  </h3>
                </div>
              </div>
              
              {/* Techy Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-2xl m-3 opacity-0 group-hover/card:opacity-100 transition-all duration-500 -translate-x-2 -translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500/40 rounded-br-2xl m-3 opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-x-2 translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
