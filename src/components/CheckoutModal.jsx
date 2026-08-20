import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TavoIsotype } from './TavoLogo';

export default function CheckoutModal({ theme, isOpen, onClose, cartTotal, onClearCart }) {
  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Confirmation
  const [formData, setFormData] = useState({
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    phone: '55 1234 5678',
    address: 'Av. Paseo de la Reforma 123, Depto 4B',
    city: 'Bogotá',
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
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C59F60', '#DDB856', '#FFFFFF', '#0A0A0A']
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-2xl w-full shadow-2xl border overflow-hidden relative transition-all ${
        isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        
        {/* Header */}
        <div className="bg-[#0A0A0A] text-white p-6 flex items-center justify-between border-b border-[#222222]">
          <div className="flex items-center gap-3">
            <TavoIsotype className="w-10 h-10" />
            <div className="text-left">
              <h2 className="text-xl font-black font-heading tracking-tight flex items-center gap-1.5">
                <span>Checkout Seguro</span>
                <span className="text-[#C59F60]">TAVO</span>
              </h2>
              <p className="text-xs text-neutral-400 font-mono">Finalizar compra con garantía oficial</p>
            </div>
          </div>

          {step !== 3 && (
            <button 
              onClick={onClose} 
              className="w-9 h-9 bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black rounded-full flex items-center justify-center text-neutral-400 transition-colors border border-[#2A2A2A]"
              aria-label="Cerrar modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className={`px-6 py-3 border-b flex justify-between text-xs font-mono font-bold ${
          isDark ? 'bg-[#161616] border-[#222222] text-neutral-400' : 'bg-[#FAFAFA] border-[#EAEAEA] text-neutral-600'
        }`}>
          <span className={step >= 1 ? 'text-[#C59F60] font-black' : ''}>
            1. Datos de Entrega
          </span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#C59F60] font-black' : ''}>
            2. Método de Pago
          </span>
          <span>→</span>
          <span className={step === 3 ? 'text-[#2ECC71] font-black' : ''}>
            3. Pedido Confirmado
          </span>
        </div>

        {/* Step Content */}
        <div className="p-6 text-left">
          
          {/* Step 1: Address */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className={`text-base font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <MapPin className="w-4 h-4 text-[#C59F60]" />
                <span>Dirección de Envío VIP</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-neutral-400 font-bold mb-1 font-mono">Nombre Completo:</label>
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
                  <label className="block text-neutral-400 font-bold mb-1 font-mono">Teléfono de Contacto:</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full rounded-xl px-3 py-2.5 outline-none border transition-colors ${
                      isDark ? 'bg-[#1A1A1A] border-[#2A2A2A] text-white focus:border-[#C59F60]' : 'bg-neutral-50 border-neutral-300 text-black focus:border-[#C59F60]'
                    }`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-neutral-400 font-bold mb-1 font-mono">Dirección Completa (Calle, Número, Depto):</label>
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
                  <label className="block text-neutral-400 font-bold mb-1 font-mono">Ciudad / Estado:</label>
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
                  <label className="block text-neutral-400 font-bold mb-1 font-mono">Código Postal:</label>
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

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="btn-gold-primary px-6 py-3 rounded-xl text-xs font-black"
                >
                  <span>Continuar a Selección de Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className={`text-base font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <CreditCard className="w-4 h-4 text-[#C59F60]" />
                <span>Seleccionar Método de Pago</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {/* Credit Card */}
                <label className={`flex items-center justify-between p-3.5 border-2 rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-[#C59F60] bg-[#C59F60]/10' 
                    : isDark ? 'border-[#222222] bg-[#161616]' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'card'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="accent-[#C59F60]" 
                    />
                    <div>
                      <span className={`font-extrabold block ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        Tarjeta de Crédito / Débito (Hasta 12 Meses Sin Intereses)
                      </span>
                      <p className="text-[11px] text-neutral-400">Visa, Mastercard, American Express, Apple Pay</p>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#C59F60]" />
                </label>

                {/* PayPal */}
                <label className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'paypal' 
                    ? 'border-[#C59F60] bg-[#C59F60]/10' 
                    : isDark ? 'border-[#222222] bg-[#161616]' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'paypal'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                      className="accent-[#C59F60]" 
                    />
                    <div>
                      <span className={`font-extrabold block ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        PayPal Express Checkout
                      </span>
                      <p className="text-[11px] text-neutral-400">Protección al comprador garantizada</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-blue-500 font-mono text-sm">PayPal</span>
                </label>

                {/* WhatsApp Direct Concierge Payment */}
                <label className={`flex items-center justify-between p-3.5 border rounded-2xl cursor-pointer transition-all ${
                  formData.paymentMethod === 'whatsapp' 
                    ? 'border-[#25D366] bg-[#25D366]/10' 
                    : isDark ? 'border-[#222222] bg-[#161616]' : 'border-neutral-200 bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment" 
                      checked={formData.paymentMethod === 'whatsapp'} 
                      onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                      className="accent-[#25D366]" 
                    />
                    <div>
                      <span className={`font-extrabold block ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        Coordinar con Asesor VIP por WhatsApp
                      </span>
                      <p className="text-[11px] text-neutral-400">Transferencia SPEI, Facturación o Asistencia personalizada</p>
                    </div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </label>
              </div>

              {/* Order Total Box */}
              <div className="bg-[#0A0A0A] text-white p-4 rounded-2xl flex items-center justify-between border border-[#222222]">
                <div>
                  <p className="text-[11px] text-neutral-400 font-mono">Total a Pagar con Envío Express:</p>
                  <p className="text-2xl font-black text-[#C59F60] font-mono">${cartTotal.toLocaleString('es-CO')} COP</p>
                </div>
                <div className="text-right">
                  <span className="bg-[#C59F60] text-[#0A0A0A] text-[10px] font-black px-2.5 py-1 rounded-full uppercase font-mono">
                    D'TAVO EXPRESS 24H
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-neutral-400 hover:text-white"
                >
                  ← Volver a Dirección
                </button>

                <button
                  type="submit"
                  className="btn-gold-primary px-7 py-3.5 rounded-xl text-xs font-black shadow-xl"
                >
                  <span>Confirmar & Procesar Orden</span>
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-[#C59F60]/20 border-2 border-[#C59F60] flex items-center justify-center animate-gold-pulse">
                <TavoIsotype className="w-12 h-12" />
              </div>

              <div className="inline-flex items-center gap-1.5 bg-[#2ECC71]/15 text-[#2ECC71] border border-[#2ECC71]/30 text-xs font-extrabold px-3 py-1 rounded-full font-mono">
                <CheckCircle className="w-4 h-4" />
                <span>¡Pedido Confirmado con Éxito!</span>
              </div>

              <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                ¡Tu orden exclusiva está en camino!
              </h2>

              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Estimado(a) <strong>{formData.name}</strong>, tu orden <strong className="text-[#C59F60] font-mono">#DTAVO-2026-8941</strong> ha sido confirmada y está siendo empaquetada con los más altos estándares de calidad.
              </p>

              <div className={`p-4 rounded-2xl border text-left max-w-md mx-auto text-xs space-y-1.5 font-mono ${
                isDark ? 'bg-[#161616] border-[#222222]' : 'bg-[#FAFAFA] border-[#EAEAEA]'
              }`}>
                <div className="flex justify-between font-bold">
                  <span className="text-neutral-400">Entrega Estimada:</span>
                  <span className="text-[#2ECC71]">Mañana antes de las 18:00 hrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destino:</span>
                  <span className={isDark ? 'text-white' : 'text-black'}>{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Garantía Oficial:</span>
                  <span className="text-[#C59F60] font-bold">12 Meses D'TAVO VIP</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-4 btn-gold-primary px-8 py-3 rounded-xl text-xs font-black"
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
