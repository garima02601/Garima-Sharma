import { Item, PlatformConfig, PlatformId } from '../types';

export const PLATFORMS: Record<PlatformId, PlatformConfig> = {
  blinkit: {
    id: 'blinkit',
    name: 'Blinkit',
    tagline: '10-minute grocery & gadgets delivery',
    badgeColor: '#F7CB46',
    badgeTextColor: '#1E1E1E',
    logoBg: 'bg-[#F7CB46]',
    accentBorder: 'border-[#F7CB46]',
    baseDeliveryFee: 25,
    freeDeliveryThreshold: 299,
    platformFee: 4,
    averageEtaMinutes: 10,
    speedRating: 'Ultra Fast'
  },
  zepto: {
    id: 'zepto',
    name: 'Zepto',
    tagline: '10 min quick commerce & late-night munchies',
    badgeColor: '#800080',
    badgeTextColor: '#FFFFFF',
    logoBg: 'bg-[#800080]',
    accentBorder: 'border-[#800080]',
    baseDeliveryFee: 29,
    freeDeliveryThreshold: 199,
    platformFee: 5,
    averageEtaMinutes: 9,
    speedRating: 'Lightning'
  },
  swiggy: {
    id: 'swiggy',
    name: 'Swiggy Instamart',
    tagline: 'Groceries, snacks & food in 15 mins',
    badgeColor: '#FC8019',
    badgeTextColor: '#FFFFFF',
    logoBg: 'bg-[#FC8019]',
    accentBorder: 'border-[#FC8019]',
    baseDeliveryFee: 30,
    freeDeliveryThreshold: 249,
    platformFee: 5,
    averageEtaMinutes: 14,
    speedRating: 'Super Fast'
  },
  bigbasket: {
    id: 'bigbasket',
    name: 'BigBasket BB Now',
    tagline: 'Freshest groceries & lowest bulk prices',
    badgeColor: '#84C225',
    badgeTextColor: '#1E1E1E',
    logoBg: 'bg-[#84C225]',
    accentBorder: 'border-[#84C225]',
    baseDeliveryFee: 20,
    freeDeliveryThreshold: 399,
    platformFee: 3,
    averageEtaMinutes: 22,
    speedRating: 'Value Supermarket'
  },
  jiomart: {
    id: 'jiomart',
    name: 'JioMart',
    tagline: 'Heavy everyday discounts & wholesale rates',
    badgeColor: '#0078AD',
    badgeTextColor: '#FFFFFF',
    logoBg: 'bg-[#0078AD]',
    accentBorder: 'border-[#0078AD]',
    baseDeliveryFee: 15,
    freeDeliveryThreshold: 299,
    platformFee: 2,
    averageEtaMinutes: 30,
    speedRating: 'Lowest MRP Deals'
  }
};

