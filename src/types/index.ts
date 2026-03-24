export type CuisineTag =
  | "Nigerian" | "Ghanaian" | "Kenyan" | "Ethiopian"
  | "Pizza" | "Burgers" | "Chinese" | "Shawarma"
  | "Seafood" | "Healthy" | "Drinks" | "Desserts" | "Jollof";

export type AfricanCountry = "NG" | "GH" | "KE" | "ZA" | "EG" | "TZ" | "UG";
export type AfricanCurrency = "NGN" | "GHS" | "KES" | "ZAR" | "EGP";

export interface Coordinates { lat: number; lng: number; }

export interface Address {
  id?: string;
  label?: string;
  street: string;
  city: string;
  state: string;
  country: AfricanCountry;
  landmark?: string;
  coordinates: Coordinates;
}

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  cuisineTags: CuisineTag[];
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  address: Address;
  isFeatured: boolean;
  priceRange: 1 | 2 | 3;
}

export interface MenuCategory {
  id: string;
  restaurantId: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
  isPopular: boolean;
  calories?: number;
  prepTimeMinutes: number;
}

export type OrderStatus =
  | "pending" | "confirmed" | "preparing"
  | "ready_for_pickup" | "picked_up" | "in_transit"
  | "delivered" | "cancelled";

export interface CartItem {
  menuItemId: string;
  restaurantId: string;
  restaurantName: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  reference: string;
  restaurantName: string;
  restaurantLogo: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  currency: AfricanCurrency;
  deliveryAddress: Address;
  estimatedDelivery: string;
  createdAt: string;
}
