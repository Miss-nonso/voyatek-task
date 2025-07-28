import React, { useState } from "react";
import {
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  MoreHorizontal
} from "lucide-react";

const ActivitiesCard = ({
  activity = {
    name: "The Museum of Modern Art",
    description:
      "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & 1 The modern restaurant",
    images: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.5,
    reviews: 436,
    duration: "1 Hour",
    price: 123450.0,
    time: "10:30 AM on Mar 19",
    included: "Admission to the Empire State Building",
    dayNumber: 1
  },
  onClose,
  onDirections,
  onActivityDetails,
  onPriceDetails,
  onEditDetails,
  onSeeMore
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === activity.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activity.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden my-6 shadow-sm max-w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative w-full lg:w-80 h-64 lg:h-auto flex-shrink-0">
          <img
            src={activity.images[currentImageIndex]}
            alt={activity.name}
            className="w-full h-[20rem] object-cover"
          />

          {/* Image Navigation */}
          {activity.images.length > 1 && (
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
                {activity.images.map((_, index) => (
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
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 leading-tight pr-4">
                  {activity.name}
                </h2>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors lg:hidden flex-shrink-0"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {activity.description}
              </p>

              {/* Rating, Duration, and Directions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
                <button
                  onClick={onDirections}
                  className="flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Directions
                </button>

                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium text-gray-900">
                    {activity.rating}
                  </span>
                  <span className="text-gray-500 ml-1">
                    ({activity.reviews})
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{activity.duration}</span>
                </div>
              </div>

              {/* What's Included Section */}
              <div className="mb-4">
                <div className="flex items-start text-sm text-gray-600">
                  <span className="font-medium mr-2 text-gray-500">
                    What's included:
                  </span>
                  <div className="flex-1">
                    <span className="text-blue-500">{activity.included}</span>
                    <button
                      onClick={onSeeMore}
                      className="text-blue-500 hover:text-blue-600 ml-2 font-medium transition-colors"
                    >
                      See more
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 lg:gap-6">
                <button
                  onClick={onActivityDetails}
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
                >
                  Activity details
                </button>
                <button
                  onClick={onPriceDetails}
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
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
                    <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(activity.price)}
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {activity.time}
                    </div>
                  </div>
                </div>

                {/* Day Badge and Edit Details */}
                <div className="flex flex-col items-end gap-3">
                  {/* Day Badge */}
                  <div className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                    Day {activity.dayNumber}
                  </div>

                  {/* Options */}
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Eye className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <MoreHorizontal className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>

                  {/* Edit Details Button */}
                  <button
                    onClick={onEditDetails}
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
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
export default function ActivitiesCardDemo() {
  const [showCard, setShowCard] = useState(true);

  // Sample activities data
  const activities = [
    {
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & 1 The modern restaurant",
      images: [
        "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.5,
      reviews: 436,
      duration: "1 Hour",
      price: 123450.0,
      time: "10:30 AM on Mar 19",
      included: "Admission to the Empire State Building",
      dayNumber: 1
    },
    {
      name: "Broadway Show Experience",
      description:
        "World-class theatrical performances in the heart of New York's theater district. Premium seating with pre-show dining options.",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1594736797933-d0b22d2d7d53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.8,
      reviews: 892,
      duration: "2.5 Hours",
      price: 185000.0,
      time: "7:30 PM on Mar 20",
      included: "Orchestra seating & program guide",
      dayNumber: 2
    }
  ];

  const [currentActivity, setCurrentActivity] = useState(0);

  if (!showCard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <button
          onClick={() => setShowCard(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Show Activities Card
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Activities & Attractions
          </h1>
          <p className="text-gray-600">
            Discover amazing experiences for your trip
          </p>

          {/* Activity Switcher */}
          <div className="grig mt-8">
            {activities.map((curActivity, index) => (
              //   <button
              //     key={index}
              //     onClick={() => setCurrentActivity(index)}
              //     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              //       currentActivity === index
              //         ? "bg-blue-600 text-white"
              //         : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              //     }`}
              //   >
              //     Activity {index + 1}
              //   </button>
              <ActivitiesCard
                key={index}
                activity={curActivity}
                onClose={() => setShowCard(false)}
                onDirections={() => alert("Directions clicked")}
                onActivityDetails={() => alert("Activity details clicked")}
                onPriceDetails={() => alert("Price details clicked")}
                onEditDetails={() => alert("Edit details clicked")}
                onSeeMore={() => alert("See more clicked")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
