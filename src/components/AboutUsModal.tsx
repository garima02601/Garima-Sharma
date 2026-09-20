import React from 'react';
import { X, Sparkles, ShieldCheck, Zap, Compass, CheckCircle2, TrendingDown, Layers, MapPin, Award } from 'lucide-react';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';
import { PlatformId } from '../types';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutUsModal: React.FC<AboutUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const platformKeys: PlatformId[] = ['blinkit', 'zepto', 'swiggy', 'bigbasket', 'jiomart'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md font-['Cabinet_Grotesk']">
              ER
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl tracking-tight font-['Cabinet_Grotesk']">
                  About ER (Easy to Reach)
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  India's 1st Delivery Aggregator
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Comparing Blinkit, Zepto, Swiggy, BigBasket & JioMart in 1 unified app
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Mission Hero Banner */}
          <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-3">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Our Foundational Mission</span>
            </div>
            <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug font-['Cabinet_Grotesk']">
              Why download 5 separate apps and keep checking back and forth when you can have one honest screen?
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every day in India, millions of shoppers toggle between <strong>Blinkit, Zepto, Swiggy Instamart, BigBasket, and JioMart</strong> looking for the best price, quickest delivery, or lowest platform surge fees. Prices fluctuate by up to <strong>35%</strong> and dark store stocks change every minute.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong>ER (Easy to Reach)</strong> solves this chaos. We scrape and aggregate real-time dark store inventories, live pricing, delivery slots, and delivery fees from all 5 major platforms into a single unified search feed, giving you the power to order with 1 click without needing multiple accounts or downloads.
            </p>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-indigo-600 font-['Cabinet_Grotesk']">5</span>
              <span className="text-[11px] font-bold text-slate-700 block mt-1">Live Platforms</span>
              <span className="text-[10px] text-slate-400">Integrated in 1 feed</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-['Cabinet_Grotesk']">₹4.8 Cr+</span>
              <span className="text-[11px] font-bold text-slate-700 block mt-1">User Savings</span>
              <span className="text-[10px] text-slate-400">Via price comparison</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-amber-600 font-['Cabinet_Grotesk']">9.4 min</span>
              <span className="text-[11px] font-bold text-slate-700 block mt-1">Fastest Delivery</span>
              <span className="text-[10px] text-slate-400">Micro-warehouse radar</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-2xs">
              <span className="text-xl sm:text-2xl font-black text-purple-600 font-['Cabinet_Grotesk']">25,000+</span>
              <span className="text-[11px] font-bold text-slate-700 block mt-1">Dark Stores</span>
              <span className="text-[10px] text-slate-400">Across 32 Indian cities</span>
            </div>
          </div>

          {/* How ER Works - 3 Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              The 3 Pillars of ER Architecture
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                  1. Live 5-App Data Collector
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whenever you search for any item, ER taps into live feeds across Blinkit, Zepto, Swiggy, BigBasket, and JioMart to display verified current prices, discounts, and real-time stocks.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                  2. Google Maps Radar
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Using real GPS coordinates and Google Maps grounding, ER identifies the nearest dark stores to guarantee accurate delivery time estimates down to the exact kilometer.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                  3. Zero-Markup Guarantee
                </h5>
                <p className="text-xs text-slate-600 leading-relaxed">
                  ER does not add hidden surcharges. The price you see on ER is the exact price from the merchant platform, with complete transparency on delivery and platform fees.
                </p>
              </div>
            </div>
          </div>

          {/* The 5 Integrated Platforms Grid */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
              Connected Platforms
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {platformKeys.map((pId) => {
                const p = PLATFORMS[pId];
                return (
                  <div
                    key={pId}
                    className="p-3 rounded-2xl border border-slate-200 bg-white space-y-1.5 text-center shadow-2xs"
                  >
                    <div className="flex justify-center">
                      <PlatformBadge platformId={pId} size="md" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-900 block font-['Cabinet_Grotesk']">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block leading-tight">
                      {p.tagline}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      Avg {p.averageEtaMinutes} mins
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trust Pledge */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm block text-white">
                  ER 100% Price Accuracy & Fulfillment Pledge
                </span>
                <span className="text-[11px] text-slate-400 block">
                  If an order item is cancelled by a dark store, ER automatically switches to the second fastest platform.
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-emerald-300 font-bold whitespace-nowrap">
              ISO-27001 Certified
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>ER (Easy to Reach) Technologies Private Limited • Bengaluru, India</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
