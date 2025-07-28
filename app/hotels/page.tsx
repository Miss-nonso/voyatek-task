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
  SlidersHorizontal,
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
  Share2,
  ChevronDown
} from "lucide-react";

// Icon mapping for facilities
const facilityIcons = {
  Pool: Users,
  Bar: Wine,
  Wifi: Wifi,
  Parking: Car,
  Coffee: Coffee,
  Gym: Dumbbell,
  Restaurant: UtensilsCrossed
};

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split("T")[0];

const arrival_date = formatDate(today); // today
const departure_date = formatDate(new Date(today.setDate(today.getDate() + 3))); // 3 days later

// Main Hotels Page Component
const HotelsPage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    rating: 0,
    facilities: [],
    roomType: ""
  });

  //   const sampleHotels = [
  //     /* ... sampleHotels array unchanged ... */
  //   ];

  const getHotels = async () => {
    // Generate dynamic valid dates in YYYY-MM-DD format
    const today = new Date();
    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const arrivalDate = formatDate(today);
    const departureDate = formatDate(
      new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    ); // +3 days

    const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=-2106102&search_type=CITY&arrival_date=${arrivalDate}&departure_date=${departureDate}&adults=2&children=0&room_qty=1&page_number=1&languagecode=en-us&currency_code=USD`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "e1b944ef30mshb8bc7aefc350ca8p1bce8ajsnf571d3ea61ec",
        "x-rapidapi-host": "booking-com15.p.rapidapi.com"
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse as JSON
      console.log(result);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      //   setHotels(sampleHotels);
      getHotels();
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToItinerary = (hotel) => {
    if (!itinerary.find((item) => item.id === hotel.id)) {
      setItinerary([...itinerary, hotel]);
    }
  };

  const filteredHotels = hotels.filter((hotel) => {
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
      {/* Header */}
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

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Controls */}
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

          {/* Quick Filters */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              viewMode={viewMode}
              onShowMap={() => alert("Show in map clicked")}
              onHotelDetails={() => alert("Hotel details clicked")}
              onPriceDetails={() => alert("Price details clicked")}
              onEditDetails={() => alert("Edit details clicked")}
              onAddToItinerary={handleAddToItinerary}
              isAddedToItinerary={itinerary.some(
                (item) => item.id === hotel.id
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
