"use client";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { ItineraryOverview } from "./components/ItineraryOverview";
import { TripItemsList } from "./components/TripItemsList";
import HeaderBanner from "./components/HeaderBanner";
import TripDetailsCard from "./components/cards/TripDetailsCard";
import ActionCard from "./components/cards/ActionCard";

export default function ItineraryPage() {
  return (
    <main className="flex h-screen w-full overflow-hidden bg-[#F5F7FA] text-[#1F1F1F]">
      {/* Sidebar */}
      <aside className="hidden md:block md:w-64 lg:w-72 h-full bg-white border-r border-gray-200 px-4">
        <Sidebar />
      </aside>

      {/* Main content */}
      <section className="flex flex-col flex-1 w-full h-full">
        {/* Topbar */}
        <div className="h-[64px] w-full border-b border-gray-200 bg-white px-4 md:px-6 flex items-center">
          <Navbar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
          {/* Itinerary Overview Section */}
          <div className="min-h-screen bg-gray-50 pb-10">
            <HeaderBanner />
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <ActionCard
                  title="Activities"
                  description="Build, personalize, and optimize your itineraries with our trip planner."
                  buttonText="Add Activities"
                  buttonColorClass="bg-blue-900" // Dark blue as per image
                />
                <ActionCard
                  title="Hotels"
                  description="Build, personalize, and optimize your itineraries with our trip planner."
                  buttonText="Add Hotels"
                  buttonColorClass="bg-blue-700" // A bit lighter blue
                />
                <ActionCard
                  title="Flights"
                  description="Build, personalize, and optimize your itineraries with our trip planner."
                  buttonText="Add Flights"
                  buttonColorClass="bg-blue-500" // Bright blue
                />
              </div>
            </div>
          </div>
          <ItineraryOverview />

          {/* Trip Items List */}
          <div className="mt-8">
            <TripItemsList />
          </div>
        </div>
      </section>
    </main>
  );
}
