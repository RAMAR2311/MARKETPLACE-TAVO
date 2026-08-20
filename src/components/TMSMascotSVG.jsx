import React from 'react';

export default function TMSMascotSVG({ className = "w-32 h-32", showThrusters = true, animated = true }) {
  return (
    <div className={`relative inline-block ${className} ${animated ? 'animate-float-mascot' : ''}`}>
      <svg
        viewBox="0 0 400 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="suitRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF1744" />
            <stop offset="50%" stopColor="#E50914" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>
          <linearGradient id="helmetWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F1F5F9" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="visorDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="thrusterFire" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#E50914" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FF9100" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Thruster Flames / Jets */}
        {showThrusters && (
          <g className="animate-thruster">
            {/* Left Jet */}
            <path
              d="M145 320 Q135 390 120 440 Q150 410 160 320 Z"
              fill="url(#thrusterFire)"
            />
            {/* Right Jet */}
            <path
              d="M240 320 Q250 390 265 440 Q235 410 225 320 Z"
              fill="url(#thrusterFire)"
            />
            {/* Cloud smoke rings */}
            <ellipse cx="130" cy="425" rx="35" ry="12" fill="#FFFFFF" opacity="0.8" />
            <ellipse cx="255" cy="425" rx="35" ry="12" fill="#FFFFFF" opacity="0.8" />
            <ellipse cx="195" cy="435" rx="55" ry="14" fill="#FFFFFF" opacity="0.9" />
          </g>
        )}

        {/* Jetpack on back */}
        <rect x="130" y="170" width="140" height="120" rx="20" fill="#94A3B8" stroke="#475569" strokeWidth="4" />
        <circle cx="155" cy="285" r="14" fill="#475569" />
        <circle cx="235" cy="285" r="14" fill="#475569" />

        {/* Body Suit (Red) */}
        <path
          d="M150 160 C150 160 200 150 240 160 C260 210 260 290 235 320 C210 330 180 330 155 320 C135 290 135 210 150 160 Z"
          fill="url(#suitRed)"
          stroke="#990000"
          strokeWidth="3"
        />

        {/* Belt (White with metallic buckle) */}
        <rect x="145" y="250" width="100" height="18" rx="6" fill="#FFFFFF" />
        <circle cx="195" cy="259" r="12" fill="#CBD5E1" stroke="#E50914" strokeWidth="3" />

        {/* Legs (Red suit + White boots) */}
        <path d="M160 310 L150 380 L180 380 L180 310 Z" fill="url(#suitRed)" />
        <path d="M210 310 L210 380 L240 380 L230 310 Z" fill="url(#suitRed)" />
        {/* Boots */}
        <rect x="145" y="370" width="38" height="25" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <rect x="207" y="370" width="38" height="25" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

        {/* Arms */}
        {/* Right arm flexed down with Smartphone Armband */}
        <path d="M140 170 Q90 200 80 230 Q100 240 135 210 Z" fill="url(#suitRed)" />
        {/* White Glove */}
        <circle cx="80" cy="235" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        
        {/* Smartphone Armband on Right Arm */}
        <rect x="95" y="190" width="22" height="34" rx="4" fill="#0F172A" stroke="#E50914" strokeWidth="2" />
        <rect x="98" y="194" width="16" height="26" rx="2" fill="#38BDF8" />
        {/* Phone screen icons */}
        <rect x="100" y="196" width="12" height="4" fill="#FFFFFF" rx="1" />
        <circle cx="106" cy="214" r="3" fill="#E50914" />

        {/* Left Arm pointing UP */}
        <path d="M250 170 Q290 140 310 100 Q325 115 265 190 Z" fill="url(#suitRed)" />
        {/* Left White Glove pointing finger */}
        <path d="M305 95 C310 80 325 80 325 95 L320 115 L300 110 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
        <path d="M315 75 L322 95 L312 95 Z" fill="#FFFFFF" stroke="#CBD5E1" fillRule="evenodd" />

        {/* Neck */}
        <rect x="175" y="130" width="40" height="25" rx="6" fill="#FFFFFF" />

        {/* Helmet (White Superhero Helmet) */}
        <ellipse cx="195" cy="100" rx="65" ry="55" fill="url(#helmetWhite)" stroke="#E50914" strokeWidth="4" />
        
        {/* Ears/Antennae Comms */}
        <rect x="122" y="85" width="12" height="25" rx="4" fill="#E50914" />
        <circle cx="128" cy="80" r="5" fill="#FF1744" />
        <rect x="256" y="85" width="12" height="25" rx="4" fill="#E50914" />
        <circle cx="262" cy="80" r="5" fill="#FF1744" />

        {/* Visor (Dark Glossy Tech Visor) */}
        <path
          d="M145 95 Q195 80 245 95 Q240 125 195 125 Q150 125 145 95 Z"
          fill="url(#visorDark)"
          stroke="#E50914"
          strokeWidth="3"
        />
        {/* Visor Specular Reflection */}
        <path d="M155 98 Q195 88 235 98" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" strokeLinecap="round" />

        {/* TMS Red Logo Badge on Top Front of Helmet */}
        <rect x="165" y="52" width="60" height="24" rx="6" fill="#E50914" />
        <text
          x="195"
          y="69"
          fill="#FFFFFF"
          fontSize="15"
          fontWeight="900"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          letterSpacing="1"
        >
          TMS
        </text>

        {/* Mouth/Chine Shield */}
        <path d="M180 130 Q195 136 210 130" stroke="#E50914" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}
