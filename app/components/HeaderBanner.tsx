import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Sun,
  Plane,
  Building,
  Activity,
  MoreHorizontal,
  Users,
  Copy
} from "lucide-react";

const TravelDashboard = () => {
  const [activeTab, setActiveTab] = useState("activities");

  const tripData = {
    title: "Bahamas Family Trip",
    location: "New York, United States of America - Solo Trip",
    dates: "23 March 2024 - 31 March 2024",
    weather: "30°",
    tabs: [
      {
        id: "activities",
        title: "Activities",
        description:
          "Build unforgettable and memorable tour experiences with your family.",
        buttonText: "Add Activities",
        bgColor: "bg-slate-800",
        textColor: "text-white"
      },
      {
        id: "hotels",
        title: "Hotels",
        description:
          "Book personalized and optimize your experience with our trip planner.",
        buttonText: "Add Hotels",
        bgColor: "bg-gray-600",
        textColor: "text-white"
      },
      {
        id: "flights",
        title: "Flights",
        description:
          "Book personalized and optimize your experience with our trip planner.",
        buttonText: "Add Flights",
        bgColor: "bg-blue-600",
        textColor: "text-white"
      }
    ]
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAddClick = (type: string) => {
    alert(`Add ${type} clicked`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="w-full mx-4  bg-white shadow-lg overflow-hidden">
        {/* Header Section with Beach Scene */}
        <div className="relative h-24 bg-gradient-to-r from-sky-300 via-sky-200 to-sky-100 overflow-hidden">
          {/* Background clouds */}
          <div className="absolute inset-0">
            <div className="absolute top-2 left-20 w-12 h-6 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-1 left-32 w-8 h-4 bg-white rounded-full opacity-70"></div>
            <div className="absolute top-3 right-24 w-10 h-5 bg-white rounded-full opacity-75"></div>
            <div className="absolute top-1 right-12 w-6 h-3 bg-white rounded-full opacity-80"></div>
          </div>

          {/* Palm tree */}
          <div className="absolute bottom-0 left-8">
            <div className="relative">
              {/* Tree trunk */}
              <div className="w-2 h-8 bg-amber-800 rounded-sm"></div>
              {/* Palm fronds */}
              <div className="absolute -top-2 -left-2">
                <div className="w-6 h-3 bg-green-600 rounded-full transform -rotate-12 origin-bottom"></div>
                <div className="w-5 h-2 bg-green-600 rounded-full transform rotate-12 origin-bottom absolute top-0 left-1"></div>
                <div className="w-4 h-2 bg-green-600 rounded-full transform -rotate-45 origin-bottom absolute -top-1 left-2"></div>
                <div className="w-4 h-2 bg-green-600 rounded-full transform rotate-45 origin-bottom absolute -top-1"></div>
              </div>
            </div>
          </div>

          {/* Sun */}
          <div className="absolute top-3 right-8">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sun className="w-5 h-5 text-yellow-600" />
            </div>
          </div>

          {/* Back button */}
          <button className="absolute top-4 left-4 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        {/* Trip Information Section */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Date badge */}
              <div className="flex items-center mb-3">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600 font-medium">
                  {tripData.dates}
                </span>
              </div>

              {/* Trip title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {tripData.title}
              </h1>

              {/* Location */}
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{tripData.location}</span>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2 ml-4">
              {/* Share/Copy button */}
              <button className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                <Copy className="w-4 h-4 text-blue-600" />
              </button>

              {/* Profile avatar */}
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>

              {/* More options */}
              <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Cards Section */}
        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tripData.tabs.map((tab, index) => {
              const IconComponent =
                tab.id === "activities"
                  ? Activity
                  : tab.id === "hotels"
                  ? Building
                  : Plane;

              return (
                <div
                  key={tab.id}
                  className={`${tab.bgColor} ${tab.textColor} rounded-2xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-lg`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-3">{tab.title}</h3>

                  {/* Description */}
                  <p className="text-sm opacity-90 mb-6 leading-relaxed">
                    {tab.description}
                  </p>

                  {/* Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddClick(tab.title.toLowerCase());
                    }}
                    className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg py-3 px-4 text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {tab.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Tab Content */}
        <div className="px-6 pb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {tripData.tabs.find((tab) => tab.id === activeTab)?.title}{" "}
              Planning
            </h4>
            <p className="text-gray-600 text-sm">
              Start planning your {activeTab} for the Bahamas Family Trip.
              {activeTab === "activities" &&
                " Discover exciting activities and experiences for your family."}
              {activeTab === "hotels" &&
                " Find the perfect accommodation for your stay."}
              {activeTab === "flights" &&
                " Book your flights and manage your travel itinerary."}
            </p>

            <div className="mt-4 flex gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Get Started
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .grid-cols-1.md\\:grid-cols-3 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default TravelDashboard;
