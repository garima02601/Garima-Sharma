import React, { useState } from 'react';
import { Clock, Star, Zap, Check, AlertCircle, Sparkles, TrendingDown, Bell, Trash2 } from 'lucide-react';
import { Item, PlatformId, PlatformQuote } from '../types';
import { PLATFORMS } from '../data/mockItems';
import { PlatformBadge } from './PlatformBadge';

interface ProductCardProps {
  item: Item;
  onAddToCart: (item: Item, platformId: PlatformId) => void;
  cartPlatformQuantities?: Partial<Record<PlatformId, number>>;
  onSetPriceAlert?: (item: Item) => void;
  onDeleteItem?: (itemId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCart,
  cartPlatformQuantities = {},
  onSetPriceAlert,
  onDeleteItem,
}) => {
  const [selectedTabPlatform, setSelectedTabPlatform] = useState<PlatformId>('blinkit');
  const [showFeeBreakdown, setShowFeeBreakdown] = useState<PlatformId | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const platformOrder: PlatformId[] = ['blinkit', 'zepto', 'swiggy', 'bigbasket', 'jiomart'];

  // Calculate cheapest and fastest quotes
  const validQuotes = Object.values(item.quotes).filter(q => q && q.inStock);
  const minPrice = validQuotes.length > 0 ? Math.min(...validQuotes.map(q => q.price)) : 0;
  const minEta = validQuotes.length > 0 ? Math.min(...validQuotes.map(q => q.etaMinutes)) : 0;
  const maxPrice = validQuotes.length > 0 ? Math.max(...validQuotes.map(q => q.price)) : 0;
  const priceDifference = maxPrice - minPrice;

  return (
    <div
      id={`product-card-${item.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Top Details Section */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 border-b border-slate-100">
        
        {/* Product Image & Badges */}
        <div className="relative w-full sm:w-36 h-36 shrink-0 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center p-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {priceDifference > 0 && (
            <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              Save up to ₹{priceDifference}
            </div>
          )}
        </div>

        {/* Product Meta */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                {item.brand}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-xs font-bold text-amber-900">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{item.rating}</span>
                <span className="text-[10px] text-slate-400 font-normal">({item.reviewCount.toLocaleString()})</span>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug mt-1 line-clamp-2 font-['Cabinet_Grotesk']">
              {item.name}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              Unit / Size: <span className="font-semibold text-slate-700">{item.unit}</span>
            </p>

            <p className="text-xs text-slate-600 mt-1 line-clamp-1">
              {item.description}
            </p>
          </div>

          {/* Quick Summary Strip & Action Buttons */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-slate-500">
                <span>Best Live:</span>
                <span className="font-extrabold text-slate-900">₹{minPrice}</span>
                <span className="text-slate-400 font-normal">to</span>
                <span className="font-semibold text-slate-600">₹{maxPrice}</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 text-emerald-600" />
                <span>Fastest in {minEta} mins</span>
              </div>
            </div>

            {/* Alert & Delete Controls */}
            <div className="flex items-center gap-1.5 ml-auto">
              {onSetPriceAlert && (
                <button
                  type="button"
                  onClick={() => onSetPriceAlert(item)}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200/80 text-[11px] font-bold transition flex items-center gap-1 shadow-2xs"
                  title="Alert me if price drops on Blinkit, Zepto, Swiggy, BigBasket, or JioMart"
                >
                  <Bell className="w-3 h-3 text-amber-600" />
                  <span>Set Alert</span>
                </button>
              )}

              {onDeleteItem && (
                confirmDelete ? (
                  <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200 animate-in fade-in">
                    <span className="text-[10px] font-bold text-red-700 px-1">Delete item?</span>
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="px-1.5 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold hover:bg-red-700 transition"
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-bold hover:bg-slate-300 transition"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition"
                    title="Remove item from aggregator feed"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Platform Comparison Matrix Header */}
      <div className="bg-slate-50/80 px-4 py-2 border-b border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Real-Time Multi-App Price & Delivery Comparison</span>
        <span className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Live Feed
        </span>
      </div>

      {/* Platform Comparison Row / Grid */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-3 bg-slate-50/30 flex-1">
        {platformOrder.map((platformId) => {
          const quote: PlatformQuote | undefined = item.quotes[platformId];
          const config = PLATFORMS[platformId];
          const qtyInCart = cartPlatformQuantities[platformId] || 0;
          const isCheapest = quote?.price === minPrice;
          const isFastest = quote?.etaMinutes === minEta;

          if (!quote) return null;

          return (
            <div
              key={platformId}
              id={`quote-${item.id}-${platformId}`}
              className={`relative rounded-xl p-3 border transition-all flex flex-col justify-between ${
                !quote.inStock
                  ? 'bg-slate-100/60 border-slate-200 opacity-60'
                  : isCheapest
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Special Tag Badges */}
              <div className="flex items-center justify-between gap-1 mb-2">
                <PlatformBadge platformId={platformId} size="sm" />
                {isCheapest && (
                  <span className="bg-emerald-600 text-white text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shadow-xs">
                    Cheapest
                  </span>
                )}
                {!isCheapest && isFastest && (
                  <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5 fill-slate-950" />
                    Fastest
                  </span>
                )}
              </div>

              {/* Price & ETA */}
              <div className="space-y-1.5 my-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 font-['Cabinet_Grotesk']">
                    ₹{quote.price}
                  </span>
                  {quote.originalPrice > quote.price && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{quote.originalPrice}
                    </span>
                  )}
                  {quote.discountPercentage > 0 && (
                    <span className="text-[10px] font-bold text-emerald-700">
                      {quote.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                {/* Delivery Time & Dark Store Info */}
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>{quote.etaMinutes} mins ETA</span>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span>
                    Delivery: {quote.deliveryFee === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `₹${quote.deliveryFee}`}
                  </span>
                  {quote.darkStoreDistanceKm && (
                    <span className="text-[10px] text-slate-400">
                      {quote.darkStoreDistanceKm}km away
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button: Add from this platform */}
              <div className="mt-3 pt-2 border-t border-slate-100">
                {quote.inStock ? (
                  <button
                    id={`add-btn-${item.id}-${platformId}`}
                    onClick={() => onAddToCart(item, platformId)}
                    className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      qtyInCart > 0
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        : isCheapest
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {qtyInCart > 0 ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added ({qtyInCart})</span>
                      </>
                    ) : (
                      <>
                        <span>Add from {config.name.split(' ')[0]}</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="w-full py-1.5 text-center text-xs font-semibold text-slate-400 bg-slate-100 rounded-lg flex items-center justify-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Out of stock</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
