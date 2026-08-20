import React, { useState, useEffect } from 'react';
import { Flame, Zap, Clock, ShoppingCart, Eye, Star, Heart } from 'lucide-react';

export default function FlashDeals({ theme, products, onAddToCart, onQuickView, onToggleWishlist, wishlistIds = [] }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  const isDark = theme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter(p => p.isFlashDeal);
  if (flashProducts.length === 0) return null;

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="bg-[#0A0A0A] text-[#C59F60] text-lg sm:text-xl font-black font-mono w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border border-[#C59F60]/40 shadow-inner">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-neutral-400 font-bold uppercase mt-1 tracking-wider">{label}</span>
    </div>
  );

  return (
    <section className={`py-14 border-b transition-colors ${
      isDark ? 'bg-[#0E0E0E] border-[#222222]' : 'bg-[#FAFAFA] border-[#E5E5E5]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar: Luxury Gold Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-gradient-to-r from-[#141414] via-[#1A1813] to-[#141414] border border-[#C59F60]/30 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C59F60]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#C59F60]/15 border border-[#C59F60]/40 flex items-center justify-center shadow-lg">
              <Flame className="w-8 h-8 text-[#C59F60]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-white flex items-center gap-2">
                  <span>Ofertas Exclusivas</span>
                  <span className="text-[#C59F60]">TAVO</span>
                </h2>
                <span className="bg-[#C59F60] text-[#0A0A0A] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  VIP DEALS
                </span>
              </div>
              <p className="text-sm text-neutral-400 font-medium mt-1">
                Dispositivos insignia seleccionados con beneficio por tiempo limitado
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-bold font-mono uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#C59F60]" />
              <span>Finaliza en:</span>
            </div>
            <div className="flex items-center gap-2">
              <TimeBlock value={timeLeft.hours} label="Horas" />
              <span className="text-xl font-black text-[#C59F60] font-mono pb-4">:</span>
              <TimeBlock value={timeLeft.minutes} label="Min" />
              <span className="text-xl font-black text-[#C59F60] font-mono pb-4">:</span>
              <TimeBlock value={timeLeft.seconds} label="Seg" />
            </div>
          </div>
        </div>

        {/* Flash Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flashProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            return (
            <div 
              key={product.id}
              className={`rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border hover:-translate-y-1.5 ${
                isDark 
                  ? 'bg-[#111111] border-[#222222] hover:border-[#C59F60]/50 hover:shadow-xl hover:shadow-[#C59F60]/10' 
                  : 'bg-white border-[#DDDDDD] hover:border-[#C59F60] hover:shadow-xl'
              }`}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#C59F60] text-[#0A0A0A] font-black text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-[#0A0A0A]" />
                <span>-{product.discountPercent}% OFF</span>
              </div>

              {/* Action Buttons Top Right */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
                {onToggleWishlist && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 ${
                      isWishlisted 
                        ? 'bg-[#C59F60] text-[#0A0A0A] scale-110 shadow-lg shadow-[#C59F60]/40' 
                        : isDark ? 'bg-[#1A1A1A]/80 hover:bg-[#C59F60] hover:text-black text-neutral-300 border border-[#333333]' : 'bg-white/90 hover:bg-[#C59F60] hover:text-black text-neutral-600 border border-[#DDDDDD]'
                    }`}
                    title={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#0A0A0A]' : ''}`} />
                  </button>
                )}

                <button 
                  onClick={() => onQuickView(product)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 ${
                    isDark ? 'bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black text-white' : 'bg-neutral-100 hover:bg-[#C59F60] hover:text-black text-black'
                  }`}
                  title="Ficha Técnica"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Image */}
              <div className={`relative py-6 flex justify-center items-center overflow-hidden rounded-xl transition-colors ${
                isDark ? 'bg-[#161616]' : 'bg-[#F9F9F9]'
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-44 object-contain transition-transform duration-500 group-hover:scale-105" 
                />
              </div>

              {/* Product Details */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-bold uppercase tracking-wider text-[#C59F60]">{product.brand}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold text-neutral-300">{product.rating}</span>
                  </div>
                </div>

                <h3 className={`font-bold font-heading text-base line-clamp-1 transition-colors ${
                  isDark ? 'text-white group-hover:text-[#C59F60]' : 'text-[#1A1A1A] group-hover:text-[#A6824D]'
                }`}>
                  {product.name}
                </h3>

                {/* Pricing with Mono Font */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-xl font-black font-mono text-[#C59F60]">
                    ${product.price.toLocaleString('es-CO')} COP
                  </span>
                  <span className="text-xs text-neutral-500 line-through font-mono">
                    ${product.originalPrice.toLocaleString('es-CO')}
                  </span>
                </div>

                {/* Stock Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px] text-neutral-400 font-medium">
                    <span>Disponibilidad VIP</span>
                    <span className="text-[#C59F60] font-bold">{product.stock} disponibles</span>
                  </div>
                  <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-neutral-200'}`}>
                    <div 
                      className="h-full bg-gradient-to-r from-[#C59F60] to-[#DDB856] rounded-full"
                      style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-2 border-t border-[#222222]/30">
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full btn-gold-primary py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Añadir a la Cesta</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>

      </div>
    </section>
  );
}
