import React from "react";
import { FaPlaneDeparture, FaPlaneArrival, FaPlane } from "react-icons/fa";

export default function PlaneCard({ flight }) {
  if (!flight) {
    return <div>Uçuş bilgileri yükleniyor...</div>;
  }

  // Uçuş bilgilerini çıkartıyoruz
  const {
    flightNumber,
    estimatedLandingTime,
    actualLandingTime,
    aircraftType,
    route,
    baggageClaim,
    flightDirection,
    prefixIATA,
    prefixICAO,
    isOperationalFlight,
  } = flight;

  return (
    <div className="mb-4">
      <li className="bg-white hover:bg-[#f6f6ff] flex-col border-gray-200 flex flex-col md:flex-col items-center rounded-lg shadow-sm hover:shadow-md transition-shadow transform-gpu" style={{ borderRadius: "16px 16px 16px 0" }}>
        {/* Left: Departure Information */}
        <div className="text-xl font-semibold text-gray-800 p-6 w-full flex justify-start items-start">
              {route.destinations[0]} - {route.destinations[1] || 'Belirtilmemiş'}
        </div>
        <div className="flex w-full">
          <div className="flex-1 px-6 border-r-2 border-gray-200 text-start">
            <div className="flex items-center justify-start mt-2 text-gray-500">
              <FaPlaneDeparture className="mr-2" />
              <span className="text-sm">Departure</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {new Date(flight.scheduleDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Flight No: {prefixIATA} {flightNumber}
            </div>
          </div>

          {/* Middle: Airline and Flight Information */}
          <div className="flex-1 p-4 text-center flex flex-col justify-center items-center">

            <div className="flex items-center justify-center my-2">
              <FaPlane className="text-purple-500" size={20} />
            </div>
            <div className="text-gray-600 text-sm">
              {aircraftType.iataMain} {aircraftType.iataSub}
            </div>
          </div>

          {/* Right: Arrival Information */}
          <div className="flex-1 p-4 border-l-2 border-gray-200 ">
            <div className="flex items-start justify-start mt-2 text-gray-500">
              <FaPlaneArrival className="mr-2" />
              <span className="text-sm">Arrival</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mt-1">
              {new Date(estimatedLandingTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Expected on Belt: {new Date(flight.expectedTimeOnBelt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Bottom: Price and Button */}
        <div className="flex w-full justify-between items-between">
          <div className="font-semibold mb-2 pl-6 flex flex-col">
            <span className="p-0 m-0 text-xl text-purple-700">Price: ${flight.price || 'Belirtilmemiş'}</span>
            <span className="p-0 m-0 text-md text-black">Round Trip</span>
          </div>
          <button style={{ borderTopLeftRadius: "16px", borderBottomRightRadius: "16px" }} className="bg-purple-600 text-white py-6 px-8 text-md shadow-lg hover:bg-purple-800 bg-purple-900 transition duration-300">
            Book Flight
          </button>
        </div>
      </li>
      <button className="text-purple-800 py-4 px-5 text-md underline font-bold shadow-lg hover:bg-purple-800 hover:text-white bg-purple-300 transition duration-300" style={{ borderRadius: "0px 0px 12px 12px" }}>
        Check the details
      </button>
    </div>
  );
}
