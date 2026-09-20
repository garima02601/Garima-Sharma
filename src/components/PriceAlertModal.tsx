import React, { useState } from 'react';
import { X, Bell, Plus, Trash2, CheckCircle2, AlertTriangle, Sparkles, TrendingDown, Clock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PriceAlert, PlatformId, Item } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: PriceAlert[];
  onAddAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt' | 'isActive'>) => void;
  onDeleteAlert: (id: string) => void;
  onToggleAlert: (id: string) => void;
  onSimulatePriceDrop: (alertId: string) => void;
  initialItemForAlert?: Item | null;
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({
  isOpen,
  onClose,
  alerts,
  onAddAlert,
  onDeleteAlert,
  onToggleAlert,
  onSimulatePriceDrop,
  initialItemForAlert,
}) => {
  const [productName, setProductName] = useState(initialItemForAlert?.name || '');
  const [targetPrice, setTargetPrice] = useState(
    initialItemForAlert
      ? Math.round(Math.min(...Object.values(initialItemForAlert.quotes).map((q) => q.price)) * 0.9)
      : 100
  );
  const [preferredPlatform, setPreferredPlatform] = useState<PlatformId | 'any'>('any');
  const [notifyEmail, setNotifyEmail] = useState('');
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Sync if initial item changes
  React.useEffect(() => {
    if (initialItemForAlert) {
      setProductName(initialItemForAlert.name);
      const minP = Math.min(...Object.values(initialItemForAlert.quotes).map((q) => q.price));
      setTargetPrice(Math.round(minP * 0.9));
    }
  }, [initialItemForAlert]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || targetPrice <= 0) return;

    let currentCheapest = targetPrice + 20;
    if (initialItemForAlert) {
      currentCheapest = Math.min(...Object.values(initialItemForAlert.quotes).map((q) => q.price));
    }

    onAddAlert({
      productName: productName.trim(),
      targetPrice: Number(targetPrice),
      currentCheapestPrice: currentCheapest,
      preferredPlatform,
      notifyEmail: notifyEmail.trim() || undefined,
      itemId: initialItemForAlert?.id,
    });

    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 2500);

    if (!initialItemForAlert) {
      setProductName('');
      setTargetPrice(100);
    }
  };

  const presetAlerts = [
    { name: 'Amul Taaza Milk 500ml', current: 28, target: 25 },
    { name: 'Coca-Cola Zero Sugar Can', current: 40, target: 35 },
    { name: 'PS5 DualSense Controller', current: 5490, target: 4999 },
    { name: 'Maggi 2-Minute Noodles 280g', current: 52, target: 45 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center text-white shadow-xs">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight font-['Cabinet_Grotesk']">
                  Real-Time Price Drop Alerts
                </h3>
                <span className="text-[10px] bg-white/20 text-white font-mono px-2 py-0.5 rounded-full border border-white/30">
                  {alerts.length} Active
                </span>
              </div>
              <p className="text-xs text-amber-100">
                Monitors Blinkit, Zepto, Swiggy, BigBasket & JioMart for flash price drops
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-amber-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Success Banner */}
          {isSuccessToast && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Price alert saved! We will notify you the second any of the 5 apps hits your price.</span>
            </div>
          )}

          {/* Form: Create New Alert */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-amber-600" />
                <span>Create New Price Alert</span>
              </h4>
              <span className="text-[11px] text-slate-500 font-medium">Free 24/7 dark store scraping</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Product Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Product / Item Name *
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Amul Salted Butter 500g, PS5 Controller, Cold Drinks..."
                    required
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Target Price */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Target Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min="1"
                      value={targetPrice}
                      onChange={(e) => setTargetPrice(Number(e.target.value))}
                      required
                      className="w-full pl-7 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-bold"
                    />
                  </div>
                </div>

                {/* Platform Preference */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Monitor Platform
                  </label>
                  <select
                    value={preferredPlatform}
                    onChange={(e) => setPreferredPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-bold"
                  >
                    <option value="any">Any of the 5 Platforms (Best Deal)</option>
                    <option value="blinkit">Blinkit Only (10m)</option>
                    <option value="zepto">Zepto Only (10m)</option>
                    <option value="swiggy">Swiggy Instamart Only</option>
                    <option value="bigbasket">BigBasket BB Now Only</option>
                    <option value="jiomart">JioMart Only</option>
                  </select>
                </div>

                {/* Notification Email (Optional) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Alert In-App + Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="your-email@example.com (also triggers in-app banner)"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  No spam. Only price drops under your target price.
                </span>

                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Set Price Alert</span>
                </button>
              </div>
            </form>

            {/* Quick Popular Presets */}
            <div className="pt-2 border-t border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Popular Quick Watchlist Items
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presetAlerts.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setProductName(preset.name);
                      setTargetPrice(preset.target);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 text-slate-700 font-semibold transition"
                  >
                    {preset.name} (₹{preset.target})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Price Alerts List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                Your Monitored Items ({alerts.length})
              </h4>
              <span className="text-[11px] text-slate-400">
                Auto-refreshed every 5 mins
              </span>
            </div>

            {alerts.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
                  <Bell className="w-5 h-5" />
                </div>
                <p className="font-bold text-slate-700 text-xs sm:text-sm">No active price alerts yet</p>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  Set target prices on any grocery, tech item, or gaming accessory to be notified when Blinkit, Zepto, Swiggy, BigBasket, or JioMart drops prices!
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3.5 rounded-xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      alert.triggered
                        ? 'bg-emerald-50/60 border-emerald-300'
                        : alert.isActive
                        ? 'bg-white border-slate-200 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 line-clamp-1">
                          {alert.productName}
                        </span>
                        {alert.preferredPlatform !== 'any' ? (
                          <PlatformBadge platformId={alert.preferredPlatform} size="sm" />
                        ) : (
                          <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded border border-indigo-200">
                            All 5 Apps
                          </span>
                        )}
                        {alert.triggered && (
                          <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.5 rounded animate-pulse">
                            PRICE DROP!
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span>
                          Target: <strong className="text-emerald-700">₹{alert.targetPrice}</strong>
                        </span>
                        <span>•</span>
                        <span>
                          Current Live: <strong className="text-slate-800">₹{alert.currentCheapestPrice}</strong>
                        </span>
                        <span>•</span>
                        <span className="text-[10px] text-slate-400">
                          Set {alert.createdAt}
                        </span>
                      </div>

                      {alert.triggered && alert.triggeredPrice && (
                        <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1 mt-1">
                          <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Dropped to ₹{alert.triggeredPrice} on {alert.triggeredPlatform?.toUpperCase()}!</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* Test trigger simulation button */}
                      <button
                        type="button"
                        onClick={() => onSimulatePriceDrop(alert.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold transition flex items-center gap-1 shadow-2xs"
                        title="Simulate a price drop event to test the in-app alert"
                      >
                        <Zap className="w-3 h-3 text-amber-600" />
                        <span>Test Drop</span>
                      </button>

                      {/* Toggle active button */}
                      <button
                        type="button"
                        onClick={() => onToggleAlert(alert.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition ${
                          alert.isActive
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {alert.isActive ? 'Pause' : 'Resume'}
                      </button>

                      {/* Delete alert */}
                      <button
                        type="button"
                        onClick={() => onDeleteAlert(alert.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Push notifications enabled via ER Background Price Watcher</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
