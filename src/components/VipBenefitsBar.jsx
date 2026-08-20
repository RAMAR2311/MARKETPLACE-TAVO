import React from 'react';
import { ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function VipBenefitsBar({ theme, onOpenTechBot }) {
  const isDark = theme === 'dark';

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Garantía Oficial 12 Meses',
      subtitle: 'Sello intacto de fábrica con reemplazo prioritario',
      tag: '100% ORIGINAL',
    },
    {
      icon: Truck,
      title: 'Envío Blindado 24h Colombia',
      subtitle: 'Entrega asegurada puerta a puerta a todo el país',
      tag: 'EXPRESS VIP',
    },
    {
      icon: Sparkles,
      title: 'Asesor TAVO Personal',
      subtitle: 'Asesoría y configuración a tu medida en WhatsApp',
      tag: 'ATENCIÓN 24/7',
      action: onOpenTechBot
    },
  ];

  return (
    <section className={`py-6 border-b transition-colors relative z-20 ${
      isDark ? 'bg-[#0A0A0A]/90 border-[#222222]' : 'bg-[#F0F0F0] border-[#E0E0E0]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                onClick={b.action ? b.action : undefined}
                className={`p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 group relative overflow-hidden ${
                  b.action ? 'cursor-pointer' : ''
                } ${
                  isDark 
                    ? 'bg-[#111111]/80 hover:bg-[#161616] border-[#222222] hover:border-[#C59F60]/50 hover:shadow-xl hover:shadow-[#C59F60]/10' 
                    : 'bg-white hover:bg-neutral-50 border-[#DDDDDD] hover:border-[#C59F60] hover:shadow-lg'
                }`}
              >
                {/* Gold Top Hairline Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C59F60] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C59F60]/20 to-[#8C6A34]/20 border border-[#C59F60]/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#C59F60] group-hover:text-black text-[#C59F60] transition-all duration-300 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-xs sm:text-sm font-extrabold font-heading truncate ${
                      isDark ? 'text-white group-hover:text-[#C59F60]' : 'text-[#1A1A1A] group-hover:text-[#A6824D]'
                    }`}>
                      {b.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-medium leading-snug line-clamp-2">
                    {b.subtitle}
                  </p>
                  <span className="inline-block text-[9px] font-mono font-bold text-[#C59F60] mt-1.5 uppercase tracking-wider">
                    ✦ {b.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
