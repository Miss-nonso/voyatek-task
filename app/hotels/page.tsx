"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Filter,
  Grid3X3,
  List,
  Search,
  Calendar,
  ChevronRight
} from "lucide-react";
import HotelPageCard from "app/components/cards/HotelPageCard"; // Assuming this path is correct
import {
  Hotel,
  BookingComHotelApiItem,
  BookingComHotelApiData,
  BookingComApiResponse
} from "../../lib/interface"; // Assuming these interfaces are correctly defined here

// Define FiltersState specifically for HotelsPage, if it's not already in lib/interface
// or ensure the one in lib/interface is suitable for hotels only.
// If lib/interface is shared, you might need to adjust it or create a specific one here.
interface FiltersState {
  priceRange: [number, number];
  rating: number;
  facilities: string[];
  roomType: string;
}

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Hotel[]>(() => {
    if (typeof window !== "undefined") {
      const savedItinerary = localStorage.getItem("hotelItinerary");
      try {
        return savedItinerary ? JSON.parse(savedItinerary) : [];
      } catch (e) {
        console.error("Failed to parse hotel itinerary from local storage", e);
        return [];
      }
    }
    return [];
  });
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 500000],
    rating: 0,
    facilities: [], // Changed from [""] to [] for proper filtering
    roomType: ""
  });

  const transformApiDataToHotel = (
    apiHotelItem: BookingComHotelApiItem,
    checkIn: string,
    checkOut: string,
    rooms: number
  ): Hotel => {
    const property = apiHotelItem.property;
    const priceBreakdown = apiHotelItem.priceBreakdown;

    const pricePerNightStr =
      priceBreakdown?.all_inclusive_price?.amount_per_night?.amount_rounded ||
      "0";
    const pricePerNight = parseFloat(pricePerNightStr.replace(/[^0-9.]/g, ""));

    const totalPriceStr =
      priceBreakdown?.all_inclusive_price?.amount_rounded || "0";
    const totalPrice = parseFloat(totalPriceStr.replace(/[^0-9.]/g, ""));

    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return {
      id: apiHotelItem.hotel_id,
      name: property.name || "Unknown Hotel",
      address: property.address || "Unknown Address",
      rating: property.reviewScore || 0,
      reviews: property.reviewCount || 0,
      roomType: property.room_type_name || "Standard Room",
      facilities: property.facilities_2 || [],
      images: property.photoUrls || [],
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
    // FIX: Correctly format the passed date, not always 'today'
    const formatDate = (date: Date): string => date.toISOString().split("T")[0];

    const arrivalDate = formatDate(today);
    const departureDate = formatDate(
      new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    );

    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-2106102&search_type=CITY&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=2&children=0&room_qty=1&page_number=1&languagecode=en-us&currency_code=USD`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "f1ff9c3f3amshce5b4e8bf88f2f9p1f383djsn2c81cc896165",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: BookingComApiResponse = await response.json();
      console.log({ rawApiResponse: result });

      if (result.status && result.data?.hotels) {
        const transformedHotels = result.data.hotels.map((apiHotelItem) =>
          transformApiDataToHotel(
            apiHotelItem,
            arrivalDate,
            departureDate,
            result.data.search_parameters?.rooms || 1
          )
        );

        setHotels(transformedHotels);
        console.log({ transformedHotels });

        if (transformedHotels.length > 0) {
          const minPrice = Math.min(...transformedHotels.map((h) => h.price));
          const maxPrice = Math.max(...transformedHotels.map((h) => h.price));
          setFilters((prev) => ({
            ...prev,
            priceRange: [minPrice, maxPrice]
          }));
        }
      } else {
        setHotels([]);
      }
    } catch (error: unknown) {
      console.error("Error fetching hotels:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      }
      setHotels([]); // Ensure hotels state is reset on error
    } finally {
      setLoading(false);
    }
  };

  // This useEffect will now run once on component mount and whenever searchQuery changes.
  useEffect(() => {
    getHotels();
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hotelItinerary", JSON.stringify(itinerary));
    }
  }, [itinerary]);

  const handleAddToItinerary = (hotel: Hotel): void => {
    if (!itinerary.some((item) => item.id === hotel.id)) {
      setItinerary((prevItinerary) => [...prevItinerary, hotel]);
    }
  };

  const filteredHotels: Hotel[] = hotels.filter((hotel: Hotel) => {
    const matchesSearch =
      hotel.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      hotel.price >= filters.priceRange[0] &&
      hotel.price <= filters.priceRange[1];
    const matchesRating = hotel.rating >= filters.rating;
    const matchesFacilities =
      filters.facilities.length === 0 ||
      filters.facilities?.every((facility) =>
        hotel.facilities.includes(facility)
      );
    const matchesRoomType =
      !filters.roomType ||
      hotel.roomType?.toLowerCase().includes(filters.roomType?.toLowerCase());
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
                    ? filters.facilities.filter((f: string) => f !== facility)
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
            <HotelPageCard
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
