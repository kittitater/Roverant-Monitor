"use client";

import React, { useState } from "react";
import Layout from "@/components/main/AppLayout";
import { FaMapMarkedAlt } from "react-icons/fa";

// (If you want a real interactive map, install react-leaflet or mapbox-gl, etc. For now, we do a mock.)
export default function TrackingMapPage() {
  // Mock location data
  const [currentLocation] = useState({ lat: 13.73, lng: 100.51 }); // e.g., Bangkok

  // Mock route or visited points
  const routePoints = [
    { id: 1, lat: 13.7301, lng: 100.5103, time: "09:05" },
    { id: 2, lat: 13.7305, lng: 100.5110, time: "09:15" },
    { id: 3, lat: 13.7310, lng: 100.5115, time: "09:30" },
  ];

  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Tracking Map (Mock)
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Displays the rover’s current location and patrol route.
          </p>
        </section>

        {/* Map Placeholder */}
        <section className="bg-white dark:bg-gray-900 p-4 rounded shadow h-96 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <FaMapMarkedAlt className="text-5xl mb-2" />
            <p>
              [ Map Placeholder ]  
              Current Position: ({currentLocation.lat}, {currentLocation.lng})
            </p>
          </div>
        </section>

        {/* Route Points Table */}
        <section className="bg-white dark:bg-gray-900 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Route History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 text-left">Time</th>
                  <th className="px-3 py-2 text-left">Latitude</th>
                  <th className="px-3 py-2 text-left">Longitude</th>
                </tr>
              </thead>
              <tbody>
                {routePoints.map((point) => (
                  <tr
                    key={point.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{point.time}</td>
                    <td className="px-3 py-2">{point.lat}</td>
                    <td className="px-3 py-2">{point.lng}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </Layout>
  );
}
