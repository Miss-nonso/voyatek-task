// import { X } from "lucide-react";
// import Image from "next/image";

// export const FlightCard = () => {
//   return (
//     <div className="flex items-start justify-between bg-muted p-4 rounded-md shadow-sm">
//       <div className="flex gap-4">
//         <Image src="/airline-logo.png" alt="Airline" width={40} height={40} />
//         <div>
//           <h4 className="font-semibold">Lufthansa</h4>
//           <p className="text-sm text-muted-foreground">
//             8:00 AM - 12:45 PM • 5h 45m
//           </p>
//           <p className="text-sm text-muted-foreground">LAX ➝ JFK</p>
//           <div className="text-xs mt-1 space-x-2">
//             <span className="bg-white px-2 py-1 rounded border">1 Stop</span>
//             <span className="bg-white px-2 py-1 rounded border">
//               Baggage Included
//             </span>
//           </div>
//         </div>
//       </div>
//       <button className="text-destructive hover:text-red-700">
//         <X size={16} />
//       </button>
//     </div>
//   );
// };

import React from "react";
import { cn } from "lib/utils";

// Helper component for the small info tags like "First Class"
const InfoTag = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10",
      className
    )}
  >
    {children}
  </span>
);

// Helper component for the facility icons and text
const FacilityItem = ({
  icon: Icon,
  text
}: {
  icon: React.ElementType;
  text: string;
}) => (
  <div className="flex items-center text-gray-700 text-sm">
    <Icon className="h-4 w-4 mr-1 text-gray-500" />
    <span>{text}</span>
  </div>
);

// Lucide React icons (assuming they are available or you can use inline SVGs)
// You would typically import these from 'lucide-react'
const PlaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-plane"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 22 5 22 3.5a1.44 1.44 0 0 0-2.5-1C19 2 18 3 16.5 4.5L13 8 4.8 6.2c-.4-.1-.8.04-1.1.3L3 7l.5 6v.5c0 .3.1.6.3.9l.8.8c.3.3.6.4.9.3L20.5 13c.3.1.6.04.9-.2l.5-.5c.2-.2.1-.5-.1-.7L17.8 19.2Z"></path>
    <path d="M15 10l-4 4"></path>
    <path d="m19 15-4 4"></path>
  </svg>
);

const LuggageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-luggage"
  >
    <path d="M6 20h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"></path>
    <path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
    <path d="M20 13H4"></path>
  </svg>
);

const TvIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-tv"
  >
    <rect width="20" height="15" x="2" y="7" rx="2" ry="2"></rect>
    <polyline points="17 2 12 7 7 2"></polyline>
  </svg>
);

const UtensilsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-utensils"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
    <path d="M7 2v20"></path>
    <path d="M21 15V2l-4 4h4"></path>
    <path d="M17 15v7"></path>
  </svg>
);

const UsbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-usb"
  >
    <path d="M10 7V2.5a.5.5 0 0 1 .5-.5H14a.5.5 0 0 1 .5.5V7"></path>
    <path d="M13 10v4"></path>
    <path d="M11 14v4"></path>
    <path d="M7 10v4"></path>
    <path d="M17 10v4"></path>
    <path d="M12 22a4 4 0 0 0 4-4v-2H8v2a4 4 0 0 0 4 4Z"></path>
  </svg>
);

interface FlightCardProps {
  airlineName: string;
  flightNumber: string;
  flightClass: string;
  departureTime: string;
  departureDate: string;
  departureAirportCode: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalAirportCode: string;
  duration: string;
  stops: string;
  price: number;
  baggageWeight: string;
  cabinBaggageWeight: string;
  hasEntertainment: boolean;
  hasMeal: boolean;
  hasUsbPort: boolean;
  airlineLogoSrc?: string; // Optional prop for airline logo
}

const FlightCard: React.FC<FlightCardProps> = ({
  airlineName,
  flightNumber,
  flightClass,
  departureTime,
  departureDate,
  departureAirportCode,
  arrivalTime,
  arrivalDate,
  arrivalAirportCode,
  duration,
  stops,
  price,
  baggageWeight,
  cabinBaggageWeight,
  hasEntertainment,
  hasMeal,
  hasUsbPort,
  airlineLogoSrc = "https://placehold.co/24x24/0000FF/FFFFFF?text=AA"
}) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border w-full border-gray-100 mx-6 mx-auto my-8 font-inter">
      {/* Close Button */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Top Section */}
      <div className="p-6 border-b border-gray-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        {/* Airline Info */}
        <div className="flex items-center col-span-1 md:col-span-1">
          <img
            src={airlineLogoSrc}
            alt={`${airlineName} logo`}
            className="w-6 h-6 mr-2 object-contain"
          />
          <div>
            <p className="font-semibold text-gray-900 text-base">
              {airlineName}
            </p>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="text-gray-600 text-sm">{flightNumber}</span>
              <InfoTag>{flightClass}</InfoTag>
            </div>
          </div>
        </div>

        {/* Flight Times & Duration */}
        <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Departure */}
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="font-bold text-gray-900 text-xl">{departureTime}</p>
            <p className="text-gray-600 text-sm">{departureDate}</p>
            <p className="font-medium text-gray-800 text-sm mt-1">
              {departureAirportCode}
            </p>
          </div>

          {/* Duration Line */}
          <div className="flex-1 flex items-center justify-center mx-4 w-full md:w-auto">
            <PlaneIcon className="h-5 w-5 text-gray-400 rotate-90 md:rotate-0 mr-2" />{" "}
            {/* Rotated for vertical display on small screens */}
            <div className="flex flex-col items-center flex-grow">
              <span className="text-gray-600 text-sm mb-1">{duration}</span>
              <div className="w-full h-1 bg-gray-200 rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-blue-500 rounded-full"></div>{" "}
                {/* Represents progress */}
              </div>
              <span className="text-gray-600 text-sm mt-1">{stops}</span>
            </div>
            <PlaneIcon className="h-5 w-5 text-gray-400 -rotate-90 md:rotate-180 ml-2" />{" "}
            {/* Rotated for vertical display on small screens */}
          </div>

          {/* Arrival */}
          <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
            <p className="font-bold text-gray-900 text-xl">{arrivalTime}</p>
            <p className="text-gray-600 text-sm">{arrivalDate}</p>
            <p className="font-medium text-gray-800 text-sm mt-1">
              {arrivalAirportCode}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-1 md:col-span-1 flex justify-center md:justify-end">
          <p className="font-bold text-gray-900 text-2xl">
            ₦ {price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Facilities Section */}
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <p className="text-gray-700 font-medium mb-3 text-sm">Facilities:</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <FacilityItem
            icon={LuggageIcon}
            text={`Baggage: ${baggageWeight}, Cabin Baggage: ${cabinBaggageWeight}`}
          />
          {hasEntertainment && (
            <FacilityItem icon={TvIcon} text="In flight entertainment" />
          )}
          {hasMeal && (
            <FacilityItem icon={UtensilsIcon} text="In flight meal" />
          )}
          {hasUsbPort && <FacilityItem icon={UsbIcon} text="USB Port" />}
        </div>
      </div>

      {/* Details Links */}
      <div className="p-6 flex justify-between items-center">
        <div className="flex space-x-6">
          <button className="text-blue-600 font-medium text-sm hover:underline">
            Flight details
          </button>
          <button className="text-blue-600 font-medium text-sm hover:underline">
            Price details
          </button>
        </div>
        <button className="text-blue-600 font-medium text-sm hover:underline">
          Edit details
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
