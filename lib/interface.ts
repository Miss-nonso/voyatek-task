import React from "react";
import {
  Users,
  Wine,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  UtensilsCrossed
} from "lucide-react";

import {
  Compass,
  Camera,
  Building,
  Utensils,
  Music,
  Waves
} from "lucide-react";

export interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  roomType: string;
  facilities: string[];
  images: string[];
  price: number;
  totalPrice: number;
  nights: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

export interface HotelCardProps {
  hotel?: Hotel;
  onClose?: () => void;
  onShowMap: () => void;
  onHotelDetails: () => void;
  onPriceDetails: () => void;
  onEditDetails: () => void;
  onAddToItinerary?: (hotel: Hotel) => void;
  isAddedToItinerary?: boolean;
  viewMode?: "grid" | "list";
}

export interface FiltersState {
  priceRange: [number, number];
  rating: number;
  facilities: string[];
  roomType: string;
}

export interface BookingComProperty {
  id: number;
  name: string;
  address: string;
  reviewScore: number;
  reviewCount: number;
  photoUrls: string[];
  facilities_2: string[];
  room_type_name?: string;
}

export interface BookingComHotelApiItem {
  hotel_id: string;
  property: BookingComProperty;
  priceBreakdown: {
    all_inclusive_price: {
      amount_rounded: string;
      currency: string;
      amount_per_night: {
        amount_rounded: string;
        currency: string;
      };
    };
  };
}

export interface BookingComHotelApiData {
  hotels: BookingComHotelApiItem[];
  search_parameters?: {
    checkin: string;
    checkout: string;
    adults: number;
    children: number;
    rooms: number;
  };
}

export interface BookingComApiResponse {
  status: boolean;
  message: string;
  data: BookingComHotelApiData;
  timestamp: number;
}

export const FacilityIcon: Record<string, React.ElementType> = {
  Pool: Users,
  Bar: Wine,
  Wifi: Wifi,
  Parking: Car,
  Coffee: Coffee,
  Gym: Dumbbell,
  Restaurant: UtensilsCrossed
};

export interface Activity {
  name: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  duration: string;
  price: number;
  time: string;
  included: string;
  dayNumber: number;
  category?: string;
}

export interface ActivitiesCardProps {
  activity?: Activity;
  onClose?: () => void;
  onDirections: () => void;
  onActivityDetails: () => void;
  onPriceDetails: () => void;
  onEditDetails: () => void;
  onSeeMore: () => void;
  onAddToItinerary?: (activity: Activity) => void;
  isAddedToItinerary?: boolean;
  viewMode?: "grid" | "list";
}

export interface CategoryOption {
  name: string;
  label: string;
  icon: React.ElementType;
}

export interface FiltersState {
  priceRange: [number, number];
  rating: number;
  duration: string;
  category: string;
}

export const CategoryIcon: Record<string, React.ElementType> = {
  all: Compass,
  Museums: Building,
  Entertainment: Music,
  Tours: Camera,
  "Food & Drink": Utensils,
  Architecture: Building,
  "Water Activities": Waves
};

export interface Flight {
  airlineName: string;
  flightNumber: string;
  flightClass: string;
  departureTime: string;
  departureDate: string;
  departureAirportCode: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalAirportCode: string;
  duration: string;
  stops: string;
  price: number;
  baggageWeight: string;
  cabinBaggageWeight: string;
  hasEntertainment: boolean;
  hasMeal: boolean;
  hasUsbPort: boolean;
  airlineLogoSrc: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  roomType: string;
  facilities: string[];
  images: string[];
  price: number;
  totalPrice: number;
  nights: number;
  rooms: number;
  checkIn: string;
  checkOut: string;
}

export interface Activity {
  name: string;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  duration: string;
  price: number;
  time: string;
  included: string;
  dayNumber: number;
  category?: string;
}
