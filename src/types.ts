export interface Destination {
  id: string;
  title: string;
  location: string;
  image: string;
  slotsLeft: number;
  price: number;
  tripType: string; // "Open Trip" | "Private" | "Request based"
  dateRange: string;
  category: "Retreat" | "Package" | "Coaches" | "Adventures" | "Network Ops" | string;
  region: "Central Highlands" | "Southern Coast" | "Cultural Triangle" | "Western Coast" | "Eastern Coast" | "Enterprise Backbone" | string;
  accommodation: string;
  transport: string;
  meals: string;
  rating: number;
  description: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Booking {
  id: string;
  destinationId: string;
  destinationTitle: string;
  destinationImage: string;
  userName: string;
  userEmail: string;
  passengers: number;
  dateSelected: string;
  tripType: string;
  totalPrice: number;
  status: 'Confirmed' | 'Pending';
  bookedAt: string;
}

export interface FilterState {
  activity: string;
  location: string;
  dateRange: string;
  budget: string;
}
