// "use client";

// import Layout from "@/components/main/AppLayout";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function SelectRover() {
//     const [rovers, setRovers] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchRovers = async () => {
//             try {
//                 const response = await axios.get("https://api-roverant.mooo.com/rover/my-rovers");
//                 // Assuming the API returns the data directly
//                 setRovers(response.data);
//             } catch (err) {
//                 // Axios wraps errors, so you might want to check err.response
//                 if (err.response && err.response.data && err.response.data.error) {
//                     setError(err.response.data.error);
//                 } else {
//                     setError(err.message);
//                 }
//             }
//         };

//         fetchRovers();
//     }, []);

//     function handleSelect(rover) {
//         setSelected(rover);
//     }

//     return (
//         <Layout>
//             <main className="pt-[85px]">
//                 <div className="max-w-[600px] justify-items-center min-h-screen mx-auto p-5">
//                     <h1 className="text-2xl mb-3 font-semibold">My Rover</h1>
//                     {error && <p style={{ color: "red" }}>Error: {error}</p>}
//                     <ul>
//                         {rovers.map((rover) => (
//                             <li key={rover.robot_id} className="mb-2 ">
//                                 <button onClick={() => handleSelect(rover)} className="text-left w-full p-2 ring-2 ring-black hover:bg-black hover:text-white rounded-xl">
//                                     {rover.name} ({rover.model}) / {rover.rover_id}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>

//                     {selected && (
//                         <div className="mt-16">
//                             <h3>Selected Rover</h3>
//                             <p>rover_id: {selected.rover_id}</p>
//                             <p>registration_token: {selected.registration_token}</p>
//                             <p>
//                                 <a
//                                     href={`/live-camera?rover_id=${selected.rover_id}&token=${selected.registration_token}`}
//                                 >
//                                     Go to live camera
//                                 </a>
//                             </p>
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </Layout>
//     );
// }






"use client";

import React, { useState } from "react";
import Layout from "@/components/main/AppLayout";
import {
  FaBatteryThreeQuarters,
  FaTachometerAlt,
  FaCompass,
  FaThermometerHalf,
  FaRobot,
} from "react-icons/fa";

export default function MyRoverPage() {
  // Mock details
  const [battery, setBattery] = useState(99.99);
  const [speed, setSpeed] = useState(3.2);
  const [orientation, setOrientation] = useState(45);
  const [temperature, setTemperature] = useState(26.5);

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
      <main className="pt-[110px] mx-auto max-w-7xl px-4 py-6 space-y-8">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Rover</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Detailed information about your rover’s hardware and sensors.
          </p>
        </section>

        {/* Rover Status */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Battery */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaBatteryThreeQuarters className="text-3xl text-green-500 mb-2" />
            <p className="text-2xl font-bold">{battery}%</p>
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
            <p className="text-sm text-gray-500 dark:text-gray-400">Orientation</p>
          </div>
          {/* Temperature */}
          <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-2xl">
            <FaThermometerHalf className="text-3xl text-red-500 mb-2" />
            <p className="text-2xl font-bold">{temperature.toFixed(1)}°C</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
          </div>
        </section>

        {/* Sensors */}
        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Sensor Status
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
                    sensor.status === "Active" ? "text-green-500" : "text-red-500"
                  }
                >
                  {sensor.status}
                </span>
              </li>
            ))}
          </ul>
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