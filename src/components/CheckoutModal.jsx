import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TavoIsotype } from './TavoLogo';

export default function CheckoutModal({ theme, isOpen, onClose, cartTotal, onClearCart }) {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    phone: '300 123 4567',
    address: 'Calle 93 # 12-45, Apto 501',
    city: 'Bogotá',
    zip: '110221',
    paymentMethod: 'card'
  });

  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      onClearCart();
      // Launch Gold Confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C59F60', '#DDB856', '#FFFFFF', '#0A0A0A']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4">
      <div className={`rounded-3xl max-w-2xl w-full shadow-2xl border overflow-hidden relative transition-all max-h-[92vh] overflow-y-auto ${
        isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        
        {/* Header */}
        <div className="bg-[#0A0A0A] text-white p-4 sm:p-6 flex items-center justify-between border-b border-[#222222]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <TavoIsotype className="w-8 h-8 sm:w-10 sm:h-10" />
            <div className="text-left">
              <h2 className="text-lg sm:text-xl font-black font-heading tracking-tight flex items-center gap-1.5">
                <span>Checkout Seguro</span>
                <span className="text-[#C59F60]">TAVO</span>
              </h2>
              <p className="text-[11px] sm:text-xs text-neutral-400 font-mono">Garantía oficial y entrega express 24h</p>
            </div>
          </div>

          {step !== 3 && (
            <button 
              onClick={onClose} 
              className="w-8 h-8 sm:w-9 sm:h-9 bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black rounded-full flex items-center justify-center text-neutral-400 transition-colors border border-[#2A2A2A]"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className={`px-4 sm:px-6 py-2.5 sm:py-3 border-b flex justify-between text-[10px] sm:text-xs font-mono font-bold ${
          isDark ? 'bg-[#161616] border-[#222222] text-neutral-400' : 'bg-[#FAFAFA] border-[#EAEAEA] text-neutral-600'
        }`}>
          <span className={step >= 1 ? 'text-[#C59F60] font-black' : ''}>
            1. Envío
          </span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#C59F60] font-black' : ''}>
            2. Pago VIP
          </span>
          <span>→</span>
          <span className={step === 3 ? 'text-[#2ECC71] font-black' : ''}>
            3. Confirmado
          </span>
        </div>

        {/* Step Content */}
        <div className="p-4 sm:p-6 text-left">
          
          {/* Step 1: Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-3.5 sm:space-y-4">
              <h3 className={`text-sm sm:text-base font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <MapPin className="w-4 h-4 text-[#C59F60]" />
                <span>Dirección de Envío VIP (Colombia)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 font-mono text-[11px]">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 font-mono text-[11px]">Teléfono Móvil (WhatsApp):</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 font-bold mb-1 font-mono text-[11px]">Dirección Completa (Calle, Cra, Apto, Edificio):</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 font-mono text-[11px]">Ciudad / Municipio:</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 font-mono text-[11px]">Código Postal / Barrio:</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto btn-gold-primary px-6 py-3 rounded-xl text-xs font-black flex items-center justify-center gap-2"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-3.5 sm:space-y-4">
              <h3 className={`text-sm sm:text-base font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <CreditCard className="w-4 h-4 text-[#C59F60]" />
                <span>Seleccionar Método de Pago</span>
              </h3>

              <div className="space-y-2 text-xs">
                {/* Credit Card / PSE */}
                <label className={`flex items-center justify-between p-3 sm:p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-[#C59F60] bg-[#C59F60]/10' 
                    : isDark ? 'border-[#222222] bg-[#161616]' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'card'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-[#C59F60]" 
                    />
                    <div>
                      <span className={`font-extrabold block text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        Tarjeta de Crédito / Débito / PSE
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-neutral-400">Visa, Mastercard, Nequi, Daviplata, Bancolombia</p>
                    </div>
                  </div>
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-[#C59F60] shrink-0" />
                </label>

                {/* WhatsApp Direct Concierge Payment */}
                <label className={`flex items-center justify-between p-3 sm:p-3.5 border rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'whatsapp' 
                    ? 'border-[#25D366] bg-[#25D366]/10' 
                    : isDark ? 'border-[#222222] bg-[#161616]' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'whatsapp'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                      className="accent-[#25D366]" 
                    />
                    <div>
                      <span className={`font-extrabold block text-xs sm:text-sm ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        Coordinar con Asesor VIP por WhatsApp
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-neutral-400">Transferencia Bancolombia / Contraentrega</p>
                    </div>
                  </div>
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] shrink-0" />
                </label>
              </div>

              {/* Order Total Box */}
              <div className="bg-[#0A0A0A] text-white p-3.5 sm:p-4 rounded-2xl flex items-center justify-between border border-[#222222]">
                <div>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono">Total a Pagar (Envío Express Gratis):</p>
                  <p className="text-xl sm:text-2xl font-black text-[#C59F60] font-mono">${cartTotal.toLocaleString('es-CO')} COP</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#C59F60] text-[#0A0A0A] text-[9px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase font-mono">
                    24H EXPRESS
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-neutral-400 hover:text-white"
                >
                  ← Volver a Dirección
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto btn-gold-primary px-6 py-3.5 rounded-xl text-xs font-black shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Confirmar Pedido</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-4 sm:py-6 space-y-3.5 sm:space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-[#C59F60]/20 border-2 border-[#C59F60] flex items-center justify-center animate-gold-pulse">
                <TavoIsotype className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#2ECC71]/15 text-[#2ECC71] border border-[#2ECC71]/30 text-xs font-extrabold px-3 py-1 rounded-full font-mono">
                <CheckCircle className="w-4 h-4" />
                <span>¡Pedido Confirmado con Éxito!</span>
              </div>

              <h2 className={`text-xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ¡Tu orden exclusiva está en camino!
              </h2>

              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Estimado(a) <strong>{formData.name}</strong>, tu orden <strong className="text-[#C59F60] font-mono">#TAVO-2026-CO</strong> ha sido confirmada y está siendo despachada para entrega asegurada.
              </p>

              <div className={`p-3.5 sm:p-4 rounded-2xl border text-left max-w-md mx-auto text-xs space-y-1.5 font-mono ${
                isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
              }`}>
                <div className="flex justify-between font-bold">
                  <span className="text-neutral-400">Entrega:</span>
                  <span className="text-[#2ECC71]">24h Garantizadas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destino:</span>
                  <span className={`truncate max-w-[200px] ${isDark ? 'text-white' : 'text-black'}`}>{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Garantía:</span>
                  <span className="text-[#C59F60] font-bold">12 Meses Oficial TAVO</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-3 btn-gold-primary px-8 py-3 rounded-xl text-xs font-black"
              >
                Volver a la Colección
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
