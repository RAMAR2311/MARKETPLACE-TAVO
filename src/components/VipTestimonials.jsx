import React from 'react';
import { Star, CheckCircle2, Crown, Quote, Sparkles } from 'lucide-react';

export default function VipTestimonials({ theme }) {
  const isDark = theme === 'dark';

  const reviews = [
    {
      name: 'Dr. Alejandro Restrepo',
      city: 'Bogotá, D.C.',
      role: 'Cirujano & Coleccionista Tech',
      device: 'iPhone 15 Pro Max Titanium 512GB',
      rating: 5,
      comment: 'La atención del concierge TAVO fue impecable. El equipo llegó en menos de 18 horas a mi consultorio en Bogotá con embalaje de seguridad sellado y garantía intacta.',
      date: 'Hace 3 días',
    },
    {
      name: 'Valentina Morales',
      city: 'Medellín, Antioquia',
      role: 'Directora Creativa & Fotógrafa',
      device: 'Xiaomi 14 Ultra Leica Edition',
      rating: 5,
      comment: 'Buscaba la edición Leica y en TAVO la tenían disponible para entrega inmediata. La calidad óptica es de otro planeta y el proceso de pago fue instantáneo.',
      date: 'Hace 1 semana',
    },
    {
      name: 'Ing. Carlos Sarmiento',
      city: 'Cali, Valle del Cauca',
      role: 'Desarrollador Senior',
      device: 'Asus ROG Phone 8 Pro 24GB RAM',
      rating: 5,
      comment: 'Rendimiento bestial para gaming y desarrollo. 100% original con accesorios oficiales. Sin duda la mejor tienda de tecnología de alta gama en Colombia.',
      date: 'Hace 2 semanas',
    },
  ];

  return (
    <section className={`py-10 sm:py-16 border-b transition-colors relative overflow-hidden ${
      isDark ? 'bg-[#0E0E0E] border-[#222222]' : 'bg-[#FAFAFA] border-[#E5E5E5]'
    }`}>
      {/* Background Decorative Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-[#C59F60]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5 sm:space-y-2">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#C59F60]/10 border border-[#C59F60]/30 text-[10px] sm:text-xs font-black text-[#C59F60] uppercase tracking-widest font-mono">
            <Crown className="w-3.5 h-3.5" />
            <span>Experiencia de Clientes VIP</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-black font-heading tracking-tight ${
            isDark ? 'text-white' : 'text-[#1A1A1A]'
          }`}>
            Voces de Nuestra Comunidad Exclusiva
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-medium">
            Más de 10.000 clientes en toda Colombia confían en la autenticidad y el servicio de La tienda TAVO.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-[#111111] border-[#222222] hover:border-[#C59F60]/50 hover:shadow-2xl hover:shadow-[#C59F60]/10' 
                  : 'bg-white border-[#DDDDDD] hover:border-[#C59F60] hover:shadow-xl'
              }`}
            >
              <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#C59F60]/20 absolute top-4 right-4 sm:top-5 sm:right-5" />

              <div>
                {/* Rating Stars & Verified Tag */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex gap-0.5 sm:gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold font-mono text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded-full border border-[#2ECC71]/20">
                    <CheckCircle2 className="w-3 h-3" /> Verificado
                  </span>
                </div>

                {/* Comment */}
                <p className={`text-xs sm:text-sm leading-relaxed font-medium mb-4 sm:mb-6 text-left ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  "{r.comment}"
                </p>
              </div>

              {/* Author & Device Meta */}
              <div className={`pt-3 sm:pt-4 border-t ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
                <div className="text-left">
                  <h4 className={`text-xs sm:text-sm font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    {r.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">
                    {r.role} · <strong className="text-[#C59F60]">{r.city}</strong>
                  </p>
                  <div className="mt-1.5 sm:mt-2 text-[9px] sm:text-[10px] font-mono text-neutral-400 bg-[#161616] p-1.5 sm:p-2 rounded-xl border border-[#222222] truncate flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C59F60] shrink-0" />
                    <span className="truncate">{r.device}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
