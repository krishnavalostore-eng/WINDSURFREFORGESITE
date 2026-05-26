import React, { useState } from 'react';

/**
 * Tilted iPhone-style mockup that displays the real Reforge app screenshot
 * (placed at /public/app-screenshot.png). Falls back to a cyan gradient
 * if the image isn't found.
 */
interface PhoneMockupProps {
  className?: string;
  src?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  className = '',
  src = '/app-screenshot.png',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ perspective: '1400px' }}>
      {/* Offset cyan halo behind */}
      <div
        className="absolute -inset-10 md:-inset-16 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 70%, rgba(34,211,238,0.35) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Tilted phone */}
      <div className="relative animate-phone-float will-change-transform">
        <div className="relative w-[180px] sm:w-[230px] md:w-[270px] lg:w-[300px] aspect-[9/19.5] rounded-[2.5rem] p-[5px] bg-gradient-to-br from-slate-700 via-slate-800 to-black shadow-[0_40px_80px_-15px_rgba(6,182,212,0.55),0_0_80px_-20px_rgba(34,211,238,0.45),0_0_0_1px_rgba(103,232,249,0.18)]">
          {/* Inner screen */}
          <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-black">
            {!imgFailed ? (
              <img
                src={src}
                alt="Reforge app interface"
                onError={() => setImgFailed(true)}
                className="absolute inset-0 w-full h-full object-cover object-top"
                draggable={false}
              />
            ) : (
              <FallbackScreen />
            )}

            {/* Notch / dynamic island */}
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[34%] h-5 sm:h-6 bg-black rounded-full z-10" />

            {/* Subtle screen reflection */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 35%, transparent 70%, rgba(34,211,238,0.12) 100%)',
              }}
            />
          </div>

          {/* Side buttons */}
          <div className="absolute -left-[3px] top-24 w-[3px] h-9 bg-slate-700 rounded-l" />
          <div className="absolute -left-[3px] top-36 w-[3px] h-16 bg-slate-700 rounded-l" />
          <div className="absolute -right-[3px] top-32 w-[3px] h-20 bg-slate-700 rounded-r" />
        </div>
      </div>
    </div>
  );
};

const FallbackScreen: React.FC = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#031927] via-[#082f49] to-[#0e7490] flex flex-col items-center justify-center text-cyan-100 p-6 text-center">
    <div className="w-12 h-12 rounded-full border-2 border-cyan-300/60 mb-4 flex items-center justify-center">
      <span className="text-2xl font-bold">R</span>
    </div>
    <p className="text-sm font-semibold tracking-wider">REFORGE</p>
    <p className="text-[10px] text-cyan-200/70 mt-2 max-w-[80%]">
      App preview loading…<br />
      Drop <code className="text-cyan-300">app-screenshot.png</code> into <code className="text-cyan-300">/public</code>
    </p>
  </div>
);

export default PhoneMockup;
