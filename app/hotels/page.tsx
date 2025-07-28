"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Star,
  Bed,
  Users,
  Wine,
  Calendar,
  ChevronRight,
  X,
  ChevronLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Check,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  UtensilsCrossed,
  Heart,
  Share2
} from "lucide-react";

interface Hotel {
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

interface HotelCardProps {
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

const HotelCard: React.FC<HotelCardProps> = ({
  hotel = {
    id: "default-hotel-1",
    name: "Riviera Resort, Lekki",
    address:
      "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
    rating: 8.5,
    reviews: 436,
    roomType: "King size room",
    facilities: ["Pool", "Bar"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    price: 123450,
    totalPrice: 560000,
    nights: 10,
    rooms: 1,
    checkIn: "20-04-2024",
    checkOut: "29-04-2024"
  },
  onClose,
  onShowMap,
  onHotelDetails,
  onPriceDetails,
  onEditDetails,
  onAddToItinerary,
  isAddedToItinerary = false,
  viewMode = "grid"
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number): string => {
    return `₦ ${price.toLocaleString()}`;
  };

  const FacilityIcon: Record<string, React.ElementType> = {
    Pool: Users,
    Bar: Wine,
    Wifi: Wifi,
    Parking: Car,
    Coffee: Coffee,
    Gym: Dumbbell,
    Restaurant: UtensilsCrossed
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src =
                  "https://placehold.co/400x250/E0E0E0/666666?text=Image+Not+Found";
                e.currentTarget.onerror = null;
              }}
            />

            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-white/90 text-gray-600 hover:bg-white"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {hotel.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                    {hotel.name}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {hotel.address}
                </p>

                <div className="flex items-center gap-4 mb-3">
                  <button
                    onClick={onShowMap}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Show in map
                  </button>

                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-medium text-gray-900">
                      {hotel.rating}
                    </span>
                    <span className="text-gray-500 ml-1">
                      ({hotel.reviews})
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{hotel.roomType}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Facilities:</span>
                    <div className="flex items-center space-x-4">
                      {hotel.facilities.slice(0, 2).map((facility, index) => {
                        const Icon = FacilityIcon[facility];
                        return Icon ? (
                          <div key={index} className="flex items-center">
                            <Icon className="w-4 h-4 mr-1" />
                            <span>{facility}</span>
                          </div>
                        ) : null;
                      })}
                      {hotel.facilities.length > 2 && (
                        <span className="text-gray-500 text-xs">
                          +{hotel.facilities.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Check In: {hotel.checkIn}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Check Out: {hotel.checkOut}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={onHotelDetails}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Hotel details
                  </button>
                  <button
                    onClick={onPriceDetails}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Price details
                  </button>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatPrice(hotel.price)}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  Total Price: NGN {hotel.totalPrice.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mb-4">
                  {hotel.rooms} room x {hotel.nights} nights incl. taxes
                </div>

                {onAddToItinerary && (
                  <button
                    onClick={() => onAddToItinerary(hotel)}
                    disabled={isAddedToItinerary}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-all mb-3 ${
                      isAddedToItinerary
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                    }`}
                  >
                    {isAddedToItinerary ? (
                      <span className="flex items-center justify-center">
                        <Check className="w-4 h-4 mr-1" />
                        Added to Itinerary
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Itinerary
                      </span>
                    )}
                  </button>
                )}

                <button
                  onClick={onEditDetails}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Edit details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.images[currentImageIndex]}
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src =
              "https://placehold.co/400x250/E0E0E0/666666?text=Image+Not+Found";
            e.currentTarget.onerror = null;
          }}
        />

        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isLiked
                ? "bg-red-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {hotel.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {hotel.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {hotel.name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {hotel.address}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium text-gray-900">{hotel.rating}</span>
            <span className="text-gray-500 ml-1">({hotel.reviews})</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Bed className="w-4 h-4 mr-1" />
            <span>{hotel.roomType}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Facilities:</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {hotel.facilities.slice(0, 3).map((facility, index) => {
              const Icon = FacilityIcon[facility];
              return Icon ? (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span>{facility}</span>
                </div>
              ) : null;
            })}
            {hotel.facilities.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(hotel.price)}
            </div>
            <div className="text-xs text-gray-500">Per night</div>
          </div>

          {onAddToItinerary && (
            <button
              onClick={() => onAddToItinerary(hotel)}
              disabled={isAddedToItinerary}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                isAddedToItinerary
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {isAddedToItinerary ? (
                <Check className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface FiltersState {
  priceRange: [number, number];
  rating: number;
  facilities: string[];
  roomType: string;
}

interface BookingComHotelApiData {
  hotels: {
    id: string;
    name: string;
    address: string;
    review_score: number;
    review_score_word: string;
    review_nr: number;
    photos: { url_original: string }[];
    price_breakdown: {
      all_inclusive_price: {
        amount_rounded: string;
        currency: string;
        amount_per_night: {
          amount_rounded: string;
          currency: string;
        };
      };
    };
    room_type_name: string;
    facilities_2: string[]; // Example: ["Parking", "Restaurant", "WiFi"]
    number_of_rooms?: number;
    checkin_date?: string;
    checkout_date?: string;
  }[];
  // Add other properties if needed from the API response
  search_parameters?: {
    checkin: string;
    checkout: string;
    adults: number;
    children: number;
    rooms: number;
  };
}

interface BookingComApiResponse {
  status: boolean;
  message: string;
  data: BookingComHotelApiData;
  timestamp: number;
}

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Hotel[]>([]);
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 500000],
    rating: 0,
    facilities: [],
    roomType: ""
  });

  const transformApiDataToHotel = (
    apiHotel: BookingComHotelApiData["hotels"][0],
    checkIn: string,
    checkOut: string,
    rooms: number
  ): Hotel => {
    const pricePerNightStr =
      apiHotel.price_breakdown?.all_inclusive_price?.amount_per_night
        ?.amount_rounded || "0";
    const pricePerNight = parseFloat(
      pricePerNightStr.replace(/[^0-9.-]+/g, "")
    ); // Remove non-numeric chars for parsing
    const totalPriceStr =
      apiHotel.price_breakdown?.all_inclusive_price?.amount_rounded || "0";
    const totalPrice = parseFloat(totalPriceStr.replace(/[^0-9.-]+/g, ""));

    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      id: apiHotel.id,
      name: apiHotel.name,
      address: apiHotel.address,
      rating: apiHotel.review_score || 0,
      reviews: apiHotel.review_nr || 0,
      roomType: apiHotel.room_type_name || "Standard Room",
      facilities: apiHotel.facilities_2 || [],
      images: apiHotel.photos?.map((p) => p.url_original) || [],
      price: pricePerNight,
      totalPrice: totalPrice,
      nights: isNaN(nights) ? 0 : nights,
      rooms: rooms,
      checkIn: checkIn,
      checkOut: checkOut
    };
  };

  const getHotels = async (): Promise<void> => {
    setLoading(true);
    const today = new Date();
    const formatDate = (date: Date): string => date.toISOString().split("T")[0];

    const arrivalDate = formatDate(today);
    const departureDate = formatDate(
      new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    );

    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-2106102&search_type=CITY&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=2&children=0&room_qty=1&page_number=1&languagecode=en-us&currency_code=USD`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e1b944ef30mshb8bc7aefc350ca8p1bce8ajsnf571d3ea61ec",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: BookingComApiResponse = await response.json();
      console.log(result);

      if (result.status && result.data?.hotels) {
        const transformedHotels = result.data.hotels.map((apiHotel) =>
          transformApiDataToHotel(
            apiHotel,
            arrivalDate,
            departureDate,
            result.data.search_parameters?.rooms || 1
          )
        );
        setHotels(transformedHotels);

        const minPrice = Math.min(...transformedHotels.map((h) => h.price));
        const maxPrice = Math.max(...transformedHotels.map((h) => h.price));
        setFilters((prev) => ({
          ...prev,
          priceRange: [minPrice, maxPrice]
        }));
      } else {
        setHotels([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching hotels:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      setHotels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels();
  }, []);

  const handleAddToItinerary = (hotel: Hotel): void => {
    if (!itinerary.some((item) => item.id === hotel.id)) {
      setItinerary((prevItinerary) => [...prevItinerary, hotel]);
    }
  };

  const filteredHotels: Hotel[] = hotels.filter((hotel: Hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      hotel.price >= filters.priceRange[0] &&
      hotel.price <= filters.priceRange[1];
    const matchesRating = hotel.rating >= filters.rating;
    const matchesFacilities =
      filters.facilities.length === 0 ||
      filters.facilities.every((facility) =>
        hotel.facilities.includes(facility)
      );
    const matchesRoomType =
      !filters.roomType ||
      hotel.roomType.toLowerCase().includes(filters.roomType.toLowerCase());
    return (
      matchesSearch &&
      matchesPrice &&
      matchesRating &&
      matchesFacilities &&
      matchesRoomType
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Find Your Perfect Stay
              </h1>
              <p className="text-gray-600">
                Discover amazing hotels and add them to your travel itinerary
              </p>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels, locations..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>

              <div className="text-sm text-gray-600">
                {filteredHotels.length} hotels found
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {["Pool", "Wifi", "Gym", "Restaurant", "Bar"].map((facility) => (
              <button
                key={facility}
                onClick={() => {
                  const newFacilities = filters.facilities.includes(facility)
                    ? filters.facilities.filter((f) => f !== facility)
                    : [...filters.facilities, facility];
                  setFilters({ ...filters, facilities: newFacilities });
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  filters.facilities.includes(facility)
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredHotels.map((hotel: Hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              viewMode={viewMode}
              onShowMap={() =>
                console.log("Show in map clicked for:", hotel.name)
              }
              onHotelDetails={() =>
                console.log("Hotel details clicked for:", hotel.name)
              }
              onPriceDetails={() =>
                console.log("Price details clicked for:", hotel.name)
              }
              onEditDetails={() =>
                console.log("Edit details clicked for:", hotel.name)
              }
              onAddToItinerary={handleAddToItinerary}
              isAddedToItinerary={itinerary.some(
                (item: Hotel) => item.id === hotel.id
              )}
            />
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hotels found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {itinerary.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-colors cursor-pointer">
            <Calendar className="w-5 h-5" />
            <span className="font-medium">{itinerary.length} in itinerary</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
