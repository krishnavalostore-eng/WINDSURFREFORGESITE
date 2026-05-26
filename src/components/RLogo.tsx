import React from 'react';

interface RLogoProps {
  size?: number;
  className?: string;
}

export const RLogo: React.FC<RLogoProps> = ({ size = 36, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Reforge AI logo"
  >
    <defs>
      <linearGradient id="rlogo-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#22d3ee" />
        <stop offset="1" stopColor="#0e7490" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="38" height="38" rx="9" fill="url(#rlogo-bg)" />
    <rect x="1" y="1" width="38" height="38" rx="9" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
    {/* Stylized R */}
    <path
      d="M13 11 H22.5 C26 11 28 13.4 28 16.2 C28 19 26 21.1 23 21.5 L28.4 29 H24.2 L19.5 22 H16.6 V29 H13 V11 Z M16.6 14 V19 H22 C23.6 19 24.6 18 24.6 16.5 C24.6 15 23.6 14 22 14 H16.6 Z"
      fill="white"
    />
  </svg>
);

export default RLogo;
