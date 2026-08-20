import React, { useState } from 'react';
import { X, Star, ShoppingCart, Truck, Crown, Heart } from 'lucide-react';

export default function ProductDetailModal({ theme, product, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storageOptions?.[0] || '');
  const [activeTab, setActiveTab] = useState('specs');
  const [zipCode, setZipCode] = useState('');
  const [zipCalculated, setZipCalculated] = useState(false);

  const isDark = theme === 'dark';

  if (!product) return null;

  const handleCalculateShipping = (e) => {
    e.preventDefault();
    if (zipCode.trim()) setZipCalculated(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className={`rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative border transition-all ${
        isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            isDark 
              ? 'bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black text-neutral-400 border border-[#2A2A2A]' 
              : 'bg-neutral-100 hover:bg-[#C59F60] hover:text-black text-neutral-600 border border-neutral-200'
          }`}
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Image & Color variants */}
          <div className={`md:col-span-5 flex flex-col justify-between items-center p-5 sm:p-8 relative border-b md:border-b-0 md:border-r ${
            isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
          }`}>
            
            {/* VIP Status Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#C59F60] text-[#0A0A0A] text-[9px] sm:text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md font-mono">
              <Crown className="w-3 h-3" />
              <span>TAVO OFFICIAL</span>
            </div>

            <div className="py-6 sm:py-8 flex justify-center items-center w-full">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-52 sm:max-h-72 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className={`w-full pt-3 sm:pt-4 border-t text-left ${isDark ? 'border-[#222222]' : 'border-[#DDDDDD]'}`}>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5 font-mono">
                  Color: <strong className="text-[#C59F60]">{selectedColor}</strong>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-lg transition-all p-0.5 ${
                        selectedColor === color.name 
                          ? 'ring-2 ring-[#C59F60] ring-offset-2 ring-offset-black scale-110' 
                          : isDark ? 'ring-1 ring-neutral-700' : 'ring-1 ring-neutral-300'
                      }`}
                      title={color.name}
                    >
                      <span className="block w-full h-full rounded-md shadow-inner" style={{ backgroundColor: color.code }} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Details, Tabs, Pricing */}
          <div className="md:col-span-7 p-4 sm:p-8 text-left space-y-4 sm:space-y-5">
            
            {/* Brand & Title */}
            <div>
              <span className="text-[10px] sm:text-[11px] font-black text-[#C59F60] uppercase tracking-[0.2em] font-mono">
                {product.brand}
              </span>
              <h2 className={`text-xl sm:text-3xl font-black font-heading mt-1 leading-tight ${
                isDark ? 'text-white' : 'text-[#1A1A1A]'
              }`}>
                {product.name}
              </h2>

              <div className="flex items-center gap-2 mt-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                        i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : isDark ? 'text-neutral-700' : 'text-neutral-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-bold font-mono text-neutral-300">{product.rating}</span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 font-mono">({product.reviewsCount} reseñas)</span>
              </div>
            </div>

            {/* Price Card */}
            <div className={`p-3 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
            }`}>
              <div>
                <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono uppercase tracking-wider block">
                  Precio Especial TAVO VIP
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[#C59F60] font-mono">${product.price.toLocaleString('es-CO')}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs sm:text-sm text-neutral-500 line-through font-mono">${product.originalPrice.toLocaleString('es-CO')}</span>
                  )}
                </div>
              </div>
              {product.discountPercent > 0 && (
                <div className="bg-[#C59F60] text-[#0A0A0A] font-black text-[11px] sm:text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-md font-mono self-start sm:self-auto">
                  Ahorro: ${(product.originalPrice - product.price).toLocaleString('es-CO')} (-{product.discountPercent}%)
                </div>
              )}
            </div>

            {/* Storage Options */}
            {product.storageOptions && (
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1.5 font-mono">
                  Capacidad de Almacenamiento
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold font-mono transition-all duration-200 border ${
                        selectedStorage === opt
                          ? 'bg-[#C59F60] text-[#0A0A0A] border-[#C59F60] shadow-md shadow-[#C59F60]/20'
                          : isDark 
                            ? 'bg-[#1A1A1A] text-neutral-300 border-[#2A2A2A] hover:border-[#C59F60]/50' 
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className={`border-b ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
              <div className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
                {[
                  { id: 'specs', label: 'Ficha Técnica' },
                  { id: 'description', label: 'Descripción' },
                  { id: 'shipping', label: 'Envío & Garantía' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 px-2.5 sm:px-3 text-xs font-bold transition-all border-b-2 font-mono shrink-0 ${
                      activeTab === tab.id 
                        ? 'border-[#C59F60] text-[#C59F60]' 
                        : isDark ? 'border-transparent text-neutral-400 hover:text-white' : 'border-transparent text-neutral-500 hover:text-black'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[110px]">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div 
                      key={key} 
                      className={`p-2 sm:p-2.5 rounded-xl border ${
                        isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
                      }`}
                    >
                      <span className="text-neutral-400 font-mono block uppercase text-[9px] sm:text-[10px] tracking-wider">
                        {key === 'os' ? 'SO' : key === 'screen' ? 'Pantalla' : key === 'processor' ? 'Chip' : key === 'camera' ? 'Cámaras' : key === 'battery' ? 'Batería' : key}:
                      </span>
                      <span className={`font-bold font-mono leading-snug block mt-0.5 text-[11px] sm:text-xs truncate ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'description' && (
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium">
                  {product.description}
                </p>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2.5">
                  <form onSubmit={handleCalculateShipping} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Código Postal (ej: 110111)" 
                      value={zipCode} 
                      onChange={(e) => setZipCode(e.target.value)}
                      className={`rounded-xl px-3 py-2 text-xs font-mono outline-none border flex-1 ${
                        isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-white border-neutral-300 text-black focus:border-[#C59F60]'
                      }`} 
                    />
                    <button 
                      type="submit" 
                      className="btn-gold-primary px-3.5 py-2 rounded-xl text-xs font-black shrink-0"
                    >
                      Calcular
                    </button>
                  </form>
                  {zipCalculated && (
                    <div className="bg-[#2ECC71]/10 border border-[#2ECC71]/30 text-[#2ECC71] p-3 rounded-xl text-xs flex items-center gap-2.5">
                      <Truck className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="font-extrabold">¡Envío Express Asegurado Gratis!</p>
                        <p className="text-[11px] text-neutral-300">Entrega garantizada en tu domicilio antes de 24 horas.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Add to Cart & Wishlist Buttons */}
            <div className={`pt-3 sm:pt-4 border-t flex gap-2.5 sm:gap-3 ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`px-3.5 sm:px-4 py-3 rounded-xl border flex items-center justify-center transition-all ${
                    isWishlisted
                      ? 'bg-[#C59F60] text-[#0A0A0A] border-[#C59F60] shadow-md shadow-[#C59F60]/30'
                      : isDark
                        ? 'bg-[#1A1A1A] text-neutral-400 hover:text-white border-[#2A2A2A] hover:border-[#C59F60]'
                        : 'bg-neutral-100 text-neutral-600 hover:text-black border-neutral-200 hover:border-[#C59F60]'
                  }`}
                  title={isWishlisted ? "Quitar de favoritos" : "Guardar en favoritos"}
                  aria-label="Favoritos"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#0A0A0A]' : ''}`} />
                </button>
              )}

              <button
                onClick={() => { 
                  onAddToCart({ ...product, selectedColor, selectedStorage }); 
                  onClose(); 
                }}
                className="flex-1 btn-gold-primary py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar a la Cesta</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
