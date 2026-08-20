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
        <div className={`w-screen max-w-lg shadow-2xl flex flex-col border-l transition-all ${
          isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
        }`}>
          
          {/* Header */}
          <div className="p-6 bg-[#0A0A0A] text-white flex items-center justify-between border-b border-[#222222]">
            <div className="flex items-center gap-3.5">
              <TavoIsotype className="w-10 h-10" />
              <div className="text-left">
                <h2 className="text-xl font-black font-heading tracking-tight flex items-center gap-1.5">
                  <span>Cesta de Compras</span>
                  <span className="text-[#C59F60]">TAVO</span>
                </h2>
                <p className="text-xs text-neutral-400 font-mono">{cartItems.length} artículos seleccionados</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="w-9 h-9 rounded-xl bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black text-neutral-400 flex items-center justify-center transition-colors border border-[#2A2A2A]"
              aria-label="Cerrar carrito"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping VIP Progress */}
          <div className={`px-6 py-4 border-b text-left ${
            isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-2 text-neutral-300">
                <Truck className="w-4 h-4 text-[#C59F60]" />
                <span>Envío Express VIP Gratis</span>
              </span>
              <span className={`font-mono font-bold text-xs ${subtotal >= freeShippingThreshold ? 'text-[#2ECC71]' : 'text-[#C59F60]'}`}>
                {subtotal >= freeShippingThreshold ? '✓ Califica para Envío Gratis' : `Faltan $${(freeShippingThreshold - subtotal).toLocaleString('es-CO')} COP`}
              </span>
            </div>
            <div className={`w-full rounded-full h-2 overflow-hidden ${isDark ? 'bg-[#222222]' : 'bg-neutral-200'}`}>
              <div 
                className="bg-gradient-to-r from-[#C59F60] to-[#DDB856] h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedColor}-${item.selectedStorage}`} 
                  className={`p-4 rounded-xl border flex items-center gap-4 group transition-all ${
                    isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
                  }`}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className={`w-16 h-16 object-contain rounded-xl p-1 border ${
                      isDark ? 'bg-[#111111] border-[#2A2A2A]' : 'bg-white border-neutral-200'
                    }`} 
                  />
                  <div className="flex-1 text-left min-w-0">
                    <h4 className={`text-sm font-extrabold truncate font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-mono truncate mt-0.5">
                      {item.selectedColor ? `${item.selectedColor}` : ''}{item.selectedStorage ? ` · ${item.selectedStorage}` : ''}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-base font-black font-mono text-[#C59F60]">
                        ${item.price.toLocaleString('es-CO')} COP
                      </span>
                      <div className={`flex items-center gap-1.5 border rounded-lg px-2 py-1 ${
                        isDark ? 'bg-[#111111] border-[#2A2A2A]' : 'bg-white border-neutral-200'
                      }`}>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                          className="text-neutral-400 hover:text-[#E74C3C] p-0.5"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black font-mono w-5 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                          className="text-neutral-400 hover:text-[#C59F60] p-0.5"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.id)} 
                    className="text-neutral-500 hover:text-[#E74C3C] p-1.5 transition-colors"
                    aria-label="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-[#161616] text-neutral-500' : 'bg-neutral-100 text-neutral-400'
                }`}>
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className={`text-lg font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
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
            <div className={`p-6 border-t space-y-4 ${
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
                    className={`w-full rounded-xl pl-9 pr-3 py-2.5 text-xs uppercase font-mono font-bold outline-none border ${
                      isDark 
                        ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' 
                        : 'bg-white border-neutral-300 text-black focus:border-[#C59F60]'
                    }`} 
                  />
                  <Tag className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <button 
                  type="submit" 
                  className="btn-gold-primary text-xs font-bold px-4 py-2.5 rounded-xl"
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
              <div className="space-y-2 text-xs sm:text-sm text-neutral-400 text-left pt-2 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                    ${subtotal.toLocaleString('es-CO')} COP
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#2ECC71] font-bold">
                    <span>Descuento VIP (10%):</span>
                    <span>-${discountAmount.toLocaleString('es-CO')} COP</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Envío Express:</span>
                  <span className="font-bold">
                    {shippingCost === 0 ? <strong className="text-[#2ECC71]">GRATIS</strong> : `$${shippingCost.toLocaleString('es-CO')} COP`}
                  </span>
                </div>
                <div className={`pt-3 border-t flex justify-between text-lg font-black font-heading ${
                  isDark ? 'border-[#222222] text-white' : 'border-[#EAEAEA] text-[#1A1A1A]'
                }`}>
                  <span>Total</span>
                  <span className="text-[#C59F60] text-xl font-mono">
                    ${total.toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={onProceedToCheckout}
                className="w-full btn-gold-primary py-4 rounded-xl text-base font-black flex items-center justify-center gap-2.5 shadow-xl"
              >
                <span>Proceder al Pago Seguro</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2ECC71]" />
                <span>Pago Encriptado SSL · Garantía 100% Oficial D'TAVO</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
