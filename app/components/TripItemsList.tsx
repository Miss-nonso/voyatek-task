import FlightCard from "./cards/FlightCard";
import HotelCardDemo from "./cards/HotelCard";
import ActivityCard from "./cards/ActivityCard";

const flightData = {
  airlineName: "Delta",
  flightNumber: "5",
  flightClass: "overflow-hidden",
  departureTime: "6:00",
  departureDate: "9:00",
  departureAirportCode: "AO90PJK",
  arrivalTime: "2:00",
  arrivalDate: "9.12/2026",
  arrivalAirportCode: "trtFE",
  duration: "30minutes",
  stops: "5",
  price: 800,
  baggageWeight: "4kg",
  cabinBaggageWeight: "7kg",
  hasEntertainment: false,
  hasMeal: true,
  hasUsbPort: false,
  airlineLogoSrc: "https://placehold.co/24x24/0000FF/FFFFFF?text=AA"
};

const mockActivitiesCardData = {
  imageSrc: "./globe.svg",
  title: "string",
  description: "string",
  directionsLink: "string",
  rating: 3,
  reviewsCount: 4,
  duration: "string",
  price: 980,
  time: "string",
  date: "string",
  includedItems: ["one", "two"]
};

export const TripItemsList = () => {
  return (
    <div className="p-6 grid gap-8">
      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Flights</h3>
        <div className="grid gap-4  w-full">
          <FlightCard {...flightData} />
          <FlightCard {...flightData} />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Hotels</h3>
        <div className="grid gap-4">
          <HotelCardDemo />
          <HotelCardDemo />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-2 bg-white">Activities</h3>
        <div className="grid gap-4">
          <ActivityCard />
          <ActivityCard />
        </div>
      </section>
    </div>
  );
};