export const INITIAL_ITEMS: Item[] = [
  // --- GAMING & ELECTRONICS ---
  {
    id: 'game-ps5-controller',
    name: 'Sony PlayStation 5 DualSense Wireless Controller',
    brand: 'Sony PlayStation',
    category: 'gaming',
    unit: '1 Unit (Midnight Black)',
    image: 'https://images.unsplash.com/photo-1606318801954-d46846fe3ecd?w=500&auto=format&fit=crop&q=60',
    description: 'Haptic feedback, dynamic adaptive triggers, and built-in microphone for PS5 and PC gaming.',
    rating: 4.8,
    reviewCount: 3420,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 5399,
        originalPrice: 5990,
        inStock: true,
        etaMinutes: 12,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 10,
        badge: 'Fastest',
        offerText: 'Delivered in 12 mins via Blinkit Tech Pod',
        darkStoreDistanceKm: 1.4
      },
      zepto: {
        platformId: 'zepto',
        price: 5499,
        originalPrice: 5990,
        inStock: true,
        etaMinutes: 10,
        deliveryFee: 0,
        platformFee: 6,
        discountPercentage: 8,
        offerText: 'Zepto Instant Electronics Guarantee',
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 5449,
        originalPrice: 5990,
        inStock: true,
        etaMinutes: 16,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 9,
        offerText: 'Swiggy Instamart Tech Express',
        darkStoreDistanceKm: 2.1
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 5299,
        originalPrice: 5990,
        inStock: true,
        etaMinutes: 28,
        deliveryFee: 0,
        platformFee: 4,
        discountPercentage: 12,
        badge: 'Best Value',
        offerText: 'BB Supersaver Electronics Fest',
        darkStoreDistanceKm: 3.8
      },
      jiomart: {
        platformId: 'jiomart',
        price: 5190,
        originalPrice: 5990,
        inStock: true,
        etaMinutes: 42,
        deliveryFee: 0,
        platformFee: 3,
        discountPercentage: 13,
        badge: 'Cheapest',
        offerText: 'Reliance Digital Official Stock',
        darkStoreDistanceKm: 4.5
      }
    }
  },
  {
    id: 'game-catan-board',
    name: 'Catan (The Settlers of Catan) Strategy Board Game',
    brand: 'Asmodee',
    category: 'gaming',
    unit: 'Official 5th Edition (3-4 Players)',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500&auto=format&fit=crop&q=60',
    description: 'The award-winning game of discovery, trading, and settlement. Perfect for game nights.',
    rating: 4.9,
    reviewCount: 1890,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 2499,
        originalPrice: 2999,
        inStock: true,
        etaMinutes: 11,
        deliveryFee: 0,
        platformFee: 4,
        discountPercentage: 17,
        badge: 'Fastest',
        offerText: 'Weekend Board Game Specials',
        darkStoreDistanceKm: 1.2
      },
      zepto: {
        platformId: 'zepto',
        price: 2549,
        originalPrice: 2999,
        inStock: true,
        etaMinutes: 14,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 15,
        offerText: 'Quick Party Essentials',
        darkStoreDistanceKm: 1.8
      },
      swiggy: {
        platformId: 'swiggy',
        price: 2599,
        originalPrice: 2999,
        inStock: true,
        etaMinutes: 18,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 13,
        offerText: 'Instamart Play & Learn Hub',
        darkStoreDistanceKm: 2.3
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 2399,
        originalPrice: 2999,
        inStock: true,
        etaMinutes: 35,
        deliveryFee: 0,
        platformFee: 3,
        discountPercentage: 20,
        badge: 'Best Value',
        offerText: 'BB Gifting & Toys Section',
        darkStoreDistanceKm: 3.5
      },
      jiomart: {
        platformId: 'jiomart',
        price: 2349,
        originalPrice: 2999,
        inStock: false,
        etaMinutes: 45,
        deliveryFee: 0,
        platformFee: 2,
        discountPercentage: 22,
        badge: 'Cheapest',
        offerText: 'Currently out of stock at nearest hub',
        darkStoreDistanceKm: 6.0
      }
    }
  },
  {
    id: 'game-logitech-mouse',
    name: 'Logitech G304 Lightspeed Wireless Gaming Mouse',
    brand: 'Logitech G',
    category: 'gaming',
    unit: '12,000 DPI HERO Sensor (Black)',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60',
    description: 'Ultra-fast 1ms wireless report rate, 250-hour battery life, and lightweight 99g build.',
    rating: 4.7,
    reviewCount: 4210,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 2699,
        originalPrice: 3795,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 0,
        platformFee: 4,
        discountPercentage: 29,
        badge: 'Fastest',
        offerText: 'Under 10-minute delivery',
        darkStoreDistanceKm: 1.1
      },
      zepto: {
        platformId: 'zepto',
        price: 2749,
        originalPrice: 3795,
        inStock: true,
        etaMinutes: 10,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 28,
        offerText: 'Zepto Electronics Hub',
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 2799,
        originalPrice: 3795,
        inStock: true,
        etaMinutes: 15,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 26,
        darkStoreDistanceKm: 2.0
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 2599,
        originalPrice: 3795,
        inStock: true,
        etaMinutes: 30,
        deliveryFee: 0,
        platformFee: 3,
        discountPercentage: 31,
        darkStoreDistanceKm: 3.2
      },
      jiomart: {
        platformId: 'jiomart',
        price: 2499,
        originalPrice: 3795,
        inStock: true,
        etaMinutes: 38,
        deliveryFee: 0,
        platformFee: 2,
        discountPercentage: 34,
        badge: 'Cheapest',
        offerText: 'Lowest Price Guaranteed',
        darkStoreDistanceKm: 4.1
      }
    }
  },
  {
    id: 'game-monopoly-board',
    name: 'Hasbro Gaming Monopoly Classic Family Board Game',
    brand: 'Hasbro',
    category: 'gaming',
    unit: 'Original Indian Rupee Edition',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=60',
    description: 'Fast-dealing property trading game. Buy, sell, dream, and scheme your way to riches.',
    rating: 4.6,
    reviewCount: 2900,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 899,
        originalPrice: 1199,
        inStock: true,
        etaMinutes: 10,
        deliveryFee: 0,
        platformFee: 4,
        discountPercentage: 25,
        badge: 'Fastest',
        darkStoreDistanceKm: 1.3
      },
      zepto: {
        platformId: 'zepto',
        price: 949,
        originalPrice: 1199,
        inStock: true,
        etaMinutes: 11,
        deliveryFee: 0,
        platformFee: 5,
        discountPercentage: 21,
        darkStoreDistanceKm: 1.0
      },
      swiggy: {
        platformId: 'swiggy',
        price: 919,
        originalPrice: 1199,
        inStock: true,
        etaMinutes: 14,
        deliveryFee: 0,
        platformFee: 4,
        discountPercentage: 23,
        darkStoreDistanceKm: 1.9
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 849,
        originalPrice: 1199,
        inStock: true,
        etaMinutes: 26,
        deliveryFee: 0,
        platformFee: 3,
        discountPercentage: 29,
        badge: 'Best Value',
        darkStoreDistanceKm: 3.4
      },
      jiomart: {
        platformId: 'jiomart',
        price: 799,
        originalPrice: 1199,
        inStock: true,
        etaMinutes: 40,
        deliveryFee: 0,
        platformFee: 2,
        discountPercentage: 33,
        badge: 'Cheapest',
        darkStoreDistanceKm: 4.9
      }
    }
  },

  // --- FOOD, GROCERIES & BEVERAGES ---
  {
    id: 'food-amul-milk',
    name: 'Amul Taaza Homogenised Toned Milk',
    brand: 'Amul',
    category: 'groceries',
    unit: '1 Litre Tetra Pack',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
    description: 'Nutritious pasteurized homogenized toned milk with 3.0% fat and 8.5% SNF.',
    rating: 4.9,
    reviewCount: 9812,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 74,
        originalPrice: 75,
        inStock: true,
        etaMinutes: 8,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 1,
        badge: 'Fastest',
        offerText: 'Chilled delivery at 4°C',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 73,
        originalPrice: 75,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 3,
        darkStoreDistanceKm: 0.7
      },
      swiggy: {
        platformId: 'swiggy',
        price: 75,
        originalPrice: 75,
        inStock: true,
        etaMinutes: 12,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 0,
        darkStoreDistanceKm: 1.4
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 71,
        originalPrice: 75,
        inStock: true,
        etaMinutes: 20,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 5,
        badge: 'Best Value',
        offerText: 'Pack of 3 gets extra 5% off',
        darkStoreDistanceKm: 2.9
      },
      jiomart: {
        platformId: 'jiomart',
        price: 69,
        originalPrice: 75,
        inStock: true,
        etaMinutes: 32,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 8,
        badge: 'Cheapest',
        darkStoreDistanceKm: 4.0
      }
    }
  },
  {
    id: 'food-avocado-holl',
    name: 'Fresh Hass Imported Avocados',
    brand: 'Fresh Picks',
    category: 'groceries',
    unit: '2 Pcs (~300-350g)',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=60',
    description: 'Creamy Hass avocados, ripe and ready for gourmet guacamole, toasts, and salads.',
    rating: 4.7,
    reviewCount: 1420,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 219,
        originalPrice: 280,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 22,
        badge: 'Fastest',
        offerText: 'Handpicked Grade-A Freshness',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 209,
        originalPrice: 280,
        inStock: true,
        etaMinutes: 10,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 25,
        offerText: 'Zepto Fresh Produce Direct',
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 225,
        originalPrice: 280,
        inStock: true,
        etaMinutes: 14,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 20,
        darkStoreDistanceKm: 1.5
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 189,
        originalPrice: 280,
        inStock: true,
        etaMinutes: 24,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 32,
        badge: 'Cheapest',
        offerText: 'Fresho Farm Direct Import',
        darkStoreDistanceKm: 3.1
      },
      jiomart: {
        platformId: 'jiomart',
        price: 195,
        originalPrice: 280,
        inStock: true,
        etaMinutes: 35,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 30,
        badge: 'Best Value',
        darkStoreDistanceKm: 4.2
      }
    }
  },
  {
    id: 'food-maggi-noodles',
    name: 'Maggi 2-Minute Special Masala Instant Noodles',
    brand: 'Nestlé Maggi',
    category: 'food_munchies',
    unit: 'Pack of 12 (840g)',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&auto=format&fit=crop&q=60',
    description: 'Signature blend of 20 spices and herbs. The quintessential Indian comfort midnight snack.',
    rating: 4.9,
    reviewCount: 15400,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 168,
        originalPrice: 192,
        inStock: true,
        etaMinutes: 8,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 12,
        badge: 'Fastest',
        offerText: 'Instant late-night munchies',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 165,
        originalPrice: 192,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 14,
        offerText: 'Zepto Cafe pairing available',
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 172,
        originalPrice: 192,
        inStock: true,
        etaMinutes: 13,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 10,
        darkStoreDistanceKm: 1.6
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 155,
        originalPrice: 192,
        inStock: true,
        etaMinutes: 22,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 19,
        badge: 'Best Value',
        darkStoreDistanceKm: 3.0
      },
      jiomart: {
        platformId: 'jiomart',
        price: 148,
        originalPrice: 192,
        inStock: true,
        etaMinutes: 30,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 23,
        badge: 'Cheapest',
        offerText: 'Super Saver Megastore Pricing',
        darkStoreDistanceKm: 4.1
      }
    }
  },
  {
    id: 'food-coke-zero',
    name: 'Coca-Cola Zero Sugar Can',
    brand: 'Coca-Cola',
    category: 'beverages',
    unit: 'Pack of 6 x 300ml',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60',
    description: 'Refreshing classic Coca-Cola taste with zero calories and zero sugar. Ideal for party & gaming fuel.',
    rating: 4.8,
    reviewCount: 6540,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 230,
        originalPrice: 240,
        inStock: true,
        etaMinutes: 7,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 4,
        badge: 'Fastest',
        offerText: 'Ice cold delivered in insulated bag',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 228,
        originalPrice: 240,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 5,
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 235,
        originalPrice: 240,
        inStock: true,
        etaMinutes: 12,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 2,
        darkStoreDistanceKm: 1.4
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 215,
        originalPrice: 240,
        inStock: true,
        etaMinutes: 20,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 10,
        badge: 'Best Value',
        darkStoreDistanceKm: 2.8
      },
      jiomart: {
        platformId: 'jiomart',
        price: 205,
        originalPrice: 240,
        inStock: true,
        etaMinutes: 34,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 15,
        badge: 'Cheapest',
        darkStoreDistanceKm: 4.3
      }
    }
  },
  {
    id: 'food-lays-gourmet',
    name: "Lay's Gourmet Vintage Cheese & Paprika Artisan Chips",
    brand: "Lay's",
    category: 'food_munchies',
    unit: 'Pack of 3 x 90g',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    description: 'Slow-cooked potato kettle chips crafted with authentic Spanish paprika and sharp aged cheddar.',
    rating: 4.7,
    reviewCount: 3180,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 145,
        originalPrice: 150,
        inStock: true,
        etaMinutes: 8,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 3,
        badge: 'Fastest',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 140,
        originalPrice: 150,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 7,
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 147,
        originalPrice: 150,
        inStock: true,
        etaMinutes: 14,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 2,
        darkStoreDistanceKm: 1.5
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 132,
        originalPrice: 150,
        inStock: true,
        etaMinutes: 22,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 12,
        badge: 'Best Value',
        darkStoreDistanceKm: 3.1
      },
      jiomart: {
        platformId: 'jiomart',
        price: 126,
        originalPrice: 150,
        inStock: true,
        etaMinutes: 28,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 16,
        badge: 'Cheapest',
        darkStoreDistanceKm: 3.9
      }
    }
  },
  {
    id: 'food-nutella-spread',
    name: 'Nutella Hazelnut Spread with Cocoa',
    brand: 'Ferrero Nutella',
    category: 'food_munchies',
    unit: 'Jar of 350g',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=500&auto=format&fit=crop&q=60',
    description: 'Iconic creamy hazelnut chocolate spread made with carefully selected high-quality ingredients.',
    rating: 4.9,
    reviewCount: 8900,
    quotes: {
      blinkit: {
        platformId: 'blinkit',
        price: 365,
        originalPrice: 395,
        inStock: true,
        etaMinutes: 9,
        deliveryFee: 15,
        platformFee: 4,
        discountPercentage: 8,
        badge: 'Fastest',
        darkStoreDistanceKm: 0.8
      },
      zepto: {
        platformId: 'zepto',
        price: 370,
        originalPrice: 395,
        inStock: true,
        etaMinutes: 10,
        deliveryFee: 15,
        platformFee: 5,
        discountPercentage: 6,
        darkStoreDistanceKm: 0.9
      },
      swiggy: {
        platformId: 'swiggy',
        price: 375,
        originalPrice: 395,
        inStock: true,
        etaMinutes: 14,
        deliveryFee: 20,
        platformFee: 5,
        discountPercentage: 5,
        darkStoreDistanceKm: 1.5
      },
      bigbasket: {
        platformId: 'bigbasket',
        price: 345,
        originalPrice: 395,
        inStock: true,
        etaMinutes: 21,
        deliveryFee: 10,
        platformFee: 3,
        discountPercentage: 13,
        badge: 'Best Value',
        darkStoreDistanceKm: 3.0
      },
      jiomart: {
        platformId: 'jiomart',
        price: 335,
        originalPrice: 395,
        inStock: true,
        etaMinutes: 32,
        deliveryFee: 10,
        platformFee: 2,
        discountPercentage: 15,
        badge: 'Cheapest',
        darkStoreDistanceKm: 4.1
      }
    }
  }
];

export const PRESET_LOCATIONS = [
  {
    label: 'Bengaluru - Indiranagar',
    address: '100 Feet Rd, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru, Karnataka',
    lat: 12.9784,
    lng: 77.6408
  },
  {
    label: 'Bengaluru - Koramangala',
    address: '80 Feet Rd, 4th Block, Koramangala',
    city: 'Bengaluru, Karnataka',
    lat: 12.9352,
    lng: 77.6245
  },
  {
    label: 'Mumbai - Bandra West',
    address: 'Hill Road, Bandra West',
    city: 'Mumbai, Maharashtra',
    lat: 19.0596,
    lng: 72.8295
  },
  {
    label: 'Delhi NCR - Cyber Hub Gurgaon',
    address: 'DLF Cyber City, Sector 24, Gurugram',
    city: 'Gurugram, Haryana',
    lat: 28.4952,
    lng: 77.0891
  }
];
