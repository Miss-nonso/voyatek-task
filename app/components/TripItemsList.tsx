"use client";

import React, { useState, useEffect } from "react";
import FlightCard from "../components/cards/FlightCard";
import HotelCard from "../components/cards/HotelCard";
import ActivityCard from "../components/cards/ActivityCard";
import { Flight, Hotel, Activity } from "../../lib/interface";

export const TripItemsList = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedFlights = localStorage.getItem("flightItinerary");
        if (savedFlights) {
          setFlights(JSON.parse(savedFlights));
        }

        const savedHotels = localStorage.getItem("hotelItinerary");
        if (savedHotels) {
          setHotels(JSON.parse(savedHotels));
        }

        const savedActivities = localStorage.getItem("activityItinerary");
        if (savedActivities) {
          setActivities(JSON.parse(savedActivities));
        }
      } catch (e) {
        console.error("Failed to load itinerary from local storage", e);
      }
    }
  }, []);

  return (
    <div className="p-6 grid gap-8">
      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Flights</h3>
        <div className="grid gap-4 w-full">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <FlightCard key={index} {...flight} />
            ))
          ) : (
            <p className="text-gray-600">No flights added to itinerary.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Hotels</h3>
        <div className="grid gap-4">
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => <HotelCard key={index} {...hotel} />)
          ) : (
            <p className="text-gray-600">No hotels added to itinerary.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Activities</h3>
        <div className="grid gap-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <ActivityCard
                key={index}
                activity={activity}
                onDirections={() =>
                  console.log("Directions for", activity.name)
                }
                onActivityDetails={() =>
                  console.log("Activity details for", activity.name)
                }
                onPriceDetails={() =>
                  console.log("Price details for", activity.name)
                }
                onEditDetails={() =>
                  console.log("Edit details for", activity.name)
                }
                onSeeMore={() => console.log("See more for", activity.name)}
              />
            ))
          ) : (
            <p className="text-gray-600">No activities added to itinerary.</p>
          )}
        </div>
      </section>
    </div>
  );
};
