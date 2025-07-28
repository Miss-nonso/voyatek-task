import React, { useState, useEffect } from "react";
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
  SlidersHorizontal,
  Grid3X3,
  List,
  Plus,
  Check,
  Calendar,
  Tag,
  Heart,
  Share2,
  ChevronDown,
  Compass,
  Camera,
  Mountain,
  Building,
  Utensils,
  Music,
  ShoppingBag,
  Waves
} from "lucide-react";

// Enhanced ActivitiesCard component
const ActivitiesCard = ({
  activity,
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

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

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 mb-4">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative w-full md:w-80 h-48 md:h-auto flex-shrink-0">
            <img
              src={activity.images[currentImageIndex]}
              alt={activity.name}
              className="w-full h-full object-cover"
            />

            {/* Heart and Share buttons */}
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

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3">
              <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {activity.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              {/* Left Content */}
              <div className="flex-1 pr-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                    {activity.name}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">
                  {activity.description}
                </p>

                {/* Rating, Duration, and Directions */}
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

                {/* What's Included */}
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

              {/* Right Content - Price Section */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatPrice(activity.price)}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  {activity.time}
                </div>
                <div className="text-sm text-gray-500 mb-4">Per person</div>

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

  // Grid view (default)
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={activity.images[currentImageIndex]}
          alt={activity.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Heart and Share buttons */}
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

        {/* Image Navigation */}
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

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
            {activity.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {activity.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {activity.description}
        </p>

        {/* Rating and Duration */}
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

        {/* What's Included */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">What's included:</p>
          <p className="text-sm text-blue-500 line-clamp-1">
            {activity.included}
          </p>
        </div>

        {/* Price and Action */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(activity.price)}
            </div>
            <div className="text-xs text-gray-500">Per person</div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

// Main Activities Page Component
const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [itinerary, setItinerary] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    rating: 0,
    duration: "",
    category: ""
  });

  // Sample activities data - Replace with API call
  const sampleActivities = [
    {
      id: 1,
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & 1 The modern restaurant",
      category: "Museums",
      images: [
        "https://images.unsplash.com/photo-1554907984-15263bfd63bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
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
      id: 2,
      name: "Broadway Show Experience",
      description:
        "World-class theatrical performances in the heart of New York's theater district. Premium seating with pre-show dining options.",
      category: "Entertainment",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1594736797933-d0b22d2d7d53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.8,
      reviews: 892,
      duration: "2.5 Hours",
      price: 185000.0,
      time: "7:30 PM on Mar 20",
      included: "Orchestra seating & program guide",
      dayNumber: 2
    },
    {
      id: 3,
      name: "Central Park Walking Tour",
      description:
        "Explore NYC's most famous park with a knowledgeable guide. Discover hidden gems, historical landmarks, and beautiful landscapes.",
      category: "Tours",
      images: [
        "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.6,
      reviews: 654,
      duration: "3 Hours",
      price: 75000.0,
      time: "2:00 PM on Mar 21",
      included: "Professional guide & refreshments",
      dayNumber: 3
    },
    {
      id: 4,
      name: "Food & Wine Tasting",
      description:
        "Indulge in a curated selection of local cuisine and fine wines. Learn about culinary traditions from expert sommeliers.",
      category: "Food & Drink",
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.7,
      reviews: 324,
      duration: "2 Hours",
      price: 95000.0,
      time: "6:00 PM on Mar 22",
      included: "Wine tastings & gourmet appetizers",
      dayNumber: 4
    },
    {
      id: 5,
      name: "Architectural Landmarks Tour",
      description:
        "Marvel at iconic buildings and architectural marvels. Professional photography opportunities at each landmark.",
      category: "Architecture",
      images: [
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.4,
      reviews: 567,
      duration: "4 Hours",
      price: 135000.0,
      time: "9:00 AM on Mar 23",
      included: "Professional guide & photo session",
      dayNumber: 5
    },
    {
      id: 6,
      name: "Harbor Cruise & Sunset",
      description:
        "Relaxing cruise with stunning city skyline views. Perfect for couples with complimentary champagne service.",
      category: "Water Activities",
      images: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1571406252267-79bb6b69c6d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.9,
      reviews: 789,
      duration: "2.5 Hours",
      price: 165000.0,
      time: "5:30 PM on Mar 24",
      included: "Cruise ticket & complimentary drinks",
      dayNumber: 6
    }
  ];

  const categories = [
    { name: "all", label: "All Activities", icon: Compass },
    { name: "Museums", label: "Museums", icon: Building },
    { name: "Entertainment", label: "Entertainment", icon: Music },
    { name: "Tours", label: "Tours", icon: Camera },
    { name: "Food & Drink", label: "Food & Drink", icon: Utensils },
    { name: "Architecture", label: "Architecture", icon: Building },
    { name: "Water Activities", label: "Water Activities", icon: Waves }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActivities(sampleActivities);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddToItinerary = (activity) => {
    if (!itinerary.find((item) => item.id === activity.id)) {
      setItinerary([...itinerary, activity]);
    }
  };

  const filteredActivities = activities.filter((activity) => {
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
      {/* Header */}
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

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search activities, attractions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Filters */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Featured Section */}
        {!searchQuery && selectedCategory === "all" && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Featured Activities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.slice(0, 3).map((activity) => (
                <div key={activity.id} className="relative">
                  <ActivitiesCard
                    activity={activity}
                    viewMode="grid"
                    onDirections={() => alert("Directions clicked")}
                    onActivityDetails={() => alert("Activity details clicked")}
                    onPriceDetails={() => alert("Price details clicked")}
                    onEditDetails={() => alert("Edit details clicked")}
                    onSeeMore={() => alert("See more clicked")}
                    onAddToItinerary={handleAddToItinerary}
                    isAddedToItinerary={itinerary.some(
                      (item) => item.id === activity.id
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

        {/* All Activities */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {selectedCategory === "all"
              ? "All Activities"
              : `${selectedCategory} Activities`}
          </h2>
        </div>

        {/* Activities Grid/List */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }`}
        >
          {filteredActivities.map((activity) => (
            <ActivitiesCard
              key={activity.id}
              activity={activity}
              viewMode={viewMode}
              onDirections={() => alert("Directions clicked")}
              onActivityDetails={() => alert("Activity details clicked")}
              onPriceDetails={() => alert("Price details clicked")}
              onEditDetails={() => alert("Edit details clicked")}
              onSeeMore={() => alert("See more clicked")}
              onAddToItinerary={handleAddToItinerary}
              isAddedToItinerary={itinerary.some(
                (item) => item.id === activity.id
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
          </div>
        )}
      </div>

      {/* Floating Itinerary Counter */}
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
