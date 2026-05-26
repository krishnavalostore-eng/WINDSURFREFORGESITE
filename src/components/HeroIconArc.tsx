import React from 'react';
import { Footprints, Dumbbell, Salad, PersonStanding, GlassWater, LucideIcon } from 'lucide-react';

interface ArcIcon {
  Icon: LucideIcon;
  /** angle in degrees, 0 = right, 90 = top, 180 = left */
  angle: number;
  delay: number;
}

const ICONS: ArcIcon[] = [
  { Icon: Footprints,     angle: 175, delay: 0    },
  { Icon: Dumbbell,       angle: 130, delay: 0.4  },
  { Icon: Salad,          angle: 90,  delay: 0.8  },
  { Icon: PersonStanding, angle: 50,  delay: 1.2  },
  { Icon: GlassWater,     angle: 5,   delay: 1.6  },
];

interface HeroIconArcProps {
  className?: string;
  /** Total width of the arc bounding box in px (mobile default). Scales by max-w. */
  width?: number;
}

export const HeroIconArc: React.FC<HeroIconArcProps> = ({ className = '', width = 360 }) => {
  const iconBox = 44; // mobile size
  const radius = (width - iconBox) / 2;
  const cx = width / 2;
  const cy = radius + iconBox / 2; // pivot near vertical center of half-circle
  const height = cy + iconBox / 2;

  return (
    <div
      className={`relative pointer-events-none select-none mx-auto ${className}`}
      style={{ width, maxWidth: '100%', height }}
    >
      {/* Cyan semicircle ring behind icons */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34,211,238,0.05)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.55)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.05)" />
          </linearGradient>
        </defs>
        {/* Outer faint full circle (just upper half visible) */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="1.2"
          opacity="0.9"
        />
        {/* Slightly larger glow ring */}
        <circle
          cx={cx}
          cy={cy}
          r={radius + 8}
          fill="none"
          stroke="rgba(34,211,238,0.08)"
          strokeWidth="14"
        />
      </svg>

      {ICONS.map(({ Icon, angle, delay }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad) - iconBox / 2;
        const y = cy - radius * Math.sin(rad) - iconBox / 2;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: x,
              top: y,
              width: iconBox,
              height: iconBox,
              animation: `arc-float 5s ease-in-out ${delay}s infinite`,
            }}
          >
            <div className="w-full h-full rounded-xl bg-slate-950/85 border border-cyan-400/55 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.18)]">
              <Icon className="w-[18px] h-[18px] text-cyan-300" strokeWidth={1.7} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes arc-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default HeroIconArc;
