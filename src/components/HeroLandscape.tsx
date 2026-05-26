import React from 'react';

/**
 * SVG approximation of the reference landscape:
 * cyan sky + moonlit valley glow + 3 layered mountain ranges + lake reflection
 * + pine tree silhouettes on the foreground edges + central figure silhouette.
 */
export const HeroLandscape: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 800 400"
    preserveAspectRatio="xMidYMax slice"
    xmlns="http://www.w3.org/2000/svg"
    className={`block w-full h-auto ${className}`}
    aria-hidden="true"
  >
    <defs>
      {/* Sky gradient */}
      <linearGradient id="hl-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="55%" stopColor="#051a2a" />
        <stop offset="85%" stopColor="#0b3a52" />
        <stop offset="100%" stopColor="#155e75" />
      </linearGradient>

      {/* Horizon glow */}
      <radialGradient id="hl-glow" cx="50%" cy="80%" r="55%">
        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#0891b2" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
      </radialGradient>

      {/* Lake gradient */}
      <linearGradient id="hl-lake" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0e7490" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
      </linearGradient>

      {/* Mist */}
      <linearGradient id="hl-mist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#67e8f9" stopOpacity="0" />
        <stop offset="55%" stopColor="#67e8f9" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect x="0" y="0" width="800" height="400" fill="url(#hl-sky)" />

    {/* Moon-like horizon glow */}
    <ellipse cx="400" cy="320" rx="380" ry="120" fill="url(#hl-glow)" />

    {/* Back mountain range — lightest, hazy */}
    <path
      d="M0 285 L70 245 L130 270 L200 220 L260 255 L330 215 L400 245 L470 210 L540 250 L610 215 L680 255 L750 230 L800 250 L800 320 L0 320 Z"
      fill="#155e75"
      opacity="0.55"
    />

    {/* Middle mountain range */}
    <path
      d="M0 320 L60 280 L120 305 L185 250 L250 290 L320 245 L390 285 L460 240 L530 280 L605 245 L680 285 L760 255 L800 280 L800 340 L0 340 Z"
      fill="#0e7490"
      opacity="0.75"
    />

    {/* Mist line */}
    <rect x="0" y="305" width="800" height="40" fill="url(#hl-mist)" />

    {/* Front mountain range — darkest */}
    <path
      d="M0 360 L70 305 L130 335 L195 280 L265 320 L340 275 L420 320 L490 275 L560 315 L640 285 L720 325 L800 305 L800 400 L0 400 Z"
      fill="#020617"
    />

    {/* Lake reflection */}
    <rect x="0" y="340" width="800" height="60" fill="url(#hl-lake)" />

    {/* Faint reflection lines */}
    <g opacity="0.35">
      <line x1="200" y1="355" x2="600" y2="355" stroke="#67e8f9" strokeWidth="0.5" />
      <line x1="240" y1="365" x2="560" y2="365" stroke="#67e8f9" strokeWidth="0.5" />
      <line x1="300" y1="375" x2="500" y2="375" stroke="#67e8f9" strokeWidth="0.5" />
    </g>

    {/* Central rock outcrop */}
    <path
      d="M360 360 Q380 348 400 348 Q420 348 440 360 L450 400 L350 400 Z"
      fill="#000000"
    />

    {/* Central figure silhouette — person standing facing the valley */}
    <g transform="translate(388 318)" fill="#000000">
      {/* head */}
      <circle cx="12" cy="6" r="5" />
      {/* torso */}
      <path d="M6 11 L18 11 L20 28 L4 28 Z" />
      {/* arms */}
      <rect x="2" y="13" width="3" height="14" rx="1.5" />
      <rect x="19" y="13" width="3" height="14" rx="1.5" />
      {/* legs */}
      <rect x="7" y="28" width="4" height="16" rx="1.5" />
      <rect x="13" y="28" width="4" height="16" rx="1.5" />
    </g>

    {/* Pine trees — left foreground cluster */}
    <PineCluster x={20} y={400} flip={false} />
    <PineCluster x={75} y={400} flip={false} scale={0.78} />
    <PineCluster x={135} y={400} flip={false} scale={0.6} />

    {/* Pine trees — right foreground cluster */}
    <PineCluster x={780} y={400} flip />
    <PineCluster x={725} y={400} flip scale={0.78} />
    <PineCluster x={665} y={400} flip scale={0.6} />
  </svg>
);

const PineCluster: React.FC<{ x: number; y: number; flip?: boolean; scale?: number }> = ({
  x,
  y,
  flip = false,
  scale = 1,
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    {/* Trunk */}
    <rect x="-3" y="-30" width="6" height="30" fill="#000" />
    {/* Layers */}
    <polygon points="0,-110 -28,-60 28,-60" fill="#000" />
    <polygon points="0,-85 -34,-30 34,-30" fill="#000" />
    <polygon points="0,-55 -38,0 38,0" fill="#000" />
  </g>
);

export default HeroLandscape;
