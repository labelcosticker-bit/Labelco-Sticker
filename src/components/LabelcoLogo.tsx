import React from 'react';

interface LabelcoLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  theme?: 'light' | 'dark' | 'sleek';
}

export function LabelcoLogo({ className = 'w-12 h-12', variant = 'full', theme = 'sleek' }: LabelcoLogoProps) {
  // Define colors based on theme
  const isDark = theme === 'dark' || theme === 'sleek';
  const textPrimaryColor = isDark ? '#ffffff' : '#090d16';
  const subtitleColor = isDark ? '#94a3b8' : '#64748b';

  if (variant === 'icon') {
    return (
      <svg
        className={className}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="labelco-icon-logo"
      >
        <defs>
          {/* Gradients for Leaves */}
          <linearGradient id="leftLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#085422" />
            <stop offset="100%" stopColor="#1DA343" />
          </linearGradient>
          <linearGradient id="rightLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1DA343" />
            <stop offset="100%" stopColor="#8ED634" />
          </linearGradient>

          {/* Gradients for Roll */}
          <linearGradient id="rollBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#EBECEF" />
            <stop offset="100%" stopColor="#C4C8D2" />
          </linearGradient>
          <linearGradient id="rollInnerHoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#301F17" />
            <stop offset="100%" stopColor="#5C3D2E" />
          </linearGradient>
          <linearGradient id="labelStripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D5D9E2" />
          </linearGradient>
        </defs>

        {/* --- STICKER ROLL BACKDROP/STRIP UNROLLING --- */}
        {/* The unrolling paper backing curved path */}
        <path
          d="M 100 115 C 120 115, 140 125, 160 125 C 185 125, 200 110, 215 100 L 210 90 C 195 102, 180 113, 160 113 C 140 113, 120 102, 100 102 Z"
          fill="url(#labelStripGrad)"
          stroke="#94A3B8"
          strokeWidth="1"
        />

        {/* --- STICKER ROLL CYLINDER BODY --- */}
        <path
          d="M 100 50 L 160 50 C 175 50, 185 65, 185 82.5 L 125 82.5 Z"
          fill="url(#rollBodyGrad)"
        />
        {/* Layer lines on cylinder body to simulate sticker sheets wound up */}
        <line x1="100" y1="56" x2="160" y2="56" stroke="#D1D5DB" strokeWidth="1" />
        <line x1="100" y1="64" x2="160" y2="64" stroke="#D1D5DB" strokeWidth="1" />
        <line x1="100" y1="72" x2="160" y2="72" stroke="#9CA3AF" strokeWidth="1.2" />

        {/* --- STICKER ROLL LEFT FACE (FRONT) --- */}
        {/* Outer concentric rolls */}
        <ellipse cx="100" cy="82.5" rx="35" ry="32.5" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
        <ellipse cx="100" cy="82.5" rx="31" ry="28.8" fill="none" stroke="#E5E7EB" strokeWidth="1" />
        <ellipse cx="100" cy="82.5" rx="27" ry="25.1" fill="none" stroke="#D1D5DB" strokeWidth="1.2" />
        <ellipse cx="100" cy="82.5" rx="23" ry="21.4" fill="none" stroke="#E5E7EB" strokeWidth="1" />
        <ellipse cx="100" cy="82.5" rx="19" ry="17.7" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />

        {/* Cardboard core center */}
        <ellipse cx="100" cy="82.5" rx="14" ry="13" fill="#8B5A42" stroke="#5C3D2E" strokeWidth="1.5" />
        <ellipse cx="100" cy="82.5" rx="10" ry="9.3" fill="url(#rollInnerHoleGrad)" />

        {/* --- BRAND LEAVES (OVERLAPPING ON THE LEFT) --- */}
        {/* Left Leaf (Dark Green) */}
        <g transform="translate(-10, 10)">
          {/* Leaf base shadow */}
          <path
            d="M 65 95 C 45 105, 15 90, 20 65 C 23 48, 50 52, 68 70 C 72 74, 70 85, 65 95 Z"
            fill="black"
            opacity="0.15"
          />
          {/* Leaf body */}
          <path
            d="M 65 95 C 45 105, 15 90, 20 65 C 23 48, 50 52, 68 70 C 72 74, 70 85, 65 95 Z"
            fill="url(#leftLeafGrad)"
            stroke="#1E293B"
            strokeWidth="2"
          />
          {/* Center vein */}
          <path
            d="M 20 65 Q 45 74, 65 95"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Minor veins */}
          <path d="M 32 68 Q 33 60, 30 56" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
          <path d="M 43 74 Q 47 67, 47 61" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
          <path d="M 53 82 Q 59 77, 60 70" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
        </g>

        {/* Right Leaf (Light Green) */}
        <g transform="translate(-10, 10)">
          {/* Leaf body */}
          <path
            d="M 65 95 C 65 65, 50 40, 75 35 C 92 40, 95 65, 80 88 C 75 91, 70 93, 65 95 Z"
            fill="url(#rightLeafGrad)"
            stroke="#1E293B"
            strokeWidth="2"
          />
          {/* Center vein */}
          <path
            d="M 75 35 Q 73 65, 65 95"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Minor veins */}
          <path d="M 71 45 Q 64 48, 59 49" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
          <path d="M 72 58 Q 63 62, 57 65" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
          <path d="M 76 72 Q 83 67, 88 64" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
          <path d="M 78 81 Q 87 77, 92 73" stroke="#1E293B" strokeWidth="1" opacity="0.4" />
        </g>
      </svg>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`} id="labelco-full-logo">
      {/* Graphic Part */}
      <svg
        className="w-full h-auto max-h-[160px]"
        viewBox="0 0 240 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="fullLeftLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#085422" />
            <stop offset="100%" stopColor="#1DA343" />
          </linearGradient>
          <linearGradient id="fullRightLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1DA343" />
            <stop offset="100%" stopColor="#8ED634" />
          </linearGradient>
          <linearGradient id="fullRollBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="55%" stopColor="#EDF0F5" />
            <stop offset="100%" stopColor="#C9CDD8" />
          </linearGradient>
          <linearGradient id="fullRollInnerHoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#301F17" />
            <stop offset="100%" stopColor="#5C3D2E" />
          </linearGradient>
          <linearGradient id="fullLabelStripGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D5D9E2" />
          </linearGradient>
          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#shadowFilter)">
          {/* --- STICKER ROLL BACKDROP/STRIP UNROLLING --- */}
          <path
            d="M 120 100 C 145 100, 165 112, 190 112 C 215 112, 230 98, 245 88 L 240 78 C 225 90, 210 101, 190 101 C 165 101, 145 89, 120 89 Z"
            fill="url(#fullLabelStripGrad)"
            stroke="#94A3B8"
            strokeWidth="1"
          />

          {/* --- STICKER ROLL CYLINDER BODY --- */}
          <path
            d="M 120 30 L 195 30 C 210 30, 222 45, 222 62.5 L 147 62.5 Z"
            fill="url(#fullRollBodyGrad)"
          />
          {/* Concentric-wound details */}
          <line x1="120" y1="36" x2="195" y2="36" stroke="#E5E7EB" strokeWidth="1" />
          <line x1="120" y1="44" x2="195" y2="44" stroke="#D1D5DB" strokeWidth="1.2" />
          <line x1="120" y1="52" x2="195" y2="52" stroke="#9CA3AF" strokeWidth="1.2" />

          {/* --- STICKER ROLL LEFT FACE (FRONT) --- */}
          <ellipse cx="120" cy="62.5" rx="35" ry="32.5" fill="#FFFFFF" stroke="#C9CDD8" strokeWidth="1.5" />
          <ellipse cx="120" cy="62.5" rx="31" ry="28.8" fill="none" stroke="#EDF0F5" strokeWidth="1" />
          <ellipse cx="120" cy="62.5" rx="27" ry="25.1" fill="none" stroke="#D1D5DB" strokeWidth="1.2" />
          <ellipse cx="120" cy="62.5" rx="23" ry="21.4" fill="none" stroke="#E5E7EB" strokeWidth="1" />
          <ellipse cx="120" cy="62.5" rx="19" ry="17.7" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />

          {/* Cardboard core center */}
          <ellipse cx="120" cy="62.5" rx="14" ry="13" fill="#8B5A42" stroke="#5C3D2E" strokeWidth="1.5" />
          <ellipse cx="120" cy="62.5" rx="10" ry="9.3" fill="url(#fullRollInnerHoleGrad)" />

          {/* --- BRAND LEAVES (LEFT) --- */}
          {/* Left Leaf (Dark Green) */}
          <g transform="translate(10, -10)">
            <path
              d="M 65 95 C 45 105, 15 90, 20 65 C 23 48, 50 52, 68 70 C 72 74, 70 85, 65 95 Z"
              fill="url(#fullLeftLeafGrad)"
              stroke="#1E293B"
              strokeWidth="2.2"
            />
            <path
              d="M 20 65 Q 45 74, 65 95"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Right Leaf (Light Green) */}
          <g transform="translate(10, -10)">
            <path
              d="M 65 95 C 65 65, 50 40, 75 35 C 92 40, 95 65, 80 88 C 75 91, 70 93, 65 95 Z"
              fill="url(#fullRightLeafGrad)"
              stroke="#1E293B"
              strokeWidth="2.2"
            />
            <path
              d="M 75 35 Q 73 65, 65 95"
              stroke="#1E293B"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>
        </g>
      </svg>

      {/* Text Brand Part */}
      <div className="mt-1 select-none">
        <div className="flex items-center justify-center tracking-tight">
          {/* Reproduce EXACT text logo "labelco." */}
          <span 
            className="text-[34px] font-extrabold tracking-tight" 
            style={{ 
              color: '#000000', 
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
            }}
          >
            label
          </span>
          <span 
            className="text-[34px] font-extrabold tracking-tight" 
            style={{ 
              color: '#49b04d', 
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
            }}
          >
            co
          </span>
          <span 
            className="text-[34px] font-extrabold"
            style={{
              color: '#000000',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
            }}
          >
            .
          </span>
        </div>
        {/* "STICKER LABELS" subtext */}
        <div 
          className="text-[10px] font-bold tracking-[0.3em] uppercase text-center mt-0.5"
          style={{ 
            color: '#556375', 
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif'
          }}
        >
          STICKER LABELS
        </div>
      </div>
    </div>
  );
}
