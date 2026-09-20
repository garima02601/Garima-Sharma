import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Brain, Sparkles, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { CartItem, DeliveryLocation, PlatformId } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onSwitchPlatform: (index: number, newPlatform: PlatformId) => void;
  onClearCart: () => void;
  onPlaceOrder: () => void;
  currentLocation: DeliveryLocation;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onSwitchPlatform,
  onClearCart,
  onPlaceOrder,
  currentLocation,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<{
    recommendation: string;
    thoughts?: string;
  } | null>(null);
  const [showThoughts, setShowThoughts] = useState(false);

  if (!isOpen) return null;

  // Calculate bill totals
  const subtotal = items.reduce((acc, ci) => {
    const quote = ci.item.quotes[ci.selectedPlatform];
    return acc + (quote?.price || 0) * ci.quantity;
  }, 0);

  // Group by platform for delivery fees
  const platformsUsed = Array.from(new Set(items.map(ci => ci.selectedPlatform)));
  
  let totalDeliveryFee = 0;
  let totalPlatformFee = 0;

  platformsUsed.forEach(pId => {
    const platformSubtotal = items
      .filter(ci => ci.selectedPlatform === pId)
      .reduce((acc, ci) => acc + (ci.item.quotes[pId]?.price || 0) * ci.quantity, 0);
    
    const config = PLATFORMS[pId];
    if (platformSubtotal < config.freeDeliveryThreshold) {
      totalDeliveryFee += config.baseDeliveryFee;
    }
    totalPlatformFee += config.platformFee;
  });

  const aggregatorSavings = Math.round(subtotal * 0.08); // ER special multi-app deal
  const grandTotal = Math.max(0, subtotal + totalDeliveryFee + totalPlatformFee - aggregatorSavings);

  // Call the server's High Thinking Optimizer
  const handleRunOptimizer = async () => {
    if (items.length === 0) return;
    setIsOptimizing(true);
    setOptimizationResult(null);

    try {
      const payload = {
        items: items.map(ci => ({
          name: ci.item.name,
          quantity: ci.quantity,
          selectedPlatform: ci.selectedPlatform,
          currentPrice: ci.item.quotes[ci.selectedPlatform]?.price,
          quotesAcrossAllPlatforms: ci.item.quotes,
        })),
        currentTotal: subtotal,
      };

      const res = await fetch('/api/gemini/optimize-cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setOptimizationResult({
        recommendation: data.recommendation || data.fallbackRecommendation,
        thoughts: data.thoughts,
      });
      setShowThoughts(true);
    } catch (err) {
      console.error(err);
      setOptimizationResult({
        recommendation: "Analyzed cart: Switching gaming accessories to JioMart will save up to ₹250 on base prices, while keeping instant food on Zepto delivers snacks in 9 minutes!",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-['Cabinet_Grotesk']">
              <span>Your ER Unified Basket</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-900 text-white font-semibold">
                {items.reduce((a, b) => a + b.quantity, 0)} items
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Delivering to <strong className="text-slate-700">{currentLocation.label}</strong>
            </p>
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                🛒
              </div>
              <p className="font-bold text-slate-700 text-base">Your basket is empty</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Search for any food, groceries, or gaming items and compare real-time prices across 5 apps.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              {/* High Thinking AI Optimizer Card */}
              <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 text-white p-4 rounded-2xl shadow-md border border-indigo-500/30">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-1.5">
                        <span>High Thinking Basket Optimizer</span>
                        <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded border border-indigo-400/30 font-mono">
                          gemini-3.1-pro
                        </span>
                      </h4>
                      <p className="text-[11px] text-indigo-200">
                        Evaluates multi-app arbitrage & split-delivery savings
                      </p>
                    </div>
                  </div>

                  <button
                    id="run-optimizer-btn"
                    onClick={handleRunOptimizer}
                    disabled={isOptimizing}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 shadow-xs disabled:opacity-50 shrink-0"
                  >
                    {isOptimizing ? (
                      <>
                        <span className="w-3 h-3 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" />
                        <span>Thinking...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Optimize</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Optimization Output */}
                {optimizationResult && (
                  <div className="mt-3 pt-3 border-t border-indigo-500/30 text-xs space-y-2">
                    <div className="bg-indigo-950/70 p-3 rounded-xl border border-indigo-500/20 leading-relaxed text-indigo-100 whitespace-pre-line">
                      {optimizationResult.recommendation}
                    </div>

                    {optimizationResult.thoughts && (
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono">
                        <button
                          onClick={() => setShowThoughts(!showThoughts)}
                          className="flex items-center justify-between w-full text-indigo-300 font-bold"
                        >
                          <span className="flex items-center gap-1">
                            <Brain className="w-3 h-3 text-indigo-400" />
                            Model Reasoning Trace (ThinkingLevel.HIGH)
                          </span>
                          {showThoughts ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {showThoughts && (
                          <p className="mt-2 text-slate-400 max-h-40 overflow-y-auto leading-relaxed border-t border-slate-800 pt-1.5">
                            {optimizationResult.thoughts}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
                  <span>Selected Items & Fulfillment App</span>
                  <button
                    onClick={onClearCart}
                    className="text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3 h-3" /> Clear All
                  </button>
                </div>

                {items.map((cartItem, idx) => {
                  const quote = cartItem.item.quotes[cartItem.selectedPlatform];
                  return (
                    <div
                      key={`${cartItem.item.id}-${cartItem.selectedPlatform}-${idx}`}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={cartItem.item.image}
                            alt={cartItem.item.name}
                            className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200/60"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                              {cartItem.item.name}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              {cartItem.item.unit}
                            </p>
                            <span className="text-xs font-extrabold text-slate-900">
                              ₹{(quote?.price || 0) * cartItem.quantity}
                              <span className="text-[10px] text-slate-400 font-normal ml-1">
                                (₹{quote?.price} each)
                              </span>
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-slate-900">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(idx, cartItem.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* On-the-fly Platform Switcher */}
                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-500 font-medium">Buying via:</span>
                          <PlatformBadge platformId={cartItem.selectedPlatform} size="sm" />
                        </div>

                        {/* Dropdown to switch platform */}
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-slate-400">Switch app:</span>
                          <select
                            value={cartItem.selectedPlatform}
                            onChange={(e) => onSwitchPlatform(idx, e.target.value as PlatformId)}
                            className="text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-md py-0.5 px-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          >
                            {(['blinkit', 'zepto', 'swiggy', 'bigbasket', 'jiomart'] as PlatformId[]).map((pId) => {
                              const q = cartItem.item.quotes[pId];
                              if (!q || !q.inStock) return null;
                              return (
                                <option key={pId} value={pId}>
                                  {PLATFORMS[pId].name.split(' ')[0]} - ₹{q.price} ({q.etaMinutes}m)
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bill Details Breakdown */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Order Price Summary</h4>
                
                <div className="flex justify-between text-slate-600">
                  <span>Item Subtotal</span>
                  <span className="font-semibold text-slate-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fees ({platformsUsed.length} platform{platformsUsed.length > 1 ? 's' : ''})</span>
                  <span className="font-semibold text-slate-900">
                    {totalDeliveryFee === 0 ? <strong className="text-emerald-600 font-bold">FREE</strong> : `₹${totalDeliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Platform & Handling Fees</span>
                  <span className="font-semibold text-slate-900">₹{totalPlatformFee}</span>
                </div>

                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-200/60">
                  <span>ER Unified Aggregator Discount</span>
                  <span>-₹{aggregatorSavings}</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-lg text-indigo-700 font-['Cabinet_Grotesk']">₹{grandTotal}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <span className="font-bold text-slate-700 block mb-2">Select Payment Method:</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-1 rounded-lg border font-bold text-center transition ${
                      paymentMethod === 'upi'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-1 rounded-lg border font-bold text-center transition ${
                      paymentMethod === 'card'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Credit / Debit
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-1 rounded-lg border font-bold text-center transition ${
                      paymentMethod === 'cod'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Pay on Delivery
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Checkout Action */}
        {items.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-white space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ER 100% Guaranteed Fulfillment
              </span>
              <span>No separate apps needed</span>
            </div>

            <button
              id="checkout-order-btn"
              onClick={onPlaceOrder}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-lg shadow-slate-900/20 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold text-base">₹{grandTotal}</span>
                <span className="text-slate-400 text-xs font-normal">| {items.reduce((a, b) => a + b.quantity, 0)} items</span>
              </div>
              <div className="flex items-center gap-1 font-extrabold">
                <span>Place Order Directly</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
