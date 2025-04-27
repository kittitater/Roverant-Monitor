
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
  FaRobot,
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

export default function Dashboard() {
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

  // Mock sensor statuses
  const sensors = [
    { id: 1, name: "LIDAR", status: "Active" },
    { id: 2, name: "Camera Front", status: "Active" },
    { id: 3, name: "Camera Rear", status: "Inactive" },
    { id: 4, name: "Ultrasonic", status: "Active" },
  ];

  // Mock system logs or statuses
  const systemLogs = [
    { id: 1, timestamp: "09:00", detail: "Power On" },
    { id: 2, timestamp: "09:05", detail: "Self-check OK" },
    { id: 3, timestamp: "09:15", detail: "Calibration complete" },
  ];

  return (
    <Layout>
      <main className="pt-[95px] mx-auto max-w-screen px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        {/* <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Overview of rover’s status and activity.
          </p>
        </section> */}

        {/* Stats row */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          {/* Battery */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaBatteryThreeQuarters className="text-3xl text-green-500 mb-2" />
            <p className="text-2xl font-bold">{batteryLevel}%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Battery</p>
          </div>
          {/* Speed */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaTachometerAlt className="text-3xl text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{speed.toFixed(1)} km/h</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Speed</p>
          </div>
          {/* Orientation */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaCompass className="text-3xl text-purple-500 mb-2" />
            <p className="text-2xl font-bold">{orientation}°</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Orientation
            </p>
          </div>
          {/* Temperature */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaThermometerHalf className="text-3xl text-red-500 mb-2" />
            <p className="text-2xl font-bold">{temperature.toFixed(1)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Temperature
            </p>
          </div>
        </section>

        {/* Sensors */}
        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Status
          </h2>
          <ul className="list-inside space-y-2">
            {sensors.map((sensor) => (
              <li key={sensor.id} className="flex items-center space-x-2">
                <FaRobot className="text-gray-500 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {sensor.name}:
                </span>
                <span
                  className={
                    sensor.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {sensor.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Temperature line chart */}
          <div className="bg-white dark:bg-gray-900 p-6 border  border-gray-300 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Temperature Over Time
            </h2>
            <div className="h-64">
              <Line data={temperatureChartData} />
            </div>
          </div>
          {/* Distance bar chart */}
          <div className="bg-white dark:bg-gray-900 p-6 border  border-gray-300 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Weekly Distance
            </h2>
            <div className="h-64">
              <Bar data={distanceChartData} />
            </div>
          </div>
        </section>

        {/* Logs */}
        <section className="bg-white dark:bg-gray-900 p-6 mx-auto  border  border-gray-300 rounded-2xl">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Events
          </h2>
          <div className="overflow-x-auto ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700  ">
              <thead className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
                {logs.map((log) => (
                  <tr className="hover:bg-gray-100" key={log.id}>
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

        {/* System Logs */}
        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            System Logs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 text-left font-medium">Details</th>
                </tr>
              </thead>
              <tbody>
                {systemLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{log.timestamp}</td>
                    <td className="px-3 py-2">{log.detail}</td>
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
