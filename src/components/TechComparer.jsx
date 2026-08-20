import React from 'react';
import { X, Trash2, ShoppingCart, Crown } from 'lucide-react';

export default function TechComparer({ theme, comparedProducts, onClose, onRemoveFromCompare, onAddToCart }) {
  const isDark = theme === 'dark';

  if (!comparedProducts || comparedProducts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border relative p-6 transition-all ${
        isDark ? 'bg-[#111111] border-[#222222] text-white' : 'bg-white border-[#DDDDDD] text-[#1A1A1A]'
      }`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between pb-4 border-b ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C59F60] text-[#0A0A0A] flex items-center justify-center shadow-md shadow-[#C59F60]/20 font-black">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-2xl font-black font-heading flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                <span>Comparador de Especificaciones</span>
                <span className="text-[#C59F60]">D'TAVO</span>
              </h2>
              <p className="text-xs text-neutral-400 font-medium">
                Análisis técnico frente a frente de la colección insignia.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-[#1A1A1A] text-neutral-400 hover:text-white hover:bg-[#C59F60] hover:text-black' : 'bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200'
            }`}
            aria-label="Cerrar comparador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className={`p-3 font-black text-xs uppercase w-48 font-mono ${
                  isDark ? 'bg-[#161616] text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  Ficha Técnica
                </th>
                {comparedProducts.map((prod) => (
                  <th key={prod.id} className={`p-4 border-l min-w-[220px] ${
                    isDark ? 'bg-[#161616] border-[#222222]' : 'bg-neutral-50 border-[#EAEAEA]'
                  }`}>
                    <div className="relative text-center">
                      <button
                        onClick={() => onRemoveFromCompare(prod.id)}
                        className={`absolute -top-2 -right-2 p-1.5 rounded-full shadow-sm transition-colors ${
                          isDark ? 'bg-[#222222] text-neutral-400 hover:text-[#E74C3C]' : 'bg-white text-neutral-500 hover:text-[#E74C3C]'
                        }`}
                        title="Quitar de la comparación"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <img src={prod.image} alt={prod.name} className="h-24 mx-auto object-contain mb-2" />
                      <p className="text-[11px] font-black text-[#C59F60] uppercase font-mono">{prod.brand}</p>
                      <h4 className={`text-sm font-extrabold font-heading leading-tight ${isDark ? 'text-white' : 'text-[#1A1A1A]'}`}>
                        {prod.name}
                      </h4>
                      <p className="text-base font-black text-[#C59F60] font-mono mt-1">${prod.price.toLocaleString('es-CO')} COP</p>
                      
                      <button
                        onClick={() => onAddToCart(prod)}
                        className="mt-3 w-full btn-gold-primary py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Añadir</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={`divide-y text-xs font-mono ${isDark ? 'divide-[#222222]' : 'divide-[#EAEAEA]'}`}>
              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Pantalla</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l ${isDark ? 'border-[#222222] text-neutral-200' : 'border-[#EAEAEA] text-neutral-800'}`}>
                    {p.specs.screen}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Procesador</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l ${isDark ? 'border-[#222222] text-neutral-200' : 'border-[#EAEAEA] text-neutral-800'}`}>
                    {p.specs.processor}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Sistema de Cámaras</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l ${isDark ? 'border-[#222222] text-neutral-200' : 'border-[#EAEAEA] text-neutral-800'}`}>
                    {p.specs.camera}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Batería & Carga</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l ${isDark ? 'border-[#222222] text-neutral-200' : 'border-[#EAEAEA] text-neutral-800'}`}>
                    {p.specs.battery}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Memoria RAM</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l font-bold text-[#C59F60] ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
                    {p.specs.ram}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Sistema Operativo</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l ${isDark ? 'border-[#222222] text-neutral-200' : 'border-[#EAEAEA] text-neutral-800'}`}>
                    {p.specs.os}
                  </td>
                ))}
              </tr>

              <tr>
                <td className={`p-3 font-bold ${isDark ? 'bg-[#141414] text-neutral-400' : 'bg-neutral-50 text-neutral-600'}`}>Calificación de Clientes</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className={`p-3 border-l font-bold text-amber-400 ${isDark ? 'border-[#222222]' : 'border-[#EAEAEA]'}`}>
                    ★ {p.rating} / 5.0 ({p.reviewsCount} reseñas)
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
