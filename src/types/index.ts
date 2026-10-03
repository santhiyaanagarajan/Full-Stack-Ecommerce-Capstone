export type ProductCategory = 'all' | 'audio' | 'ceramics' | 'lighting' | 'workspace' | 'decor';

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'audio' | 'ceramics' | 'lighting' | 'workspace' | 'decor';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  description: string;
  longDescription: string;
  dimensions: string;
  materials: string;
  weight: string;
  features: string[];
  careInstructions: string;
  primaryImage: string;
  secondaryImage?: string;
  gallery: string[];
  colorOptions?: { name: string; hex: string }[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface FilterState {
  search: string;
  category: ProductCategory;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name-asc';
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'cod' | 'apple-pay';
  notes?: string;
}

export interface OrderReceipt {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  discount: number;
  discountCode?: string;
  shipping: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Preparing Shipment';
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}
