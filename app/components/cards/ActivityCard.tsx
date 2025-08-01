"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Check,
  Heart,
  Share2
} from "lucide-react";
import {
  Activity,
  ActivitiesCardProps,
  CategoryIcon
} from "../../../lib/interface";

const ActivityCard: React.FC<ActivitiesCardProps> = ({
  activity = {
    name: "The Museum of Modern Art",
    description:
      "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & 1 The modern restaurant",
    images: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.5,
    reviews: 436,
    duration: "1 Hour",
    price: 123450.0,
    time: "10:30 AM on Mar 19",
    included: "Admission to the Empire State Building",
    dayNumber: 1,
    category: "Museums"
  },
  onDirections,
  onActivityDetails,
  onPriceDetails,
  onEditDetails,
  onSeeMore,
  onAddToItinerary,
  isAddedToItinerary = false,
  viewMode = "grid"
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === activity.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? activity.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number): string => {
    return `₦ ${price.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
            <Image
              height={300}
              width={300}
              src={activity.images[currentImageIndex]}
              alt={activity.name}
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

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                  {activity.images.map((_, index: number) => (
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

            <div className="absolute bottom-3 left-3">
              <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {activity.category}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-6">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                    {activity.name}
                  </h2>
                </div>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {activity.description}
                </p>

                <div className="flex items-center gap-4 mb-3">
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

                <div className="mb-4">
                  <div className="flex items-start text-sm text-gray-600">
                    <span className="font-medium mr-2 text-gray-500">
                      What&apos;s included:
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

                <div className="flex flex-wrap gap-4">
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

              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatPrice(activity.price)}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {activity.time}
                </div>
                <div className="text-sm text-gray-500 mb-4">Per person</div>

                {onAddToItinerary && (
                  <button
                    onClick={() => onAddToItinerary(activity)}
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
                  className="text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
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
        <Image
          height={300}
          width={300}
          src={activity.images[currentImageIndex]}
          alt={activity.name}
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

        {activity.images.length > 1 && (
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

        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {activity.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {activity.name}
        </h3>

        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {activity.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-medium text-gray-900">{activity.rating}</span>
            <span className="text-gray-500 ml-1">({activity.reviews})</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{activity.duration}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">What&apos;s included:</p>
          <p className="text-sm text-blue-500 line-clamp-1">
            {activity.included}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(activity.price)}
            </div>
            <div className="text-xs text-gray-500">Per person</div>
          </div>

          {onAddToItinerary && (
            <button
              onClick={() => onAddToItinerary(activity)}
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

export default ActivityCard;
