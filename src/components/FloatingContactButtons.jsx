import React, { useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';

export default function FloatingContactButtons() {
  const [showTooltip, setShowTooltip] = useState(true);

  const WHATSAPP_URL = "https://wa.me/573142626916?text=Hola%20La%20tienda%20TAVO,%20deseo%20asesor%C3%ADa%20VIP";
  const INSTAGRAM_URL = "https://www.instagram.com/latiendadetavo?igsh=bmwwYTViazZmMGdj";

  return (
    <aside aria-label="Contacto directo" className="fixed right-3.5 sm:right-6 bottom-20 md:bottom-8 z-40 flex flex-col items-end gap-3 group/widget select-none">
      
      {/* Floating Welcome Bubble / Tooltip (can be dismissed or animated) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0A0A0A]/95 text-white border border-[#C59F60]/50 px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-500 max-w-xs">
          <Sparkles className="w-4 h-4 text-[#C59F60] shrink-0 animate-pulse" />
          <div className="text-left text-[11px] leading-tight">
            <span className="font-bold text-[#C59F60] block font-mono">¿Necesitas Asesoría?</span>
            <span className="text-neutral-300">Chatea en vivo o visítanos en Instagram</span>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-neutral-500 hover:text-white ml-1 p-0.5"
            aria-label="Cerrar notificación"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Instagram Button */}
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group/insta flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-xl shadow-[#DD2A7B]/25 hover:shadow-2xl hover:shadow-[#DD2A7B]/50 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20"
        aria-label="Visítanos en Instagram @latiendadetavo"
      >
        <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-md" />
        
        {/* Floating Tooltip Hover */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 bg-[#0A0A0A]/95 text-white text-xs font-bold font-mono rounded-xl border border-pink-500/40 shadow-xl opacity-0 translate-x-2 group-hover/insta:opacity-100 group-hover/insta:translate-x-0 transition-all duration-200 whitespace-nowrap hidden sm:block">
          📸 @latiendadetavo
        </span>
      </a>

      {/* WhatsApp VIP Concierge Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group/wa flex items-center justify-center w-13 h-13 sm:w-15 sm:h-15 w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ECC71] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/60 hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/25"
        aria-label="Atención VIP por WhatsApp 314 262 6916"
      >
        {/* Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none opacity-75"></span>

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-md" />

        {/* Live Notification Indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#C59F60] border-2 border-black rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
        </span>

        {/* Floating Tooltip Hover */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 bg-[#0A0A0A]/95 text-white text-xs font-bold font-mono rounded-xl border border-[#25D366]/40 shadow-xl opacity-0 translate-x-2 group-hover/wa:opacity-100 group-hover/wa:translate-x-0 transition-all duration-200 whitespace-nowrap hidden sm:block">
          💬 WhatsApp VIP (+57 314 262 6916)
        </span>
      </a>

    </aside>
  );
}
