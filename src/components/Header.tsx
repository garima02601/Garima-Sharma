import React from 'react';
import { MapPin, ShoppingBag, Sparkles, Navigation, Layers, ShieldCheck, Bell, Info, Headphones, Star } from 'lucide-react';
import { DeliveryLocation } from '../types';

interface HeaderProps {
  currentLocation: DeliveryLocation;
  onOpenLocationModal: () => void;
  onOpenMapsGrounding: () => void;
  onOpenChatbot: () => void;
  onOpenCart: () => void;
  cartCount: number;
  cartTotal: number;
  onOpenPriceAlerts?: () => void;
  alertCount?: number;
  onOpenContacts?: () => void;
  onOpenAboutUs?: () => void;
  onOpenReviews?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onOpenLocationModal,
  onOpenMapsGrounding,
  onOpenChatbot,
  onOpenCart,
  cartCount,
  cartTotal,
  onOpenPriceAlerts,
  alertCount = 0,
  onOpenContacts,
  onOpenAboutUs,
  onOpenReviews,
}) => {
  return (
    <header id="er-main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-emerald-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-indigo-600/20 tracking-wider font-['Cabinet_Grotesk']">
                ER
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 font-['Cabinet_Grotesk']">
                    Easy to Reach
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Aggregator
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Blinkit • Zepto • Swiggy • BigBasket • JioMart
                </span>
              </div>
            </div>
          </div>

          {/* Location Selector & Radar Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 max-w-xs sm:max-w-md truncate">
            <button
              id="header-location-btn"
              onClick={onOpenLocationModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition border border-slate-200/60 text-left truncate"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate max-w-[100px] sm:max-w-[170px]">
                {currentLocation.label}
              </span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">▼</span>
            </button>

            {/* Google Maps Hubs Radar Button */}
            <button
              id="header-maps-radar-btn"
              onClick={onOpenMapsGrounding}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition border border-emerald-200"
              title="View Nearby Dark Stores & Google Maps Grounding"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dark Stores</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </button>
          </div>

          {/* Quick Nav Links: Price Alert, Reviews, About Us, Contacts */}
          <nav className="hidden md:flex items-center gap-1">
            {onOpenPriceAlerts && (
              <button
                type="button"
                onClick={onOpenPriceAlerts}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-amber-700 hover:bg-amber-50/70 transition relative"
                title="Manage Price Alerts"
              >
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                <span>Alerts</span>
                {alertCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {alertCount}
                  </span>
                )}
              </button>
            )}

            {onOpenReviews && (
              <button
                type="button"
                onClick={onOpenReviews}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/70 transition"
                title="Reviews & Feedback"
              >
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Reviews</span>
              </button>
            )}

            {onOpenAboutUs && (
              <button
                type="button"
                onClick={onOpenAboutUs}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/70 transition"
                title="About ER & 5-App Aggregator"
              >
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                <span>About</span>
              </button>
            )}

            {onOpenContacts && (
              <button
                type="button"
                onClick={onOpenContacts}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-purple-700 hover:bg-purple-50/70 transition"
                title="24/7 Helpline & Platform Contacts"
              >
                <Headphones className="w-3.5 h-3.5 text-purple-600" />
                <span>Contacts</span>
              </button>
            )}
          </nav>

          {/* Actions: AI Concierge & Unified Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Mobile Price Alert Icon */}
            {onOpenPriceAlerts && (
              <button
                type="button"
                onClick={onOpenPriceAlerts}
                className="md:hidden p-2 rounded-xl text-amber-700 hover:bg-amber-50 relative border border-amber-200/80"
                title="Price Alerts"
              >
                <Bell className="w-4 h-4" />
                {alertCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {alertCount}
                  </span>
                )}
              </button>
            )}

            {/* Gemini Chatbot Trigger */}
            <button
              id="header-ai-concierge-btn"
              onClick={onOpenChatbot}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 text-xs sm:text-sm font-bold border border-indigo-200/80 shadow-xs transition"
            >
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
              <span className="hidden sm:inline">AI Concierge</span>
              <span className="sm:hidden text-xs">AI</span>
            </button>

            {/* Unified Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md shadow-slate-900/10 transition"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Basket</span>
              {cartCount > 0 ? (
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-extrabold flex items-center justify-center">
                    {cartCount}
                  </span>
                  <span className="text-emerald-300 font-bold hidden md:inline">
                    ₹{cartTotal}
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-xs hidden sm:inline">0</span>
              )}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
