// src/components/TripDetailsCard.jsx
import React from "react";
import Image from "next/image";

const TripDetailsCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 -mt-16 mx-auto max-w-4xl relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>21 March 2024 &rarr; 21 April 2024</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Bahamas Family Trip
          </h1>
          <p className="text-gray-600">
            New York, United States of America · Solo Trip
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* User avatars - Using placeholders */}
          <Image
            width={300}
            height={300}
            src="./globe.svg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
          <Image
            width={300}
            height={300}
            src="./globe.svg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm -ml-2"
          />
          {/* Settings/Options icon */}
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </div>
        </div>
      </div>
      {/* Placeholder for the blue button and three dots */}
      <div className="absolute top-6 right-6 flex items-center space-x-2">
        <button className="bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </button>
        <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsCard;
