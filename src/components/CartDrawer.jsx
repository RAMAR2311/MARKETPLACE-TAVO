import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { TavoIsotype } from './TavoLogo';

export default function CartDrawer({
  theme,
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = discountApplied ? Math.round(subtotal * 0.10) : 0;
  const shippingCost = subtotal > 300000 || subtotal === 0 ? 0 : 18000;
  const total = subtotal - discountAmount + shippingCost;
  const freeShippingThreshold = 300000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'DTAVO2026' || cleanCode === 'GOLDVIP') {
      setDiscountApplied(true);
      setCouponError('');
    } else {
      setCouponError('Cupón inválido. Prueba con DTAVO2026 o GOLDVIP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className={`w-screen max-w-full sm:max-w-lg shadow-2xl flex flex-col border-l transition-all ${
          isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
        }`}>
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-[#222222]">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <TavoIsotype className="w-8 h-8 sm:w-10 sm:h-10" />
              <div className="text-left">
                <h2 className="text-lg sm:text-xl font-black font-heading tracking-tight flex items-center gap-1.5">
                  <span>Cesta de Compras</span>
                  <span className="text-[#C59F60]">TAVO</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-mono">{cartItems.length} artículos</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black text-neutral-400 flex items-center justify-center transition-colors border border-[#2A2A2A]"
              aria-label="Cerrar carrito"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping VIP Progress */}
          <div className={`px-4 sm:px-6 py-3 sm:py-4 border-b text-left ${
            isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
          }`}>
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold mb-1.5 sm:mb-2">
              <span className="flex items-center gap-1.5 sm:gap-2 text-neutral-300">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59F60]" />
                <span>Envío Express VIP Gratis</span>
              </span>
              <span className={`font-mono font-bold text-[10px] sm:text-xs ${subtotal >= freeShippingThreshold ? 'text-[#2ECC71]' : 'text-[#C59F60]'}`}>
                {subtotal >= freeShippingThreshold ? '✓ Envío Gratis Activo' : `Faltan $${(freeShippingThreshold - subtotal).toLocaleString('es-CO')}`}
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 sm:h-2 overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-neutral-200'}`}>
              <div 
                className="bg-gradient-to-r from-[#C59F60] to-[#DDB856] h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-3.5 sm:px-6 py-3 sm:py-4 space-y-2.5 sm:space-y-3.5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} 
                  className={`p-3 sm:p-4 rounded-xl border flex items-center gap-3 sm:gap-4 group transition-all ${
                    isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-xl p-1 border shrink-0 ${
                      isDark ? 'bg-[#111111] border-[#2A2A2A]' : 'bg-white border-neutral-200'
                    }`} 
                  />
                  <div className="flex-1 text-left min-w-0">
                    <h4 className={`text-xs sm:text-sm font-extrabold truncate font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-mono truncate mt-0.5">
                      {item.selectedColor ? `${item.selectedColor}` : ''}{item.selectedStorage ? ` · ${item.selectedStorage}` : ''}
                    </p>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between gap-2">
                      <span className="text-sm sm:text-base font-black font-mono text-[#C59F60] truncate">
                        ${item.price.toLocaleString('es-CO')}
                      </span>
                      <div className={`flex items-center gap-1 sm:gap-1.5 border rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 shrink-0 ${
                        isDark ? 'bg-[#111111] border-[#2A2A2A]' : 'bg-white border-neutral-200'
                      }`}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                          className="text-neutral-400 hover:text-[#E74C3C] p-0.5"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                        <span className="text-xs font-black font-mono w-4 sm:w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                          className="text-neutral-400 hover:text-[#C59F60] p-0.5"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)} 
                    className="text-neutral-500 hover:text-[#E74C3C] p-1 sm:p-1.5 transition-colors shrink-0"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${
                  isDark ? 'bg-[#161616] text-neutral-500' : 'bg-neutral-100 text-neutral-400'
                }`}>
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className={`text-base sm:text-lg font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  Tu cesta está vacía
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Explora nuestra colección y añade tus productos exclusivos.
                </p>
              </div>
            )}
          </div>

          {/* Checkout & Summary Footer */}
          {cartItems.length > 0 && (
            <div className={`p-4 sm:p-6 border-t space-y-3 sm:space-y-4 ${
              isDark ? 'bg-[#141414] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
            }`}>
              
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Cupón: DTAVO2026" 
                    value={couponCode} 
                    onChange={(e) => setCouponCode(e.target.value)}
                    className={`w-full rounded-xl pl-8 sm:pl-9 pr-2.5 py-2 sm:py-2.5 text-xs uppercase font-mono font-bold outline-none border ${
                      isDark 
                        ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' 
                        : 'bg-white border-neutral-300 text-black focus:border-[#C59F60]'
                    }`} 
                  />
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button 
                  type="submit" 
                  className="btn-gold-primary text-xs font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl shrink-0"
                >
                  Aplicar
                </button>
              </form>

              {discountApplied && (
                <p className="text-xs font-bold text-[#2ECC71] text-left font-mono">
                  ✓ 10% de descuento VIP aplicado con éxito
                </p>
              )}
              {couponError && (
                <p className="text-xs font-bold text-[#E74C3C] text-left font-mono">
                  {couponError}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-400 text-left pt-1 sm:pt-2 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    ${subtotal.toLocaleString('es-CO')} COP
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#2ECC71] font-bold">
                    <span>Descuento VIP (10%):</span>
                    <span>-${discountAmount.toLocaleString('es-CO')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío Express:</span>
                  <span className="font-bold">
                    {shippingCost === 0 ? <strong className="text-[#2ECC71]">GRATIS</strong> : `$${shippingCost.toLocaleString('es-CO')}`}
                  </span>
                </div>
                <div className={`pt-2.5 sm:pt-3 border-t flex justify-between text-base sm:text-lg font-black font-heading ${
                  isDark ? 'border-[#222222] text-white' : 'border-[#EAEAEA] text-[#1A1A1A]'
                }`}>
                  <span>Total</span>
                  <span className="text-[#C59F60] text-lg sm:text-xl font-mono">
                    ${total.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={onProceedToCheckout}
                className="w-full btn-gold-primary py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-black flex items-center justify-center gap-2.5 shadow-xl"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2ECC71] shrink-0" />
                <span>Pago Encriptado SSL · Garantía Oficial TAVO</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
