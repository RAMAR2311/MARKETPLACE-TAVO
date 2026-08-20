import React from 'react';

/**
 * TAVO Official Luxury Logo & Isotype Component
 * Recreates the exact geometric gold shield/lion-crest monogram and futuristic TAVO wordmark.
 */
export function TavoIsotype({ className = "w-10 h-10", glow = true }) {
  return (
    <svg 
      viewBox="0 0 140 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'drop-shadow-[0_4px_12px_rgba(197,159,96,0.45)]' : ''}`}
    >
      <defs>
        {/* Luxury Brushed Gold Gradient */}
        <linearGradient id="tavoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2BF82" />
          <stop offset="30%" stopColor="#C59F60" />
          <stop offset="70%" stopColor="#F5D89D" />
          <stop offset="100%" stopColor="#A6824D" />
        </linearGradient>

        <linearGradient id="tavoGoldDark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8C6A34" />
          <stop offset="50%" stopColor="#C59F60" />
          <stop offset="100%" stopColor="#E5C07B" />
        </linearGradient>

        {/* Ambient Glow */}
        <filter id="goldShine" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C59F60" floodOpacity="0.4" />
        </filter>
      </defs>

      <g filter="url(#goldShine)">
        {/* Central Geometric "T" and Crest Core */}
        <path
          d="M32 24 L108 24 L122 38 L98 38 L80 38 L80 82 L70 96 L60 82 L60 38 L42 38 L18 38 Z"
          fill="url(#tavoGoldGrad)"
        />

        {/* Left Angular Wing / Shield Bracket */}
        <path
          d="M18 48 L36 48 L44 58 L38 78 L54 102 L70 122 L54 102 L30 84 L22 68 L14 54 Z"
          fill="url(#tavoGoldDark)"
        />

        {/* Right Angular Wing / Shield Bracket (Mirrored) */}
        <path
          d="M122 48 L104 48 L96 58 L102 78 L86 102 L70 122 L86 102 L110 84 L118 68 L126 54 Z"
          fill="url(#tavoGoldDark)"
        />

        {/* Center Bottom Diamond Spear */}
        <path
          d="M70 76 L82 92 L70 114 L58 92 Z"
          fill="url(#tavoGoldGrad)"
        />
      </g>
    </svg>
  );
}

export default function TavoLogo({ 
  theme = 'dark', 
  showWordmark = true, 
  size = 'md', 
  className = '',
  subtitle = 'LA TIENDA'
}) {
  const isDark = theme === 'dark';

  // Size configurations
  const sizeConfig = {
    sm: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[8px]', gap: 'gap-2.5' },
    md: { icon: 'w-10 h-10', text: 'text-2xl', sub: 'text-[9px]', gap: 'gap-3' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl sm:text-4xl', sub: 'text-[10px]', gap: 'gap-4' },
    xl: { icon: 'w-20 h-20', text: 'text-5xl sm:text-6xl', sub: 'text-xs', gap: 'gap-5' },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <div className={`flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* Official Geometric Gold Crest */}
      <TavoIsotype className={currentSize.icon} />

      {/* Futuristic Angular Wordmark */}
      {showWordmark && (
        <div className="flex flex-col text-left justify-center">
          {/* Subtitle ("LA TIENDA") */}
          <span className={`${currentSize.sub} tracking-[0.3em] font-mono uppercase font-bold text-neutral-400 leading-none mb-0.5`}>
            {subtitle}
          </span>

          {/* TAVO Wordmark with custom geometric styling */}
          <div className="flex items-center tracking-[0.12em] font-black font-heading leading-none">
            <span className={`font-mono font-black ${currentSize.text} tracking-[0.15em] ${
              isDark ? 'text-white' : 'text-[#1A1A1A]'
            }`}>
              T<span className="text-[#C59F60]">A</span>VO
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
