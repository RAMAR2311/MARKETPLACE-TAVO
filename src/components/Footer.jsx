import React, { useState } from 'react';
import { Truck, ShieldCheck, Mail, Phone, ArrowRight, Globe, MessageCircle, Send, Crown, Lock, Sparkles, CheckCircle } from 'lucide-react';
import TavoLogo, { TavoIsotype } from './TavoLogo';

export default function Footer({ onCategorySelect }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-0 pb-16 sm:pb-0 relative overflow-hidden border-t border-[#222222]">
      
      {/* Luxury VIP Private Circle Banner */}
      <div className="relative border-b border-[#222222] py-8 sm:py-14 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Luxury Glow Layers */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#1A160E] to-[#111111]"></div>
        <div className="absolute -top-24 right-1/3 w-96 h-96 bg-[#C59F60]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(197,159,96,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#161616]/90 via-[#111111]/90 to-[#0A0A0A]/90 border border-[#C59F60]/30 rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Top Gold Hairline */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C59F60] to-transparent"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              
              {/* Left Column: Brand Emblema & Exclusive Invitation */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
                
                {/* VIP Status Tag */}
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#C59F60]/10 border border-[#C59F60]/40 text-[10px] sm:text-xs font-black text-[#C59F60] uppercase tracking-widest font-mono shadow-sm">
                  <TavoIsotype className="w-3.5 h-3.5 sm:w-4 sm:h-4" glow={false} />
                  <span>CÍRCULO PRIVADO TAVO VIP</span>
                </div>

                {/* Headline */}
                <h3 className="text-xl sm:text-3xl lg:text-4xl font-black font-heading text-white tracking-tight leading-tight">
                  Acceso Prioritario a Preventas & Ediciones Limitadas
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 font-medium max-w-xl leading-relaxed">
                  Únete a nuestro club exclusivo para recibir invitaciones anticipadas a lanzamientos de smartphones insignia, cupos reservados en preventas para Colombia y asesoría directa del Asesor TAVO.
                </p>

                {/* Exclusivity Perks */}
                <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold font-mono text-neutral-300 bg-[#1A1A1A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#2A2A2A]">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59F60]" /> Lanzamientos Anticipados
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold font-mono text-neutral-300 bg-[#1A1A1A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#2A2A2A]">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59F60]" /> Asignación Prioritaria
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold font-mono text-neutral-300 bg-[#1A1A1A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl border border-[#2A2A2A]">
                    <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59F60]" /> Asesor TAVO 24/7
                  </span>
                </div>
              </div>

              {/* Right Column: Form with Luxury Button */}
              <div className="lg:col-span-5 flex flex-col justify-center pt-2 lg:pt-0">
                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-2.5 sm:space-y-3">
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="Ingresa tu correo electrónico..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0A0A0A] text-white placeholder:text-neutral-500 font-medium pl-10 pr-3 py-3 sm:py-4 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#C59F60] border border-[#333333] shadow-inner transition-all"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full btn-gold-primary py-3 sm:py-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-2xl"
                    >
                      <Crown className="w-4 h-4 text-[#0A0A0A]" />
                      <span>Solicitar Acceso al Círculo Privado</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-[9px] sm:text-[10px] text-neutral-500 font-mono text-center">
                      🔒 Confidencialidad absoluta · Sin spam · Membresía sin costo
                    </p>
                  </form>
                ) : (
                  <div className="bg-gradient-to-br from-[#1A1A1A] to-[#141414] border-2 border-[#C59F60] p-4 sm:p-6 rounded-2xl text-center space-y-2 sm:space-y-3 shadow-2xl animate-in zoom-in-95 duration-300">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#C59F60]/20 text-[#C59F60] flex items-center justify-center mx-auto border border-[#C59F60]/40">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h4 className="text-sm sm:text-base font-black font-heading text-white">¡Membresía Confirmada!</h4>
                    <p className="text-xs text-neutral-300 font-medium">
                      Has ingresado al Círculo Privado TAVO. Te notificaremos con prioridad de los próximos lanzamientos en Colombia.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 text-left pb-10 sm:pb-14 border-b border-[#222222]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <TavoLogo theme="dark" size="lg" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-medium max-w-sm">
              La boutique de tecnología líder en smartphones insignia, audio de alta fidelidad y computación de élite. Envíos express 24h asegurados a toda Colombia.
            </p>

            {/* Social / Contact Icons */}
            <div className="flex items-center gap-2.5 pt-1 sm:pt-2">
              <a 
                href="https://wa.me/1234567890?text=Hola%20La%20tienda%20TAVO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#25D366] text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-[#2A2A2A]"
                title="WhatsApp Directo"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button 
                className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#C59F60] text-neutral-300 hover:text-black flex items-center justify-center transition-all duration-200 border border-[#2A2A2A]"
                title="Sitio Web Oficial"
              >
                <Globe className="w-4 h-4" />
              </button>
              <button 
                className="w-10 h-10 rounded-xl bg-[#1A1A1A] hover:bg-[#C59F60] text-neutral-300 hover:text-black flex items-center justify-center transition-all duration-200 border border-[#2A2A2A]"
                title="Canal Exclusivo"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 sm:mb-5 font-mono">
              Categorías
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-neutral-300 font-medium">
              {[
                { id: 'celulares', label: 'Flagship Smartphones' },
                { id: 'gaming', label: 'Celulares Gamer' },
                { id: 'smartwatches', label: 'Relojes de Lujo' },
                { id: 'audio', label: 'Audio Hi-Fi' },
                { id: 'laptops', label: 'Laptops & Workstations' },
                { id: 'accesorios', label: 'Bases & GaN Gold' },
              ].map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => onCategorySelect(cat.id)} 
                    className="hover:text-[#C59F60] transition-colors duration-200 flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-[#C59F60] transition-colors shrink-0"></span>
                    <span>{cat.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 sm:mb-5 font-mono">
              Asesor TAVO & Soporte
            </h4>
            <ul className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-neutral-300 font-medium">
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Phone className="w-4 h-4 text-[#C59F60] shrink-0" />
                <span className="font-mono">800-TAVO-VIP</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Mail className="w-4 h-4 text-[#C59F60] shrink-0" />
                <span className="font-mono text-xs">tavo@latiendatavo.com</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <ShieldCheck className="w-4 h-4 text-[#C59F60] shrink-0" />
                <span>Garantía Oficial 12 Meses</span>
              </li>
              <li className="flex items-center gap-2.5 sm:gap-3">
                <Truck className="w-4 h-4 text-[#C59F60] shrink-0" />
                <span>Rastreo Express en Tiempo Real</span>
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em] mb-4 sm:mb-5 font-mono">
              Garantía TAVO
            </h4>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { icon: ShieldCheck, title: 'Dispositivos 100% Originales', desc: 'Certificados de fábrica con sellos intactos' },
                { icon: Truck, title: 'Envío Asegurado 24h', desc: 'Embalaje de lujo blindado para Colombia' },
                { icon: Lock, title: 'Transacciones Blindadas SSL', desc: 'Protocolo bancario 256-bit' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 bg-[#111111] p-2.5 sm:p-3 rounded-xl border border-[#222222]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#C59F60]/10 flex items-center justify-center shrink-0 mt-0.5 border border-[#C59F60]/20">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59F60]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{title}</p>
                    <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-neutral-500 gap-3 sm:gap-4 font-mono">
          <p>© 2026 La tienda TAVO. Todos los derechos reservados.</p>
          
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs font-semibold">
            <span className="hover:text-[#C59F60] cursor-pointer transition-colors">Términos de Servicio</span>
            <span className="hover:text-[#C59F60] cursor-pointer transition-colors">Política de Privacidad</span>
            <span className="hover:text-[#C59F60] cursor-pointer transition-colors">Garantía VIP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
