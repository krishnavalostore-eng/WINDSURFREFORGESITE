import React from 'react';
import { Footprints, Dumbbell, Salad, PersonStanding, GlassWater, LucideIcon } from 'lucide-react';

interface ArcIcon {
  Icon: LucideIcon;
  /** angle in degrees, 0 = right, 90 = top, 180 = left */
  angle: number;
  delay: number;
}

const ICONS: ArcIcon[] = [
  { Icon: Footprints,     angle: 178, delay: 0    },
  { Icon: Dumbbell,       angle: 130, delay: 0.4  },
  { Icon: Salad,          angle: 90,  delay: 0.8  },
  { Icon: PersonStanding, angle: 50,  delay: 1.2  },
  { Icon: GlassWater,     angle: 2,   delay: 1.6  },
];

interface HeroIconArcProps {
  className?: string;
  /** Full diameter of the ring (also the bbox width). */
  width?: number;
  /** Icon tile size. */
  iconBox?: number;
}

/**
 * Full circle ring + inner cyan shade + 5 icons on the upper arc.
 * Designed to be placed behind the headline so the ring visually
 * wraps around the text (headline sits in the lower hemisphere).
 */
export const HeroIconArc: React.FC<HeroIconArcProps> = ({
  className = '',
  width = 560,
  iconBox = 50,
}) => {
  const radius = (width - iconBox) / 2;
  const cx = width / 2;
  const cy = width / 2;
  const height = width; // square bounding box

  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width, height }}
    >
      {/* Ring + inner shade SVG */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Thin ring stroke gradient — bright at sides, soft at top/bottom */}
          <linearGradient id="arc-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.0)" />
            <stop offset="20%"  stopColor="rgba(34,211,238,0.45)" />
            <stop offset="50%"  stopColor="rgba(34,211,238,0.55)" />
            <stop offset="80%"  stopColor="rgba(34,211,238,0.45)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0.0)" />
          </linearGradient>
          {/* Inner shade — radial centered high in the upper arc, fades to
              fully transparent well before the diameter line so there is
              no visible horizontal cut. */}
          <radialGradient id="arc-shade" cx="50%" cy="30%" r="48%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.10)" />
            <stop offset="50%"  stopColor="rgba(34,211,238,0.04)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
        </defs>

        {/* Soft cyan shade — natural radial fade, no clip = no visible cut */}
        <circle cx={cx} cy={cy} r={radius - 2} fill="url(#arc-shade)" />

        {/* Thin precise upper-half arc (no lower half — doesn't cross headline) */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="url(#arc-stroke)"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>

      {/* Icon tiles on the upper arc */}
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
            <div className="relative w-full h-full rounded-2xl bg-slate-950/90 border border-cyan-400/55 backdrop-blur-md flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_18px_rgba(34,211,238,0.18)]">
              {/* Inner highlight for a premium feel */}
              <span className="absolute inset-x-2 top-1 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent rounded-full" />
              <Icon className="w-[20px] h-[20px] text-cyan-300" strokeWidth={1.6} />
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
