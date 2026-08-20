import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistModal({
  theme,
  isOpen,
  onClose,
  wishlistIds,
  products,
  onAddToCart,
  onRemoveFromWishlist,
  onQuickView
}) {
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className={`w-screen max-w-full sm:max-w-md shadow-2xl flex flex-col border-l transition-all ${
          isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
        }`}>
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-[#222222]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#C59F60]/20 text-[#C59F60] flex items-center justify-center font-black border border-[#C59F60]/40">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#C59F60]" />
              </div>
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-black font-heading tracking-tight flex items-center gap-1.5">
                  <span>Mis Favoritos</span>
                  <span className="text-[#C59F60]">TAVO</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                  {wishlistedProducts.length} productos guardados
                </p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black text-neutral-400 flex items-center justify-center transition-colors border border-[#2A2A2A]"
              aria-label="Cerrar favoritos"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Wishlisted Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {wishlistedProducts.length > 0 ? (
              wishlistedProducts.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 sm:gap-4 transition-all ${
                    isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl p-1 border cursor-pointer shrink-0 ${
                      isDark ? 'bg-[#111111] border-[#2A2A2A]' : 'bg-white border-neutral-200'
                    }`}
                    onClick={() => {
                      onQuickView(item);
                      onClose();
                    }}
                  />

                  <div className="flex-1 text-left min-w-0">
                    <span className="text-[9px] sm:text-[10px] font-black text-[#C59F60] uppercase font-mono">{item.brand}</span>
                    <h4 
                      onClick={() => {
                        onQuickView(item);
                        onClose();
                      }}
                      className={`text-xs sm:text-sm font-black truncate font-heading cursor-pointer hover:text-[#C59F60] transition-colors ${
                        isDark ? 'text-white' : 'text-[#1A1A1A]'
                      }`}
                    >
                      {item.name}
                    </h4>
                    
                    <p className="text-xs sm:text-sm font-black font-mono text-[#C59F60] mt-0.5 sm:mt-1">
                      ${item.price.toLocaleString('es-CO')} COP
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(item);
                        }}
                        className="btn-gold-primary px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-black flex items-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3 text-[#0A0A0A]" />
                        <span>Añadir</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(item.id)}
                        className="text-neutral-400 hover:text-[#E74C3C] p-1.5 rounded-lg border border-transparent hover:border-[#E74C3C]/30 transition-all"
                        title="Eliminar de favoritos"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
                  isDark ? 'bg-[#161616] text-neutral-500' : 'bg-neutral-100 text-neutral-400'
                }`}>
                  <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-600" />
                </div>
                <h3 className={`text-base sm:text-lg font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  No tienes favoritos aún
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  Haz clic en el corazón de cualquier smartphone o accesorio para guardarlo aquí.
                </p>
              </div>
            )}
          </div>

          {/* Footer of Drawer */}
          {wishlistedProducts.length > 0 && (
            <div className={`p-4 sm:p-6 border-t ${
              isDark ? 'bg-[#141414] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
            }`}>
              <button 
                onClick={() => {
                  wishlistedProducts.forEach((p) => onAddToCart(p));
                  onClose();
                }}
                className="w-full btn-gold-primary py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Añadir Todos a la Cesta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
