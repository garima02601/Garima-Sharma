import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingDown,
  Layers,
  HelpCircle,
  RefreshCw,
  PlusCircle,
  ArrowUpDown,
  Clock,
  Bell,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
  Headphones,
  Star,
  ExternalLink,
  ChevronRight,
  Database
} from 'lucide-react';
import { Item, CartItem, DeliveryLocation, PlatformId, OrderRecord, PriceAlert, ReviewItem, ContactMessage } from './types';
import { INITIAL_ITEMS, PLATFORMS, PRESET_LOCATIONS } from './data/mockItems';
import { INITIAL_PRICE_ALERTS, INITIAL_REVIEWS } from './data/initialData';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { MapsGroundingDrawer } from './components/MapsGroundingDrawer';
import { LocationModal } from './components/LocationModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { PlatformBadge } from './components/PlatformBadge';
import { PriceAlertModal } from './components/PriceAlertModal';
import { ContactsModal } from './components/ContactsModal';
import { AboutUsModal } from './components/AboutUsModal';
import { ReviewsFeedbackModal } from './components/ReviewsFeedbackModal';

export default function App() {
  // -------------------------------------------------------------
  // Items & Aggregator State
  // -------------------------------------------------------------
  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem('er_aggregator_items');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_ITEMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('er_aggregator_items', JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'cheapest' | 'fastest' | 'discount'>('recommended');
  const [platformFilter, setPlatformFilter] = useState<PlatformId | 'all'>('all');

  // -------------------------------------------------------------
  // Dynamic 5-App Scraping / Collecting State
  // -------------------------------------------------------------
  const [isCollectingData, setIsCollectingData] = useState(false);
  const [collectorStatus, setCollectorStatus] = useState<string | null>(null);
  const [collectionSuccessMsg, setCollectionSuccessMsg] = useState<string | null>(null);
  const [lastDeletedItem, setLastDeletedItem] = useState<Item | null>(null);
  const [deleteNotification, setDeleteNotification] = useState<string | null>(null);

  // -------------------------------------------------------------
  // Price Alerts State
  // -------------------------------------------------------------
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    try {
      const saved = localStorage.getItem('er_price_alerts');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_PRICE_ALERTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('er_price_alerts', JSON.stringify(priceAlerts));
    } catch (e) {
      // ignore
    }
  }, [priceAlerts]);

  const [isPriceAlertModalOpen, setIsPriceAlertModalOpen] = useState(false);
  const [selectedItemForAlert, setSelectedItemForAlert] = useState<Item | null>(null);
  const [priceDropToast, setPriceDropToast] = useState<{
    message: string;
    productName: string;
    platform: PlatformId;
    newPrice: number;
    savings: number;
  } | null>(null);

  // -------------------------------------------------------------
  // Reviews & Feedback State
  // -------------------------------------------------------------
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('er_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('er_reviews', JSON.stringify(reviews));
    } catch (e) {
      // ignore
    }
  }, [reviews]);

  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // -------------------------------------------------------------
  // About Us & Contacts Modals State
  // -------------------------------------------------------------
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // -------------------------------------------------------------
  // Location & Cart & Order State
  // -------------------------------------------------------------
  const [currentLocation, setCurrentLocation] = useState<DeliveryLocation>(PRESET_LOCATIONS[0]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isMapsGroundingOpen, setIsMapsGroundingOpen] = useState(false);

  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);

  // -------------------------------------------------------------
  // Cart Actions
  // -------------------------------------------------------------
  const handleAddToCart = (item: Item, platformId: PlatformId) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.selectedPlatform === platformId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { item, selectedPlatform: platformId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((_, i) => i !== index));
    } else {
      setCartItems((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleSwitchPlatform = (index: number, newPlatform: PlatformId) => {
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].selectedPlatform = newPlatform;
      return updated;
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((acc, ci) => {
      const q = ci.item.quotes[ci.selectedPlatform];
      return acc + (q?.price || 0) * ci.quantity;
    }, 0);

    const discount = Math.round(subtotal * 0.08);
    const total = Math.max(0, subtotal + 35 - discount);

    const newOrder: OrderRecord = {
      id: `ER-${Math.floor(1000 + Math.random() * 9000)}-DEL`,
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      deliveryAddress: currentLocation,
      subtotal,
      deliveryFees: 25,
      platformFees: 10,
      taxes: 0,
      discount,
      total,
      status: 'placed',
      estimatedArrival: '9-12 mins',
      activePlatform: cartItems[0]?.selectedPlatform || 'zepto',
      riderName: 'Ramesh Kumar',
      riderPhone: '+91 98765 43210',
      progressPercent: 15,
    };

    setActiveOrder(newOrder);
    setCartItems([]);
    setIsCartOpen(false);
  };

  // -------------------------------------------------------------
  // Dynamic 5-App Data Collector on Search
  // -------------------------------------------------------------
  const handleCollect5Apps = async (queryToSearch?: string) => {
    const query = (queryToSearch !== undefined ? queryToSearch : searchQuery).trim();
    if (!query || isCollectingData) return;

    setIsCollectingData(true);
    setCollectorStatus(`Scanning live feeds across Blinkit, Zepto, Swiggy, BigBasket & JioMart for "${query}"...`);

    try {
      const res = await fetch('/api/delivery/collect-5-apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          locationName: `${currentLocation.label}, ${currentLocation.city}`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems((prev) => {
            const incomingIds = new Set(data.items.map((it: Item) => it.id));
            return [...data.items, ...prev.filter((it) => !incomingIds.has(it.id))];
          });
          setSelectedCategory('all');
          setCollectionSuccessMsg(`Scraped & collected ${data.items.length} live items across all 5 delivery platforms!`);
          setTimeout(() => setCollectionSuccessMsg(null), 4500);
        }
      }
    } catch (err) {
      console.error('Collect 5 apps error:', err);
    } finally {
      setIsCollectingData(false);
      setCollectorStatus(null);
    }
  };

  // -------------------------------------------------------------
  // Delete from Aggregator Handlers
  // -------------------------------------------------------------
  const handleDeleteItem = (itemId: string) => {
    const found = items.find((i) => i.id === itemId);
    if (!found) return;
    setLastDeletedItem(found);
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setDeleteNotification(`"${found.name}" removed from aggregator comparison.`);
    setTimeout(() => setDeleteNotification(null), 5000);
  };

  const handleUndoDelete = () => {
    if (lastDeletedItem) {
      setItems((prev) => [lastDeletedItem, ...prev]);
      setLastDeletedItem(null);
      setDeleteNotification(null);
    }
  };

  const handleResetAggregatorFeed = () => {
    setItems(INITIAL_ITEMS);
    setDeleteNotification('Aggregator feed reset to default 5-app catalog.');
    setTimeout(() => setDeleteNotification(null), 3500);
  };

  const handleClearAllAggregatorItems = () => {
    setItems([]);
    setDeleteNotification('All items cleared from aggregator feed. Search above to scrape live items.');
    setTimeout(() => setDeleteNotification(null), 4500);
  };

  // -------------------------------------------------------------
  // Price Alerts Handlers
  // -------------------------------------------------------------
  const handleOpenPriceAlertForProduct = (item: Item) => {
    setSelectedItemForAlert(item);
    setIsPriceAlertModalOpen(true);
  };

  const handleAddPriceAlert = (newAlertData: Omit<PriceAlert, 'id' | 'createdAt' | 'isActive'>) => {
    const newAlert: PriceAlert = {
      ...newAlertData,
      id: `alert-${Date.now()}`,
      createdAt: 'Just now',
      isActive: true,
      triggered: false,
    };
    setPriceAlerts((prev) => [newAlert, ...prev]);
  };

  const handleDeletePriceAlert = (id: string) => {
    setPriceAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleTogglePriceAlert = (id: string) => {
    setPriceAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a))
    );
  };

  const handleSimulatePriceDrop = (alertId: string) => {
    const targetAlert = priceAlerts.find((a) => a.id === alertId);
    if (!targetAlert) return;

    const platforms: PlatformId[] = ['blinkit', 'zepto', 'swiggy', 'bigbasket', 'jiomart'];
    const selectedPlatform: PlatformId =
      targetAlert.preferredPlatform !== 'any' ? targetAlert.preferredPlatform : platforms[Math.floor(Math.random() * platforms.length)];

    const droppedPrice = Math.max(10, Math.round(targetAlert.targetPrice * 0.92));
    const savings = targetAlert.currentCheapestPrice - droppedPrice;

    setPriceAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? {
              ...a,
              triggered: true,
              triggeredAt: 'Just now',
              triggeredPlatform: selectedPlatform,
              triggeredPrice: droppedPrice,
            }
          : a
      )
    );

    setPriceDropToast({
      message: `Flash Price Drop! ${targetAlert.productName} dropped to ₹${droppedPrice} on ${selectedPlatform.toUpperCase()}!`,
      productName: targetAlert.productName,
      platform: selectedPlatform,
      newPrice: droppedPrice,
      savings,
    });

    setTimeout(() => {
      setPriceDropToast(null);
    }, 7000);
  };

  // -------------------------------------------------------------
  // Reviews & Feedback Handlers
  // -------------------------------------------------------------
  const handleAddReview = (newRevData: Omit<ReviewItem, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: ReviewItem = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 0,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleHelpfulVote = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  // -------------------------------------------------------------
  // Filtered & Sorted items
  // -------------------------------------------------------------
  const filteredItems = useMemo(() => {
    return items
      .filter((it) => {
        const matchesQuery =
          it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          it.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === 'all' ||
          (selectedCategory === 'gaming' && it.category === 'gaming') ||
          (selectedCategory === 'groceries' && (it.category === 'groceries' || it.category === 'daily_essentials')) ||
          (selectedCategory === 'munchies' && (it.category === 'food_munchies' || it.category === 'beverages'));

        const matchesPlatform =
          platformFilter === 'all' || (it.quotes[platformFilter] && it.quotes[platformFilter].inStock);

        return matchesQuery && matchesCategory && matchesPlatform;
      })
      .sort((a, b) => {
        const aMinPrice = Math.min(...Object.values(a.quotes).map((q) => q.price));
        const bMinPrice = Math.min(...Object.values(b.quotes).map((q) => q.price));

        const aMinEta = Math.min(...Object.values(a.quotes).map((q) => q.etaMinutes));
        const bMinEta = Math.min(...Object.values(b.quotes).map((q) => q.etaMinutes));

        if (sortBy === 'cheapest') return aMinPrice - bMinPrice;
        if (sortBy === 'fastest') return aMinEta - bMinEta;
        if (sortBy === 'discount') return b.rating - a.rating;
        return 0; // recommended
      });
  }, [items, searchQuery, selectedCategory, sortBy, platformFilter]);

  // Cart helper calculations
  const cartPlatformQuantities = useMemo(() => {
    const counts: Partial<Record<PlatformId, number>> = {};
    cartItems.forEach((ci) => {
      counts[ci.selectedPlatform] = (counts[ci.selectedPlatform] || 0) + ci.quantity;
    });
    return counts;
  }, [cartItems]);

  const cartTotal = cartItems.reduce((acc, ci) => {
    const q = ci.item.quotes[ci.selectedPlatform];
    return acc + (q?.price || 0) * ci.quantity;
  }, 0);

  const popularSearches = [
    'Amul Milk',
    'Coca Cola Zero',
    'PS5 Controller',
    'Maggi Noodles',
    'Lays Chips',
    'Logitech Mouse',
    'Avocado Fresh',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 selection:bg-indigo-500 selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* 1. Sticky Notification Banners (Price Drop & Deletions) */}
      {priceDropToast && (
        <div className="sticky top-16 z-40 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white px-4 py-2.5 shadow-lg animate-in slide-in-from-top border-b border-amber-400/40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-white/20 text-white">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <span className="font-extrabold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded text-[10px] mr-1.5">
                  Price Alert Triggered
                </span>
                <span className="font-bold">{priceDropToast.message}</span>
                <span className="text-amber-200 ml-1.5 font-semibold">
                  (Save ₹{priceDropToast.savings} vs other apps)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPriceAlertModalOpen(true)}
                className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-extrabold hover:bg-amber-100 transition text-[11px]"
              >
                View Alerts
              </button>
              <button
                type="button"
                onClick={() => setPriceDropToast(null)}
                className="text-amber-200 hover:text-white font-bold px-1"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteNotification && (
        <div className="sticky top-16 z-30 bg-slate-900 text-white px-4 py-2 shadow-md animate-in slide-in-from-top">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>{deleteNotification}</span>
            </div>
            {lastDeletedItem && (
              <button
                onClick={handleUndoDelete}
                className="px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold border border-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Undo</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. Main Header */}
      <Header
        currentLocation={currentLocation}
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        onOpenMapsGrounding={() => setIsMapsGroundingOpen(true)}
        onOpenChatbot={() => setIsChatbotOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        cartTotal={cartTotal}
        onOpenPriceAlerts={() => {
          setSelectedItemForAlert(null);
          setIsPriceAlertModalOpen(true);
        }}
        alertCount={priceAlerts.filter((a) => a.isActive).length}
        onOpenContacts={() => setIsContactsModalOpen(true)}
        onOpenAboutUs={() => setIsAboutUsModalOpen(true)}
        onOpenReviews={() => setIsReviewsModalOpen(true)}
      />

      {/* 3. Hero & Live 5-App Search / Collector Section */}
      <div className="bg-gradient-to-b from-white via-indigo-50/30 to-transparent border-b border-slate-200/60 pt-6 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Tagline & Aggregator Value Proposition */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200/80 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Real-Time 5-Platform Quick Commerce Aggregator</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-['Cabinet_Grotesk']">
                Search Any Item. Scrape 5 Delivery Apps. Order with 1 Click.
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Live price & ETA comparison across <strong className="text-slate-900">Blinkit</strong>, <strong className="text-slate-900">Zepto</strong>, <strong className="text-slate-900">Swiggy Instamart</strong>, <strong className="text-slate-900">BigBasket</strong>, and <strong className="text-slate-900">JioMart</strong> with instant dark store stock verification.
              </p>
            </div>

            {/* Platform Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              {(['blinkit', 'zepto', 'swiggy', 'bigbasket', 'jiomart'] as PlatformId[]).map((pId) => (
                <PlatformBadge key={pId} platformId={pId} size="sm" />
              ))}
            </div>
          </div>

          {/* Interactive Search & Live Scraper Bar */}
          <div className="relative max-w-4xl space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCollect5Apps();
              }}
              className="relative flex items-center shadow-lg shadow-indigo-950/5 rounded-2xl bg-white border-2 border-indigo-500/30 hover:border-indigo-500 focus-within:border-indigo-600 transition overflow-hidden"
            >
              <div className="pl-4 pr-2 text-indigo-600">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food, milk, PS5 controller, board games, cold drinks, tech accessories..."
                className="w-full py-3.5 px-2 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2.5 text-xs font-bold text-slate-400 hover:text-slate-700 transition"
                >
                  Clear
                </button>
              )}

              {/* Collect Data from 5 Apps Button */}
              <button
                type="submit"
                disabled={isCollectingData}
                className="m-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold transition flex items-center gap-1.5 shrink-0 shadow-xs disabled:opacity-50"
                title="Collect & compare live quotes across Blinkit, Zepto, Swiggy, BigBasket & JioMart"
              >
                {isCollectingData ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Scraping 5 Apps...</span>
                    <span className="sm:hidden">Scraping...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                    <span className="hidden sm:inline">Collect Live Data</span>
                    <span className="sm:hidden">Scrape</span>
                  </>
                )}
              </button>
            </form>

            {/* Live Collecting Scanner Feedback Bar */}
            {isCollectingData && (
              <div className="p-3 bg-indigo-900 text-white rounded-xl shadow-md flex items-center justify-between text-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-semibold">{collectorStatus}</span>
                </div>
                <span className="text-[11px] font-mono text-indigo-300">5-App Engine Active</span>
              </div>
            )}

            {/* Collection Success Message */}
            {collectionSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{collectionSuccessMsg}</span>
              </div>
            )}

            {/* Popular Search Suggestions that trigger live collection */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                Popular Searches:
              </span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchQuery(term);
                    handleCollect5Apps(term);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 font-semibold transition text-[11px]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Filters, Categories & Aggregator Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'gaming', label: '🎮 Games & Tech' },
                { id: 'food_munchies', label: '🍕 Food & Munchies', val: 'munchies' },
                { id: 'groceries', label: '🥑 Groceries & Dairy' },
              ].map((cat) => {
                const isSelected = selectedCategory === (cat.val || cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.val || cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-2xs ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Sort & Platform Selectors + Aggregator Reset / Clear */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Sort by */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-700">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none text-xs cursor-pointer"
                >
                  <option value="recommended">Best Match</option>
                  <option value="cheapest">Cheapest Overall</option>
                  <option value="fastest">Fastest Delivery (&lt; 15 mins)</option>
                  <option value="discount">Highest Rating</option>
                </select>
              </div>

              {/* Platform filter */}
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-700">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400 text-[11px]">App:</span>
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none text-xs cursor-pointer"
                >
                  <option value="all">All 5 Apps</option>
                  <option value="blinkit">Blinkit Only</option>
                  <option value="zepto">Zepto Only</option>
                  <option value="swiggy">Swiggy Only</option>
                  <option value="bigbasket">BigBasket Only</option>
                  <option value="jiomart">JioMart Only</option>
                </select>
              </div>

              {/* Aggregator Feed Management: Reset Feed or Clear */}
              <div className="flex items-center gap-1 pl-1">
                <button
                  type="button"
                  onClick={handleResetAggregatorFeed}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition flex items-center gap-1"
                  title="Reset aggregator feed to default items"
                >
                  <RotateCcw className="w-3 h-3 text-slate-500" />
                  <span className="hidden sm:inline">Reset Catalog</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearAllAggregatorItems}
                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold border border-red-200 transition flex items-center gap-1"
                  title="Clear all aggregator items"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                  <span className="hidden sm:inline">Clear Feed</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* 4. Product Comparison Feed */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 text-sm">
              {filteredItems.length} Products Found
            </span>
            <span>•</span>
            <span>Real-time comparison across Blinkit, Zepto, Swiggy, BigBasket, JioMart</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Cheapest price highlighted
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Fastest delivery highlighted
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedItemForAlert(null);
                setIsPriceAlertModalOpen(true);
              }}
              className="text-amber-800 font-bold hover:underline flex items-center gap-1"
            >
              <Bell className="w-3 h-3 text-amber-600" />
              <span>Watchlist ({priceAlerts.length})</span>
            </button>
          </div>
        </div>

        {/* Product Cards Stack */}
        {filteredItems.length > 0 ? (
          <div className="space-y-6">
            {filteredItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                onAddToCart={handleAddToCart}
                cartPlatformQuantities={cartPlatformQuantities}
                onSetPriceAlert={handleOpenPriceAlertForProduct}
                onDeleteItem={handleDeleteItem}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">No items currently displayed in feed</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Type any item (groceries, snacks, tech gadgets, electronics, games) in the search box above to trigger the live 5-app data collector, or restore the default catalog.
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleResetAggregatorFeed}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-1.5 shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore 5-App Catalog</span>
              </button>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition"
              >
                Clear Search Query
              </button>
            </div>
          </div>
        )}

      </main>

      {/* 5. Floating Mobile Basket Bar (visible when items in cart) */}
      {cartItems.length > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto animate-in slide-in-from-bottom duration-300">
          <div
            onClick={() => setIsCartOpen(true)}
            className="p-3.5 bg-slate-950 text-white rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-900 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm flex items-center justify-center">
                {cartItems.reduce((a, b) => a + b.quantity, 0)}
              </div>
              <div>
                <span className="text-xs font-bold block text-white">Unified Basket</span>
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Total: ₹{cartTotal} (Tap to review & optimize)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold bg-emerald-600 px-3 py-1.5 rounded-xl shadow-xs">
              <span>View Cart</span>
              <span>→</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modals & Drawers */}
      
      {/* Price Alert Modal */}
      <PriceAlertModal
        isOpen={isPriceAlertModalOpen}
        onClose={() => setIsPriceAlertModalOpen(false)}
        alerts={priceAlerts}
        onAddAlert={handleAddPriceAlert}
        onDeleteAlert={handleDeletePriceAlert}
        onToggleAlert={handleTogglePriceAlert}
        onSimulatePriceDrop={handleSimulatePriceDrop}
        initialItemForAlert={selectedItemForAlert}
      />

      {/* Contacts Modal */}
      <ContactsModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
        onSubmitMessage={(msg) => {
          const newMsg: ContactMessage = {
            ...msg,
            id: `msg-${Date.now()}`,
            submittedAt: 'Just now',
          };
          setContactMessages((prev) => [newMsg, ...prev]);
        }}
      />

      {/* About Us Modal */}
      <AboutUsModal
        isOpen={isAboutUsModalOpen}
        onClose={() => setIsAboutUsModalOpen(false)}
      />

      {/* Reviews & Feedback Modal */}
      <ReviewsFeedbackModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        reviews={reviews}
        onAddReview={handleAddReview}
        onHelpfulVote={handleHelpfulVote}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onSwitchPlatform={handleSwitchPlatform}
        onClearCart={handleClearCart}
        onPlaceOrder={handlePlaceOrder}
        currentLocation={currentLocation}
      />

      {/* Chatbot Drawer */}
      <ChatbotDrawer
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        currentLocation={currentLocation}
        onSearchQuery={(q) => {
          setSearchQuery(q);
          setIsChatbotOpen(false);
          handleCollect5Apps(q);
        }}
      />

      {/* Maps Grounding Drawer */}
      <MapsGroundingDrawer
        isOpen={isMapsGroundingOpen}
        onClose={() => setIsMapsGroundingOpen(false)}
        currentLocation={currentLocation}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        currentLocation={currentLocation}
        onSelectLocation={(loc) => setCurrentLocation(loc)}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        order={activeOrder}
        onClose={() => setActiveOrder(null)}
      />

      {/* 7. Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-extrabold text-slate-900 font-['Cabinet_Grotesk'] text-sm">
              ER (Easy to Reach)
            </span>
            <span className="hidden sm:inline">•</span>
            <span>All-in-one delivery aggregator platform for India</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsPriceAlertModalOpen(true)}
              className="hover:text-amber-700 font-semibold transition flex items-center gap-1"
            >
              <Bell className="w-3.5 h-3.5 text-amber-600" />
              <span>Price Alerts</span>
            </button>

            <span>•</span>

            <button
              onClick={() => setIsReviewsModalOpen(true)}
              className="hover:text-emerald-700 font-semibold transition flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Reviews & Feedback</span>
            </button>

            <span>•</span>

            <button
              onClick={() => setIsAboutUsModalOpen(true)}
              className="hover:text-indigo-600 font-semibold transition flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              <span>About Us</span>
            </button>

            <span>•</span>

            <button
              onClick={() => setIsContactsModalOpen(true)}
              className="hover:text-purple-600 font-semibold transition flex items-center gap-1"
            >
              <Headphones className="w-3.5 h-3.5 text-purple-600" />
              <span>Contacts & Support</span>
            </button>

            <span>•</span>

            <button
              onClick={() => setIsMapsGroundingOpen(true)}
              className="hover:text-emerald-700 font-semibold transition"
            >
              Nearby Dark Stores
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <span>Live aggregator feeds synced from: Blinkit, Zepto, Swiggy Instamart, BigBasket & JioMart.</span>
          <span>© 2026 ER Technologies Pvt Ltd. All trademarks belong to their respective owners.</span>
        </div>
      </footer>

    </div>
  );
}
