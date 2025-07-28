"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Check,
  Calendar,
  Heart,
  Share2,
  Compass,
  Camera,
  Building,
  Utensils,
  Music,
  Waves
} from "lucide-react";

interface Activity {
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
  category: string;
}

interface ActivitiesCardProps {
  activity: Activity;
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

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
  activity = {
    name: "The Museum of Modern Art",
    description:
      "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & 1 The modern restaurant",
    images: [
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      //   "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    rating: 4.5,
    reviews: 436,
    duration: "1 Hour",
    price: 123450.0,
    time: "10:30 AM on Mar 19",
    included: "Admission to the Empire State Building",
    dayNumber: 1,
    category: ""
  },
  onClose,
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
              width={300}
              height={300}
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
        <img
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

interface CategoryOption {
  name: string;
  label: string;
  icon: React.ElementType;
}

interface FiltersState {
  priceRange: [number, number];
  rating: number;
  duration: string;
  category: string;
}

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 500000],
    rating: 0,
    duration: "",
    category: ""
  });

  const sampleActivities: Activity[] = [
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
      dayNumber: 1,
      category: ""
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
      dayNumber: 2,
      category: ""
    }
  ];

  const categories: CategoryOption[] = [
    { name: "all", label: "All Activities", icon: Compass },
    { name: "Museums", label: "Museums", icon: Building },
    { name: "Entertainment", label: "Entertainment", icon: Music },
    { name: "Tours", label: "Tours", icon: Camera },
    { name: "Food & Drink", label: "Food & Drink", icon: Utensils },
    { name: "Architecture", label: "Architecture", icon: Building },
    { name: "Water Activities", label: "Water Activities", icon: Waves }
  ];

  useEffect(() => {
    setTimeout(() => {
      setActivities(sampleActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToItinerary = (activity: Activity): void => {
    if (!itinerary.find((item) => item.name === activity.name)) {
      setItinerary((prevItinerary) => [...prevItinerary, activity]);
    }
  };

  const filteredActivities: Activity[] = activities.filter((activity) => {
    const matchesSearch =
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || activity.category === selectedCategory;
    const matchesPrice =
      activity.price >= filters.priceRange[0] &&
      activity.price <= filters.priceRange[1];
    const matchesRating = activity.rating >= filters.rating;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-96"></div>
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
                Discover Amazing Activities
              </h1>
              <p className="text-gray-600">
                Explore unforgettable experiences and add them to your travel
                itinerary
              </p>
            </div>

            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities, attractions..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6 overflow-x-auto pb-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
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
                {filteredActivities.length} activities found
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {!searchQuery && selectedCategory === "all" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Featured Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.name} className="relative">
                  <ActivitiesCard
                    activity={activity}
                    viewMode="grid"
                    onDirections={() =>
                      console.log("Directions clicked for:", activity.name)
                    }
                    onActivityDetails={() =>
                      console.log(
                        "Activity details clicked for:",
                        activity.name
                      )
                    }
                    onPriceDetails={() =>
                      console.log("Price details clicked for:", activity.name)
                    }
                    onEditDetails={() =>
                      console.log("Edit details clicked for:", activity.name)
                    }
                    onSeeMore={() =>
                      console.log("See more clicked for:", activity.name)
                    }
                    onAddToItinerary={handleAddToItinerary}
                    isAddedToItinerary={itinerary.some(
                      (item) => item.name === activity.name
                    )}
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {selectedCategory === "all"
              ? "All Activities"
              : `${selectedCategory} Activities`}
          </h2>
        </div>

        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredActivities.map((activity) => (
            <ActivitiesCard
              key={activity.name}
              activity={activity}
              viewMode={viewMode}
              onDirections={() =>
                console.log("Directions clicked for:", activity.name)
              }
              onActivityDetails={() =>
                console.log("Activity details clicked for:", activity.name)
              }
              onPriceDetails={() =>
                console.log("Price details clicked for:", activity.name)
              }
              onEditDetails={() =>
                console.log("Edit details clicked for:", activity.name)
              }
              onSeeMore={() =>
                console.log("See more clicked for:", activity.name)
              }
              onAddToItinerary={handleAddToItinerary}
              isAddedToItinerary={itinerary.some(
                (item) => item.name === activity.name
              )}
            />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Compass className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No activities found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() =>
                setFilters({
                  priceRange: [0, 500000],
                  rating: 0,
                  duration: "",
                  category: ""
                })
              }
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
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

export default ActivitiesPage;
