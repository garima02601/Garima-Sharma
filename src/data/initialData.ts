import { PriceAlert, ReviewItem } from '../types';

export const INITIAL_PRICE_ALERTS: PriceAlert[] = [
  {
    id: 'alert-1',
    productName: 'Amul Taaza Homogenised Toned Milk 500ml',
    targetPrice: 25,
    currentCheapestPrice: 28,
    preferredPlatform: 'any',
    notifyEmail: 'shopper@example.com',
    createdAt: '2 hours ago',
    isActive: true,
    triggered: false,
  },
  {
    id: 'alert-2',
    productName: 'Sony PlayStation 5 DualSense Wireless Controller',
    targetPrice: 4999,
    currentCheapestPrice: 5399,
    preferredPlatform: 'jiomart',
    createdAt: '1 day ago',
    isActive: true,
    triggered: false,
  },
  {
    id: 'alert-3',
    productName: 'Coca-Cola Zero Sugar Can 300ml',
    targetPrice: 35,
    currentCheapestPrice: 38,
    preferredPlatform: 'zepto',
    createdAt: '3 days ago',
    isActive: true,
    triggered: true,
    triggeredAt: 'Just now',
    triggeredPlatform: 'zepto',
    triggeredPrice: 34,
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    rating: 5,
    platformTag: 'er_unified',
    tags: ['Saved ₹150+', 'Loved Split Basket', 'Instant Checkout'],
    date: 'Yesterday',
    comment:
      'ER is an absolute game-changer in Bengaluru! I bought groceries from Zepto in 9 mins and ordered a gaming mouse from JioMart at a ₹350 lower price, all through ER in one single checkout without juggling two separate apps.',
    helpfulCount: 38,
    verifiedBuyer: true,
  },
  {
    id: 'rev-2',
    author: 'Neha Sundaram',
    rating: 5,
    platformTag: 'zepto',
    tags: ['Lightning 10m Delivery', 'Dark Store Nearby'],
    date: '2 days ago',
    comment:
      'Zepto dark store was just 700 meters away according to ER Google Maps radar. Ice cream arrived completely frozen in under 8 minutes on a Friday night!',
    helpfulCount: 24,
    verifiedBuyer: true,
  },
  {
    id: 'rev-3',
    author: 'Karan Patel',
    rating: 4,
    platformTag: 'blinkit',
    tags: ['Accurate Live Prices', 'Zero Markup'],
    date: '3 days ago',
    comment:
      'Blinkit was fastest for computer accessories and emergency cables. The price matched exactly what was shown in ER with zero hidden platform charges.',
    helpfulCount: 19,
    verifiedBuyer: true,
  },
  {
    id: 'rev-4',
    author: 'Sunita Reddy',
    rating: 5,
    platformTag: 'bigbasket',
    tags: ['Saved ₹150+', 'Cheaper than Offline'],
    date: '4 days ago',
    comment:
      'BigBasket BB Now had the lowest price on fresh organic vegetables and wheat flour. ER made it easy to compare and save over ₹180 on my weekly pantry list.',
    helpfulCount: 15,
    verifiedBuyer: true,
  },
  {
    id: 'rev-5',
    author: 'Vikram Joshi',
    rating: 4,
    platformTag: 'jiomart',
    tags: ['Saved ₹150+', 'Cheaper than Offline'],
    date: '5 days ago',
    comment:
      'JioMart consistently had the lowest base prices for bulk detergents and pantry staples. Even though delivery takes 30 mins, saving ₹250 was totally worth it.',
    helpfulCount: 12,
    verifiedBuyer: true,
  },
  {
    id: 'rev-6',
    author: 'Divya Nair',
    rating: 5,
    platformTag: 'swiggy',
    tags: ['Accurate Live Prices', 'Lightning 10m Delivery'],
    date: '1 week ago',
    comment:
      'Swiggy Instamart bakery selection is fantastic. ER showed me they had fresh sourdough bread in stock while other apps were out of stock.',
    helpfulCount: 9,
    verifiedBuyer: true,
  },
];
