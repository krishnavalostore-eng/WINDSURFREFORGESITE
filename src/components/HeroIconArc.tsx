import React from 'react';
import { Footprints, Dumbbell, Salad, PersonStanding, GlassWater, LucideIcon } from 'lucide-react';

interface ArcIcon {
  Icon: LucideIcon;
  /** angle in degrees, 0 = right, 90 = top, 180 = left */
  angle: number;
  delay: number;
}

const ICONS: ArcIcon[] = [
  { Icon: Footprints,     angle: 195, delay: 0    },
  { Icon: Dumbbell,       angle: 150, delay: 0.4  },
  { Icon: Salad,          angle: 90,  delay: 0.8  },
  { Icon: PersonStanding, angle: 30,  delay: 1.2  },
  { Icon: GlassWater,     angle: -15, delay: 1.6  },
];

interface HeroIconArcProps {
  /** Radius of the arc in px (the half-circle that the icons sit on). */
  radius?: number;
  className?: string;
}

export const HeroIconArc: React.FC<HeroIconArcProps> = ({ radius = 150, className = '' }) => {
  // SVG-style arc: bounding box is (2*radius + iconSize) wide, (radius + iconSize) tall.
  const iconBox = 52; // w-13 h-13
  const width = radius * 2 + iconBox;
  const height = radius + iconBox;
  const centerX = width / 2;
  const centerY = height; // anchor pivot at the bottom-center

  return (
    <div
      className={`relative pointer-events-none select-none mx-auto ${className}`}
      style={{ width: '100%', maxWidth: width, height, marginBottom: -iconBox / 1.6 }}
    >
      {ICONS.map(({ Icon, angle, delay }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = centerX + radius * Math.cos(rad) - iconBox / 2;
        const y = centerY - radius * Math.sin(rad) - iconBox / 2;
        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(x / width) * 100}%`,
              top: y,
              width: iconBox,
              height: iconBox,
              animation: `arc-float 5s ease-in-out ${delay}s infinite`,
            }}
          >
            <div className="w-full h-full rounded-2xl bg-slate-900/70 border border-cyan-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <Icon className="w-5 h-5 text-cyan-300" strokeWidth={1.8} />
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes arc-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default HeroIconArc;
