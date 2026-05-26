import React, { useState } from 'react';

/**
 * Hero landscape: tries to use /hero-landscape.png if user provides one,
 * otherwise falls back to a layered atmospheric SVG approximation
 * (cyan moonlit valley, layered mountains, mist, pine silhouettes, figure).
 */
interface HeroLandscapeProps {
  className?: string;
  src?: string;
}

export const HeroLandscape: React.FC<HeroLandscapeProps> = ({
  className = '',
  src = '/hero-landscape.png',
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (!imgFailed) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        onError={() => setImgFailed(true)}
        draggable={false}
        className={`block w-full h-auto select-none ${className}`}
        style={{ maxHeight: '60vh', objectFit: 'cover', objectPosition: 'center bottom' }}
      />
    );
  }

  return <FallbackLandscape className={className} />;
};

const FallbackLandscape: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 800 500"
    preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg"
    className={`block w-full h-auto ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="hl-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="40%" stopColor="#031824" />
        <stop offset="75%" stopColor="#0b3a52" />
        <stop offset="100%" stopColor="#155e75" />
      </linearGradient>
      <radialGradient id="hl-moon" cx="50%" cy="55%" r="55%">
        <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.55" />
        <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="hl-water" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0e7490" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#020617" stopOpacity="1" />
      </linearGradient>
      <linearGradient id="hl-haze" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
        <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect x="0" y="0" width="800" height="500" fill="url(#hl-sky)" />

    {/* Moon glow at horizon */}
    <ellipse cx="400" cy="320" rx="320" ry="100" fill="url(#hl-moon)" />

    {/* Far mountain range */}
    <path
      d="M0 290 L40 270 L90 285 L150 250 L210 275 L280 240 L340 270 L410 235 L480 265 L550 235 L620 270 L690 245 L760 270 L800 260 L800 350 L0 350 Z"
      fill="#155e75"
      opacity="0.55"
    />

    {/* Mid mountain range */}
    <path
      d="M0 340 L60 295 L130 320 L200 270 L275 305 L355 260 L430 300 L510 260 L585 300 L660 270 L735 305 L800 285 L800 380 L0 380 Z"
      fill="#0e7490"
      opacity="0.85"
    />

    {/* Haze */}
    <rect x="0" y="320" width="800" height="60" fill="url(#hl-haze)" />

    {/* Front mountains - sharper */}
    <path
      d="M0 400 L70 330 L140 365 L210 305 L290 350 L370 295 L445 340 L520 295 L600 335 L680 305 L760 345 L800 325 L800 500 L0 500 Z"
      fill="#020617"
    />

    {/* Lake water */}
    <rect x="0" y="378" width="800" height="50" fill="url(#hl-water)" />
    <g opacity="0.4">
      <line x1="200" y1="390" x2="600" y2="390" stroke="#67e8f9" strokeWidth="0.5" />
      <line x1="240" y1="400" x2="560" y2="400" stroke="#67e8f9" strokeWidth="0.5" />
      <line x1="290" y1="410" x2="510" y2="410" stroke="#67e8f9" strokeWidth="0.5" />
    </g>

    {/* Cliff (where the figure stands) */}
    <path
      d="M180 500 L180 420 Q200 405 230 405 Q260 405 285 420 L300 500 Z"
      fill="#000"
    />

    {/* Person silhouette */}
    <g transform="translate(225 370)" fill="#000">
      <circle cx="12" cy="6" r="5" />
      <path d="M5 12 L20 12 L22 32 L3 32 Z" />
      <rect x="0" y="14" width="3" height="16" rx="1.5" />
      <rect x="22" y="14" width="3" height="16" rx="1.5" />
      <rect x="6" y="32" width="4" height="20" rx="1.5" />
      <rect x="14" y="32" width="4" height="20" rx="1.5" />
    </g>

    {/* Pine trees - left foreground */}
    <DetailedPine x={30}  y={500} scale={1.0}  flip={false} />
    <DetailedPine x={95}  y={500} scale={0.78} flip={false} />
    <DetailedPine x={150} y={500} scale={0.55} flip={false} />

    {/* Pine trees - right foreground */}
    <DetailedPine x={770} y={500} scale={1.0}  flip />
    <DetailedPine x={705} y={500} scale={0.78} flip />
    <DetailedPine x={645} y={500} scale={0.55} flip />
  </svg>
);

const DetailedPine: React.FC<{ x: number; y: number; flip?: boolean; scale?: number }> = ({
  x,
  y,
  flip = false,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    {/* Trunk */}
    <rect x="-3" y="-40" width="6" height="40" fill="#000" />
    {/* Multi-tier branches w/ slight randomness */}
    <polygon points="0,-150 -28,-110 -10,-110 -32,-78 -8,-78 -36,-40 -6,-40 -4,-30 4,-30 6,-40 36,-40 8,-78 32,-78 10,-110 28,-110" fill="#000" />
  </g>
);

export default HeroLandscape;
