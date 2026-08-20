import React, { useState } from 'react';
import { Truck, ShieldCheck, ArrowRight, Sparkles, Star, Check, Zap } from 'lucide-react';
import { PROMO_BANNERS } from '../data/products';
import { TavoIsotype } from './TavoLogo';

export default function Hero({ onExploreClick, onOpenTechBot }) {
  const [currentSlide] = useState(0);
  const [selectedHeroColor, setSelectedHeroColor] = useState('Titanio Natural');
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const heroColors = [
    { name: 'Titanio Natural', code: '#C59F60', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop' },
    { name: 'Titanio Azul', code: '#2D3848', img: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&auto=format&fit=crop' },
    { name: 'Titanio Negro', code: '#1C1D21', img: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop' },
  ];

  const currentHeroImg = heroColors.find(c => c.name === selectedHeroColor)?.img || heroColors[0].img;

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const slide = PROMO_BANNERS[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white border-b border-[#222222]">
      {/* Luxury Cinematic Ambient Glow & Mesh Texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C160C] via-[#0A0A0A] to-[#0A0A0A] opacity-95"></div>
        <div className="absolute -top-40 right-1/4 w-[36rem] h-[36rem] bg-[#C59F60]/12 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute bottom-0 -left-20 w-[28rem] h-[28rem] bg-[#8C6A34]/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(197,159,96,0.08)_1px,transparent_1px)] [background-size:30px_30px] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-left">
            
            {/* VIP Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-[#141414] border border-[#C59F60]/40 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xl">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DDB856] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-[#C59F60]"></span>
              </span>
              <TavoIsotype className="w-3.5 h-3.5 sm:w-4 sm:h-4" glow={false} />
              <span className="text-[10px] sm:text-xs font-black text-neutral-200 tracking-wider uppercase font-mono">
                {slide.badge} · 🇨🇴 COLOMBIA
              </span>
            </div>

            {/* Main Headline with Metallic Gold Gradient */}
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black font-heading tracking-tight text-white leading-[1.08]">
              La tienda <span className="text-gold-gradient">TAVO</span>: Vanguardia & Lujo
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-neutral-300 font-medium max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Promotion Coupon Box with Instant Copy */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl bg-[#141414] border border-[#C59F60]/30 text-xs shadow-inner">
              <span className="text-neutral-400 text-[11px] sm:text-xs">Cupón VIP:</span>
              <button
                onClick={() => handleCopyCoupon('DTAVO2026')}
                className="text-[#C59F60] font-mono font-black tracking-widest px-2.5 py-1 rounded-lg bg-[#C59F60]/10 border border-[#C59F60]/40 hover:bg-[#C59F60] hover:text-black transition-all flex items-center gap-1.5 cursor-pointer text-xs"
                title="Copiar cupón"
              >
                <span>DTAVO2026</span>
                {copiedCoupon ? <Check className="w-3.5 h-3.5 text-[#2ECC71]" /> : <Zap className="w-3.5 h-3.5" />}
              </button>
              {copiedCoupon && (
                <span className="text-[#2ECC71] text-[11px] font-bold font-mono">¡Copiado! (-10%)</span>
              )}
            </div>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onExploreClick}
                className="btn-gold-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 shadow-2xl w-full sm:w-auto"
              >
                <span>Explorar Colección Flagship</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenTechBot}
                className="btn-gold-outline px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 w-full sm:w-auto"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#DDB856]" />
                <span>Asesor TAVO VIP</span>
              </button>
            </div>

            {/* Real-time Social Proof Metrics */}
            <div className="pt-5 sm:pt-6 border-t border-[#222222] grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
              <div>
                <p className="text-lg sm:text-2xl font-black font-mono text-[#C59F60]">+10.000</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">Clientes VIP Colombia</p>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  <span className="text-lg sm:text-2xl font-black font-mono text-white">4.9/5</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">Satisfacción 100%</p>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-black font-mono text-[#2ECC71]">24h</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-medium">Entrega Blindada</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Luxury Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-4 lg:mt-0">
            
            {/* Ambient Back Glow */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-[#C59F60]/20 rounded-full blur-[80px] pointer-events-none animate-pulse"></div>

            <div className="relative w-full max-w-md bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#0A0A0A] rounded-3xl border-2 border-[#C59F60]/40 p-4 sm:p-7 shadow-2xl shadow-[#C59F60]/20 space-y-4 sm:space-y-5 group hover:border-[#C59F60] transition-all duration-500">
              
              {/* Card Header Tag */}
              <div className="flex items-center justify-between">
                <span className="bg-[#C59F60] text-[#0A0A0A] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  ✦ DESTACADO VIP
                </span>
                <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#2ECC71] font-mono">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2ECC71] animate-ping"></span>
                  <span>En Stock para Colombia</span>
                </span>
              </div>

              {/* Showcase Image Stage with Hover Scale */}
              <div className="relative py-3 sm:py-4 flex justify-center items-center overflow-hidden rounded-2xl bg-[#161616]/80 border border-[#222222]">
                <img
                  src={currentHeroImg}
                  alt={`iPhone 15 Pro Max ${selectedHeroColor}`}
                  className="h-44 sm:h-64 object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-2xl"
                />

                {/* Floating Micro Badge */}
                <div className="absolute bottom-2.5 left-2.5 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#C59F60]/30 px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono text-neutral-300">
                  Chip A17 Pro (3nm)
                </div>
                <div className="absolute top-2.5 right-2.5 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#C59F60]/30 px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-mono text-[#C59F60]">
                  Cámara 48MP 5x
                </div>
              </div>

              {/* Showcase Product Details & Interactive Color Selector */}
              <div className="space-y-2.5 sm:space-y-3 text-left">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#C59F60] uppercase">Apple Flagship</span>
                  <h3 className="text-lg sm:text-xl font-black font-heading text-white">iPhone 15 Pro Max Titanium</h3>
                </div>

                {/* Live Color Switcher */}
                <div className="flex items-center justify-between pt-0.5">
                  <div className="text-[10px] sm:text-[11px] text-neutral-400 font-mono truncate mr-2">
                    Color: <strong className="text-[#C59F60]">{selectedHeroColor}</strong>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    {heroColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedHeroColor(color.name)}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all ${
                          selectedHeroColor === color.name
                            ? 'ring-2 ring-[#C59F60] ring-offset-2 ring-offset-[#111111] scale-110'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Price Box & Quick Action */}
                <div className="pt-3 border-t border-[#222222] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-lg sm:text-2xl font-black font-mono text-[#C59F60]">
                      $ 5.499.000 COP
                    </span>
                    <p className="text-[9px] sm:text-[10px] text-[#2ECC71] font-mono font-bold">12 cuotas de $458.250/mes</p>
                  </div>

                  <button
                    onClick={onExploreClick}
                    className="btn-gold-primary px-3 sm:px-4 py-2 rounded-xl text-xs font-black shrink-0"
                  >
                    Ver Catálogo
                  </button>
                </div>
              </div>

              {/* Floating Trust Ribbons - Inset to prevent mobile horizontal overflow */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-[#222222]/50 text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
                  <span className="truncate font-bold text-white">Envío 24h Asegurado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59F60] shrink-0" />
                  <span className="truncate font-bold text-white">Garantía Oficial 12M</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
