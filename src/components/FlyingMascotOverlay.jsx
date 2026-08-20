import React, { useEffect } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { TavoIsotype } from './TavoLogo';

export default function FlyingMascotOverlay({ activeItem, onAnimationEnd }) {
  useEffect(() => {
    if (activeItem) {
      const timer = setTimeout(() => {
        onAnimationEnd();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeItem, onAnimationEnd]);

  if (!activeItem) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      
      {/* VIP Toast Notification Box at Top Right */}
      <div className="absolute top-20 right-6 bg-[#0A0A0A] text-white p-4 rounded-2xl shadow-2xl border-2 border-[#C59F60] flex items-center gap-3 animate-in slide-in-from-top-5 duration-300 pointer-events-auto max-w-sm">
        <div className="w-10 h-10 rounded-xl bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shrink-0 font-black shadow-md shadow-[#C59F60]/20">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black bg-[#C59F60] text-[#0A0A0A] px-2 py-0.5 rounded-full uppercase font-mono">
              TAVO VIP
            </span>
            <TavoIsotype className="w-3.5 h-3.5" glow={false} />
            <Sparkles className="w-3.5 h-3.5 text-[#C59F60]" />
          </div>
          <p className="text-xs font-black text-white mt-1 line-clamp-1 font-heading">
            ¡{activeItem.name} añadido!
          </p>
          <p className="text-[10px] text-neutral-400 font-mono">Listo para envío express 24h</p>
        </div>
      </div>

      {/* Luxury Gold Particle / Item Flying Animation */}
      <div className="absolute top-1/2 left-0 animate-flying-item">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#C59F60] to-[#8C6A34] p-1 shadow-2xl shadow-[#C59F60]/40 flex items-center justify-center">
          <div className="w-full h-full bg-[#0A0A0A] rounded-xl flex flex-col items-center justify-center p-2 text-center">
            <TavoIsotype className="w-10 h-10" />
            <span className="text-[9px] font-black font-mono text-white mt-1">TAVO</span>
          </div>
        </div>
      </div>

    </div>
  );
}
