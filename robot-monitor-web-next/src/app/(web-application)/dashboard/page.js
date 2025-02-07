"use client";

import React from "react";
import Layout from "@/components/main/AppLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  FaBatteryThreeQuarters,
  FaTachometerAlt,
  FaCompass,
  FaThermometerHalf,
} from "react-icons/fa";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  // Mock telemetries (Dashboard-level quick stats)
  const batteryLevel = 65;
  const speed = 2.8; // km/h
  const orientation = 78; // degrees
  const temperature = 27.3; // Celsius

  // Mock line chart data: e.g., temperature over time
  const temperatureChartData = {
    labels: ["10:00", "10:05", "10:10", "10:15", "10:20", "10:25"],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [26.5, 26.8, 27.1, 27.2, 27.0, 27.3],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  // Mock bar chart data: e.g., distance traveled daily
  const distanceChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Distance (km)",
        data: [0.5, 1.2, 2.0, 1.8, 2.5, 3.1, 3.8],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  // Mock logs
  const logs = [
    { id: 1, time: "09:00", message: "Rover system booted." },
    { id: 2, time: "09:05", message: "Battery at 80%." },
    { id: 3, time: "09:20", message: "Detecting minor obstacle." },
  ];

  return (
    <Layout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            RoverAnt Dashboard (Mock)
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            High-level overview of rover’s status and activity.
          </p>
        </section>

        {/* Stats row */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          {/* Battery */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow">
            <FaBatteryThreeQuarters className="text-3xl text-green-500 mb-2" />
            <p className="text-2xl font-bold">{batteryLevel}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Battery</p>
          </div>
          {/* Speed */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow">
            <FaTachometerAlt className="text-3xl text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{speed.toFixed(1)} km/h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
          </div>
          {/* Orientation */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow">
            <FaCompass className="text-3xl text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{orientation}°</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Orientation</p>
          </div>
          {/* Temperature */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded shadow">
            <FaThermometerHalf className="text-3xl text-red-500 mb-2" />
            <p className="text-2xl font-bold">{temperature.toFixed(1)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Temperature line chart */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Temperature Over Time
            </h2>
            <div className="h-64">
              <Line data={temperatureChartData} />
            </div>
          </div>
          {/* Distance bar chart */}
          <div className="bg-white dark:bg-gray-900 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Weekly Distance
            </h2>
            <div className="h-64">
              <Bar data={distanceChartData} />
            </div>
          </div>
        </section>

        {/* Logs */}
        <section className="bg-white dark:bg-gray-900 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Events
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {log.time}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {log.message}
                    </td>
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
