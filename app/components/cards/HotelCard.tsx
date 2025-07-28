import React, { useState } from "react";
import {
  MapPin,
  Star,
  Bed,
  Users,
  Wine,
  Calendar,
  ChevronRight,
  X,
  ChevronLeft
} from "lucide-react";

const HotelCard = ({
  hotel = {
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
  onEditDetails
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm max-w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-80 h-64 lg:h-auto flex-shrink-0">
          <img
            src={hotel.images[currentImageIndex]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />

          {/* Image Navigation */}
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

              {/* Image Indicators */}
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

        {/* Content Section */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start h-full">
            {/* Left Content */}
            <div className="flex-1 lg:pr-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
                  {hotel.name}
                </h2>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors lg:hidden"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Address */}
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {hotel.address}
              </p>

              {/* Rating and Room Info Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
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
                  <span className="text-gray-500 ml-1">({hotel.reviews})</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{hotel.roomType}</span>
                </div>
              </div>

              {/* Facilities */}
              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Facilities:</span>
                  <div className="flex items-center space-x-4">
                    {hotel.facilities.includes("Pool") && (
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>Pool</span>
                      </div>
                    )}
                    {hotel.facilities.includes("Bar") && (
                      <div className="flex items-center">
                        <Wine className="w-4 h-4 mr-1" />
                        <span>Bar</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Check-in/Check-out */}
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

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 lg:gap-4">
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

            {/* Right Content - Price Section */}
            <div className="mt-4 lg:mt-0 lg:min-w-0 lg:flex-shrink-0">
              <div className="flex flex-row lg:flex-col justify-between lg:items-end lg:text-right">
                {/* Close button for desktop */}
                {onClose && (
                  <button
                    onClick={onClose}
                    className="hidden lg:block p-1 hover:bg-gray-100 rounded-full transition-colors mb-2 self-end"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}

                {/* Price */}
                <div className="lg:mb-4">
                  <div className="text-right">
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                      {formatPrice(hotel.price)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Total Price: NGN {hotel.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hotel.rooms} room x {hotel.nights} nights incl. taxes
                    </div>
                  </div>
                </div>

                {/* Edit Details Button */}
                <div className="flex justify-end">
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
      </div>
    </div>
  );
};

// Demo usage
export default function HotelCardDemo() {
  const [showCard, setShowCard] = useState(true);

  if (!showCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <button
          onClick={() => setShowCard(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Show Hotel Card
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hotel Booking
          </h1>
          <p className="text-gray-600">Review your selected accommodation</p>
        </div>

        <HotelCard
          onClose={() => setShowCard(false)}
          onShowMap={() => alert("Show in map clicked")}
          onHotelDetails={() => alert("Hotel details clicked")}
          onPriceDetails={() => alert("Price details clicked")}
          onEditDetails={() => alert("Edit details clicked")}
        />
      </div>
    </div>
  );
}
