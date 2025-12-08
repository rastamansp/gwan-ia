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
  type: 'text' | 'image' | 'audio' | 'event_list';
  content: string;
  timestamp: string;
  caption?: string;
  duration?: string;
  suggestions?: string[];
  events?: EventItem[];
}

