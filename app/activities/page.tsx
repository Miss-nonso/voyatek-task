"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Star,
  Clock,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  ChevronRight,
  Compass,
  Building,
  Utensils,
  Camera,
  Music,
  Waves
} from "lucide-react";
import ActivityCard from "../components/cards/ActivityCard";
import {
  Activity,
  CategoryOption,
  FiltersState,
  CategoryIcon
} from "../../lib/interface";

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Activity[]>(() => {
    if (typeof window !== "undefined") {
      const savedItinerary = localStorage.getItem("activityItinerary");
      try {
        return savedItinerary ? JSON.parse(savedItinerary) : [];
      } catch (e) {
        console.error(
          "Failed to parse activity itinerary from local storage",
          e
        );
        return [];
      }
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filters, setFilters] = useState<FiltersState>({
    priceRange: [0, 500000],
    rating: 0,
    duration: "",
    category: "",
    facilities: [""],
    roomType: ""
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
      category: "Museums"
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
      category: "Entertainment"
    },
    {
      name: "Central Park Bike Tour",
      description:
        "Explore the iconic Central Park on a guided bike tour, covering its famous landmarks and hidden gems.",
      images: [
        "https://images.unsplash.com/photo-1504934067339-a4176461c28f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.7,
      reviews: 550,
      duration: "2 Hours",
      price: 75000.0,
      time: "9:00 AM on Mar 21",
      included: "Bike rental, helmet, and tour guide",
      dayNumber: 3,
      category: "Tours"
    },
    {
      name: "Statue of Liberty & Ellis Island Tour",
      description:
        "Visit two of New York's most historic landmarks. Learn about their significance and enjoy breathtaking views of the Manhattan skyline.",
      images: [
        "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.9,
      reviews: 1200,
      duration: "4 Hours",
      price: 95000.0,
      time: "11:00 AM on Mar 22",
      included: "Ferry tickets, audio guide, and museum access",
      dayNumber: 4,
      category: "Tours"
    },
    {
      name: "Brooklyn Bridge Walking Tour",
      description:
        "A guided walk across the iconic Brooklyn Bridge, offering stunning views of Manhattan and Brooklyn.",
      images: [
        "https://images.unsplash.com/photo-150322032079-781c7b882e38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
      ],
      rating: 4.6,
      reviews: 700,
      duration: "1.5 Hours",
      price: 40000.0,
      time: "3:00 PM on Mar 23",
      included: "Guided tour",
      dayNumber: 5,
      category: "Architecture"
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activityItinerary", JSON.stringify(itinerary));
    }
  }, [itinerary]);

  const handleAddToItinerary = (activity: Activity): void => {
    if (!itinerary.some((item) => item.name === activity.name)) {
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
              const IconComponent = CategoryIcon[category.name];
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
                  <ActivityCard
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
            <ActivityCard
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
                  category: "",
                  facilities: [""],
                  roomType: ""
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
