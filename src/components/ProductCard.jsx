import React, { useState } from 'react';
import { ShoppingCart, Star, Eye, Heart, Truck } from 'lucide-react';

export default function ProductCard({ 
  theme,
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist,
  isWishlisted
}) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-3xl flex flex-col justify-between group relative overflow-hidden transition-all duration-300 border hover:-translate-y-2 ${
      isDark 
        ? 'bg-[#111111] border-[#222222] hover:border-[#C59F60]/70 hover:shadow-2xl hover:shadow-[#C59F60]/15' 
        : 'bg-white border-[#DDDDDD] hover:border-[#C59F60] hover:shadow-2xl'
    }`}>
      
      {/* Top Left Badges */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 items-start">
        {product.discountPercent > 0 && (
          <span className="bg-gradient-to-r from-[#C59F60] to-[#DDB856] text-[#0A0A0A] font-black text-[11px] px-2.5 py-0.5 rounded-lg shadow-md flex items-center gap-1 font-mono">
            <span>-{product.discountPercent}%</span>
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#0A0A0A] text-[#DDB856] border border-[#C59F60]/40 font-black text-[10px] px-2 py-0.5 rounded-lg tracking-wider font-mono">
            NUEVO
          </span>
        )}
      </div>

      {/* Top Right Floating Action Buttons */}
      <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1.5 transition-all duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
            isWishlisted 
              ? 'bg-[#C59F60] text-[#0A0A0A] scale-110 shadow-lg shadow-[#C59F60]/40' 
              : isDark 
                ? 'bg-[#1A1A1A]/80 hover:bg-[#C59F60] hover:text-[#0A0A0A] text-neutral-300 border border-[#333333]' 
                : 'bg-white/90 hover:bg-[#C59F60] hover:text-[#0A0A0A] text-neutral-600 border border-[#DDDDDD]'
          }`}
          title={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-label={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isWishlisted ? 'fill-[#0A0A0A]' : ''}`} />
        </button>
      </div>

      {/* Product Image Stage */}
      <div className="relative px-4 pt-7 pb-2 flex justify-center items-center overflow-hidden">
        <div className={`absolute inset-3 rounded-2xl transition-colors ${
          isDark ? 'bg-[#161616]' : 'bg-[#F8F8F8]'
        }`}></div>
        
        <img 
          src={product.image} 
          alt={product.name}
          className="relative z-10 h-52 object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-xl" 
        />

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-4 z-20 bg-[#0A0A0A]/90 hover:bg-[#C59F60] hover:text-[#0A0A0A] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 backdrop-blur-sm border border-[#C59F60]/40"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ficha Técnica</span>
        </button>
      </div>

      {/* Product Information */}
      <div className="px-5 pb-5 text-left flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Express Badge */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#C59F60] font-mono">
              {product.brand}
            </span>
            {product.expressShipping && (
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                isDark ? 'bg-[#1A1A1A] border-[#333333] text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}>
                <Truck className="w-3 h-3 text-[#2ECC71]" />
                <span>Express 24h</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className={`text-base font-bold font-heading line-clamp-1 transition-colors cursor-pointer ${
              isDark ? 'text-white group-hover:text-[#C59F60]' : 'text-[#1A1A1A] group-hover:text-[#A6824D]'
            }`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : isDark ? 'text-neutral-700' : 'text-neutral-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs font-bold text-neutral-300 font-mono">{product.rating}</span>
            <span className="text-[11px] text-neutral-500 font-mono">({product.reviewsCount})</span>
          </div>

          {/* Color Swatches on Card */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    selectedColor === c.name ? 'ring-2 ring-[#C59F60] scale-110' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.code }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-neutral-400 font-mono ml-1 truncate">
                {selectedColor || product.colors[0].name}
              </span>
            </div>
          )}

          {/* Specs Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1">
            {[
              product.specs.screen.split(' ')[0],
              product.specs.processor.split(' ')[0],
              product.specs.ram,
            ].map((spec, idx) => (
              <span 
                key={idx}
                className={`text-[11px] font-medium font-mono px-2 py-0.5 rounded-md border ${
                  isDark ? 'bg-[#1A1A1A] text-neutral-300 border-[#2A2A2A]' : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                }`}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Price & CTA */}
        <div className={`mt-4 pt-3.5 border-t flex items-end justify-between gap-2 ${
          isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'
        }`}>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black font-mono text-[#C59F60] leading-none">
                ${product.price.toLocaleString('es-CO')} COP
              </span>
            </div>
            {product.originalPrice > product.price && (
              <span className="text-xs text-neutral-500 line-through font-mono">
                ${product.originalPrice.toLocaleString('es-CO')}
              </span>
            )}
            <p className="text-[10px] text-[#2ECC71] font-bold mt-1 font-mono">
              12 cuotas de ${Math.round(product.price / 12).toLocaleString('es-CO')}/mes
            </p>
          </div>

          <button
            onClick={() => onAddToCart({ ...product, selectedColor: selectedColor || product.colors?.[0]?.name })}
            className="btn-gold-primary px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 shadow-lg"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-[#0A0A0A]" />
            <span>Añadir</span>
          </button>
        </div>
      </div>
    </div>
  );
}
