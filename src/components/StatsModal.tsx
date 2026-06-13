import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Zap, Shield } from 'lucide-react';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, onAccept }) => {
  const [hunterName, setHunterName] = useState('SUNG JIN-WOO');
  const [frameReady, setFrameReady] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const storedName = localStorage.getItem('hunterName');
      if (storedName) {
        setHunterName(storedName.toUpperCase());
      } else {
        setHunterName('SUNG JIN-WOO');
      }
      setFrameReady(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) {
      setFrameReady(true);
    }
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      {/* Scan line effect on the whole background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 rounded-full z-[160]"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal Container */}
      <motion.div
        initial={{ scaleY: 0.02, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0.02, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[480px] md:max-w-[560px] aspect-[2400/1792] relative rounded-lg overflow-hidden select-none font-mono"
        style={{
          transformOrigin: '50% 50%',
          boxShadow: '0 0 50px rgba(0, 212, 255, 0.25)',
        }}
      >
        {/* Entrance Scan laser line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 0.65, times: [0, 0.6, 1], ease: 'easeOut' }}
          className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent shadow-[0_0_15px_#00d4ff] z-50 pointer-events-none"
        />

        {/* Floating Animation Layer */}
        <motion.div
          animate={{
            y: [0, -4, 0, 4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Status Frame Image */}
          <img
            ref={imgRef}
            src="/status-frame.jpg"
            alt="Status Window"
            onLoad={() => setFrameReady(true)}
            className={`absolute inset-0 w-full h-full object-fill transition-opacity duration-300 z-10 ${
              frameReady ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Skeletal Loader before image paints */}
          {!frameReady && (
            <div className="absolute inset-0 w-full h-full bg-[#040810] border-2 border-[#00d4ff]/30 rounded-lg flex items-center justify-center z-0">
              <div className="text-[#00d4ff] text-sm tracking-[0.2em] animate-pulse">SYNCHRONIZING TERMINAL...</div>
            </div>
          )}

          {/* Safe-zone overlay containing absolute elements */}
          {frameReady && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-[14%] right-[5%] bottom-[12%] left-[5%] flex flex-col justify-between p-4 z-20 text-white"
            >
              {/* Title Plate */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-1 bg-[#040a14] border border-[#00d4ff] rounded shadow-[0_0_10px_rgba(0,212,255,0.4)] text-[11px] font-black tracking-[0.3em] text-white uppercase text-shadow-glow z-30"
              >
                STATUS WINDOW
              </div>

              {/* Top Row: Name, Title & Level */}
              <div className="flex justify-between items-start pt-1.5 px-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 tracking-wider">NAME</span>
                  <span className="text-sm md:text-base font-bold text-white tracking-widest truncate max-w-[150px] md:max-w-[200px]">
                    {hunterName}
                  </span>
                  <span className="text-[8px] text-[#00d4ff] tracking-[0.15em] font-bold mt-0.5">SHADOW MONARCH</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 tracking-wider">LEVEL</span>
                  <span className="text-xl md:text-2xl font-bold text-white leading-none text-shadow-glow">
                    99
                  </span>
                  <span className="text-[8px] text-slate-400 tracking-[0.1em] mt-1">RANK: S</span>
                </div>
              </div>

              {/* Divider Line */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent my-1 md:my-2" />

              {/* Row 2: Stats Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 md:gap-y-3 px-3 py-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">STR</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">350</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">AGI</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">382</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">VIT</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">310</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">INT</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">415</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">SEN</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">328</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
                    <span className="text-[10px] text-slate-300 tracking-widest">WIL</span>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-white text-shadow-glow">390</span>
                </div>
              </div>

              {/* Divider Line */}
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent my-1 md:my-2" />

              {/* Row 3: XP Bar */}
              <div className="flex flex-col gap-1 px-2">
                <div className="flex justify-between items-center text-[8px] md:text-[9px] text-slate-400 font-bold tracking-wider">
                  <span>XP PROGRESS</span>
                  <span>99.9%</span>
                </div>
                <div className="h-2 w-full bg-[#00d4ff]/10 border border-[#00d4ff]/40 rounded-sm relative overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#00d4ff]/60 to-[#00d4ff] shadow-[0_0_8px_#00d4ff]" 
                    style={{ width: '99.9%' }}
                  />
                  <div 
                    className="absolute inset-0 bg-repeating-linear bg-[linear-gradient(90deg,transparent_0_12px,rgba(0,0,0,0.4)_12px_13px)]"
                  />
                </div>
              </div>

              {/* Row 4: Epic Pulsing 'ARISE' Button */}
              <div className="flex flex-col items-center justify-center mt-3 md:mt-4 z-30 pb-1.5">
                <button
                  onClick={onAccept}
                  className="px-10 py-2 bg-black/60 border border-[#00d4ff] text-white hover:text-[#00d4ff] hover:bg-slate-900/60 font-black tracking-[0.4em] text-sm md:text-base transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.6)] animate-pulse rounded"
                  style={{
                    textShadow: '0 0 8px rgba(0, 212, 255, 0.8)',
                  }}
                >
                  ARISE
                </button>
                <span className="text-[7px] md:text-[8px] text-[#00d4ff] tracking-[0.2em] font-bold uppercase mt-1.5 opacity-80 animate-pulse">
                  Click to Synchronize System
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};
