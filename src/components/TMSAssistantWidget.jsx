import React, { useState } from 'react';
import { X, Sparkles, Bot, ChevronRight, Smartphone, Gamepad2, Camera, BatteryCharging, MessageCircle } from 'lucide-react';
import { TavoIsotype } from './TavoLogo';

export default function TMSAssistantWidget({ theme, isOpen, onClose, onSelectProduct, products }) {
  const [useCase, setUseCase] = useState(null);
  const [budget, setBudget] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  const isDark = theme === 'dark';

  if (!isOpen) return null;

  const handleRecommend = (selectedUseCase, selectedBudget) => {
    let result = products[0];

    if (selectedUseCase === 'gaming') {
      result = products.find(p => p.category === 'gaming') || products[3];
    } else if (selectedUseCase === 'camera') {
      result = products.find(p => p.brand === 'Xiaomi' || p.brand === 'Apple') || products[0];
    } else if (selectedBudget === 'high') {
      result = products.find(p => p.price > 4500000) || products[0];
    } else if (selectedBudget === 'mid') {
      result = products.find(p => p.price <= 4500000) || products[4];
    }

    setRecommendation(result);
  };

  const resetChat = () => {
    setUseCase(null);
    setBudget(null);
    setRecommendation(null);
  };

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-none sm:max-w-sm w-auto sm:w-full rounded-3xl shadow-2xl border-2 border-[#C59F60] overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
      
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#222222]">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <TavoIsotype className="w-7 h-7 sm:w-8 sm:h-8" />
          <div className="text-left">
            <h3 className="text-xs sm:text-sm font-black font-heading flex items-center gap-1">
              <span>Asesor</span>
              <span className="text-[#C59F60]">TAVO</span>
            </h3>
            <p className="text-[9px] sm:text-[10px] text-neutral-400 font-mono">Asesoría de Compra Inteligente</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 bg-[#1A1A1A] hover:bg-[#C59F60] hover:text-black rounded-full flex items-center justify-center text-neutral-400 transition-colors border border-[#2A2A2A]"
          aria-label="Cerrar asistente"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Body */}
      <div className={`p-3.5 sm:p-4 space-y-3 sm:space-y-4 text-xs text-left min-h-[260px] max-h-[360px] sm:min-h-[300px] sm:max-h-[400px] overflow-y-auto transition-colors ${
        isDark ? 'bg-[#111111] text-white' : 'bg-[#F9F9F9] text-[#1A1A1A]'
      }`}>
        
        {/* Welcome Message */}
        <div className="flex gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shrink-0 shadow-sm font-black">
            <Bot className="w-4 h-4" />
          </div>
          <div className={`p-2.5 sm:p-3 rounded-2xl border shadow-sm max-w-[85%] ${
            isDark ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-white border-neutral-200'
          }`}>
            <p className="font-extrabold text-[#C59F60]">¡Hola, soy tu Asesor TAVO!</p>
            <p className="text-neutral-400 mt-0.5 sm:mt-1">
              ¿Cuál es tu prioridad principal para tu nuevo dispositivo?
            </p>
          </div>
        </div>

        {/* Step 1: Use Case */}
        {!useCase && (
          <div className="grid grid-cols-2 gap-2 pt-1 sm:pt-2">
            <button
              onClick={() => setUseCase('camera')}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left font-bold transition-all ${
                isDark 
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                  : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
              }`}
            >
              <Camera className="w-4 h-4 text-[#C59F60] mb-1" />
              <span className="block text-[11px] sm:text-xs">Cámaras Pro</span>
            </button>

            <button
              onClick={() => setUseCase('gaming')}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left font-bold transition-all ${
                isDark 
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                  : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#C59F60] mb-1" />
              <span className="block text-[11px] sm:text-xs">Gaming & Rendimiento</span>
            </button>

            <button
              onClick={() => setUseCase('battery')}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left font-bold transition-all ${
                isDark 
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                  : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
              }`}
            >
              <BatteryCharging className="w-4 h-4 text-[#C59F60] mb-1" />
              <span className="block text-[11px] sm:text-xs">Batería Larga</span>
            </button>

            <button
              onClick={() => setUseCase('flagship')}
              className={`p-2.5 sm:p-3 rounded-2xl border text-left font-bold transition-all ${
                isDark 
                  ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                  : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#C59F60] mb-1" />
              <span className="block text-[11px] sm:text-xs">El Mejor Flagship</span>
            </button>
          </div>
        )}

        {/* Step 2: Budget */}
        {useCase && !budget && (
          <>
            <div className="flex gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className={`p-2.5 sm:p-3 rounded-2xl border text-left ${
                isDark ? 'bg-[#1A1A1A] border-[#2A2A2A]' : 'bg-white border-neutral-200'
              }`}>
                <p className="text-neutral-300">
                  ¿En qué rango de presupuesto te gustaría ubicarte?
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1 sm:pt-2">
              <button
                onClick={() => {
                  setBudget('high');
                  handleRecommend(useCase, 'high');
                }}
                className={`w-full p-2.5 rounded-xl border text-left font-bold font-mono flex justify-between items-center transition-all ${
                  isDark 
                    ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                    : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
                }`}
              >
                <span className="text-[11px] sm:text-xs">Flagship Ultra (&gt; $4.5M COP)</span>
                <ChevronRight className="w-4 h-4 text-[#C59F60]" />
              </button>

              <button
                onClick={() => {
                  setBudget('mid');
                  handleRecommend(useCase, 'mid');
                }}
                className={`w-full p-2.5 rounded-xl border text-left font-bold font-mono flex justify-between items-center transition-all ${
                  isDark 
                    ? 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#C59F60] text-neutral-200' 
                    : 'bg-white border-neutral-200 hover:border-[#C59F60] text-neutral-800'
                }`}
              >
                <span className="text-[11px] sm:text-xs">Gama Alta ($1.5M - $4.4M)</span>
                <ChevronRight className="w-4 h-4 text-[#C59F60]" />
              </button>
            </div>
          </>
        )}

        {/* Step 3: Recommendation Result */}
        {recommendation && (
          <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
            <div className="flex gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#0A0A0A]" />
              </div>
              <div className={`p-2.5 sm:p-3 rounded-2xl border text-left ${
                isDark ? 'bg-[#1A1A1A] border-[#C59F60]/40' : 'bg-white border-[#C59F60]'
              }`}>
                <p className="font-extrabold text-[#C59F60]">¡Tu Selección Exclusiva TAVO!</p>
                <p className="text-neutral-400 mt-0.5">
                  Basado en tu perfil, este es el equipo ideal:
                </p>
              </div>
            </div>

            {/* Recommended Product Box */}
            <div className={`p-2.5 sm:p-3 rounded-2xl border shadow-md flex items-center gap-3 ${
              isDark ? 'bg-[#161616] border-[#222222]' : 'bg-white border-neutral-200'
            }`}>
              <img src={recommendation.image} alt={recommendation.name} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
              <div className="flex-1 text-left min-w-0">
                <p className="text-[9px] sm:text-[10px] font-black text-[#C59F60] uppercase font-mono">{recommendation.brand}</p>
                <h4 className={`text-xs font-black truncate font-heading ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {recommendation.name}
                </h4>
                <p className="text-xs sm:text-sm font-black text-[#C59F60] font-mono">${recommendation.price.toLocaleString('es-CO')} COP</p>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectProduct(recommendation);
                onClose();
              }}
              className="w-full btn-gold-primary py-2.5 rounded-xl text-xs font-black shadow-md"
            >
              Ver Ficha Técnica
            </button>

            <a
              href={`https://wa.me/573142626916?text=Hola%20La%20tienda%20TAVO,%20me%20interesa%20comprar%20el%20${encodeURIComponent(recommendation.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp py-2.5 rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Comprar por WhatsApp</span>
            </a>

            <button
              onClick={resetChat}
              className="w-full text-center text-[11px] text-neutral-500 hover:text-white py-1 font-mono"
            >
              ← Comenzar de nuevo
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
