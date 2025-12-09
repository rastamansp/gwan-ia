export interface EventItem {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  address?: string;
  city: string;
  state?: string;
  image?: string;
  category?: string;
  organizerName?: string;
  maxCapacity?: number;
  soldTickets?: number;
  eventLink?: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  type: string;
  purpose: string;
  price: number;
  city: string;
  neighborhood: string;
  area?: number;
  bedrooms?: number | null;
  bathrooms?: number | null;
  garageSpaces?: number | null;
  amenities?: string[];
  coverImageUrl?: string;
  url?: string;
}

export interface ProductItem {
  id: number;
  code: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  originalPrice: number;
  promotionalPrice?: number;
  discountPercentage?: string;
  stock?: number;
  thumbnail?: string;
  realImage?: string;
  averageRating?: number;
  totalReviews?: number;
  isFeatured?: boolean;
  url?: string;
}

export interface JourneyMessage {
  from: 'user' | 'concierge';
  text: string;
}

export interface Journey {
  name: string;
  description?: string;
  messages: JourneyMessage[];
}

export interface ConvertedMessage {
  id: number;
  sender: 'mentor' | 'mentee';
  type: 'text' | 'image' | 'audio' | 'event_list' | 'property_list' | 'product_list';
  content: string;
  timestamp: string;
  caption?: string;
  duration?: string;
  suggestions?: string[];
  events?: EventItem[];
  properties?: PropertyItem[];
  products?: ProductItem[];
}

