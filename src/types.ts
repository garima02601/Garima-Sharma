export type PlatformId = 'blinkit' | 'zepto' | 'swiggy' | 'bigbasket' | 'jiomart';

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  tagline: string;
  badgeColor: string;
  badgeTextColor: string;
  logoBg: string;
  accentBorder: string;
  baseDeliveryFee: number;
  freeDeliveryThreshold: number;
  platformFee: number;
  averageEtaMinutes: number;
  speedRating: string;
}

export interface PlatformQuote {
  platformId: PlatformId;
  price: number; // in INR (₹)
  originalPrice: number;
  inStock: boolean;
  etaMinutes: number;
  deliveryFee: number;
  platformFee: number;
  surgeFee?: number;
  discountPercentage: number;
  badge?: 'Cheapest' | 'Fastest' | 'Best Value' | 'Exclusive';
  offerText?: string;
  darkStoreDistanceKm?: number;
}

export interface Item {
  id: string;
  name: string;
  brand: string;
  category: 'groceries' | 'food_munchies' | 'beverages' | 'gaming' | 'electronics' | 'daily_essentials';
  unit: string;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  quotes: Record<PlatformId, PlatformQuote>;
}

export interface CartItem {
  item: Item;
  selectedPlatform: PlatformId;
  quantity: number;
}

export interface GroundingSource {
  title?: string;
  uri?: string;
  snippet?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  modelUsed?: string;
  thoughtProcess?: string;
  groundingSources?: GroundingSource[];
  suggestedAction?: {
    type: 'search' | 'add_to_cart';
    payload: string;
  };
}

export interface DeliveryLocation {
  label: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export interface OrderRecord {
  id: string;
  placedAt: string;
  items: CartItem[];
  deliveryAddress: DeliveryLocation;
  subtotal: number;
  deliveryFees: number;
  platformFees: number;
  taxes: number;
  discount: number;
  total: number;
  status: 'placed' | 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered';
  estimatedArrival: string;
  activePlatform: PlatformId;
  riderName: string;
  riderPhone: string;
  progressPercent: number;
}

export interface PriceAlert {
  id: string;
  itemId?: string;
  productName: string;
  targetPrice: number;
  currentCheapestPrice: number;
  preferredPlatform: PlatformId | 'any';
  notifyEmail?: string;
  notifyPhone?: string;
  createdAt: string;
  isActive: boolean;
  triggered?: boolean;
  triggeredAt?: string;
  triggeredPlatform?: PlatformId;
  triggeredPrice?: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number; // 1 to 5
  platformTag: PlatformId | 'er_unified';
  tags: string[];
  date: string;
  comment: string;
  helpfulCount: number;
  verifiedBuyer: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  topic: 'price_mismatch' | 'order_delay' | 'missing_item' | 'partnership' | 'feedback' | 'general';
  message: string;
  submittedAt: string;
  status?: 'received' | 'investigating' | 'resolved';
}

