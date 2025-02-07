"use client";

import React, { useState } from "react";
// Adjust this import path if your AuthContext is in a different folder
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";

export default function SlamTestPage() {
  const { user } = useAuth(); // We assume user can produce an ID token
  const [mapResponse, setMapResponse] = useState(null);
  const [sensorData, setSensorData] = useState(
    JSON.stringify({ lidar: [0.1, 0.2, 0.5], odom: { x: 0.1, y: 0, theta: 0.05 } }, null, 2)
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Helper to get user's Firebase token
  async function getIdToken() {
    if (!user) throw new Error("No user logged in");
    // If your user object differs, adjust accordingly (e.g. user.getIdToken() or user.token)
    return user.getIdToken();
  }

  // A generic function to call the SLAM endpoints
  async function callSlamEndpoint(endpoint, method, body) {
    try {
      setLoading(true);
      setMessage("");
      setMapResponse(null);

      const token = await getIdToken();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/slam/${endpoint}`;
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Request failed with status ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // Handlers
  async function handleStart() {
    try {
      const data = await callSlamEndpoint("start", "POST");
      setMessage(data.message);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  async function handleStop() {
    try {
      const data = await callSlamEndpoint("stop", "POST");
      setMessage(data.message);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  async function handleSendSensor() {
    try {
      // Parse the text area input
      const bodyObj = JSON.parse(sensorData);
      const data = await callSlamEndpoint("sensor-data", "POST", bodyObj);
      setMessage(data.message);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  async function handleGetMap() {
    try {
      const data = await callSlamEndpoint("map", "GET");
      setMapResponse(data);
      setMessage(data.message || "Map retrieved successfully.");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Test SLAM (JS)</h1>
      <p className="text-gray-600">
        Use the controls below to start/stop SLAM, send LiDAR data, and view the current map.
      </p>

      {/* Start/Stop SLAM */}
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          disabled={loading}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Start SLAM
        </button>
        <button
          onClick={handleStop}
          disabled={loading}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Stop SLAM
        </button>
      </div>

      {/* Sensor Data Input */}
      <div>
        <label className="block mb-1 font-semibold">Sensor Data (JSON)</label>
        <textarea
          rows={6}
          className="w-full p-2 border rounded"
          value={sensorData}
          onChange={(e) => setSensorData(e.target.value)}
        />
        <button
          onClick={handleSendSensor}
          disabled={loading}
          className="mt-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Send Sensor Data
        </button>
      </div>

      {/* Get SLAM Map */}
      <div>
        <button
          onClick={handleGetMap}
          disabled={loading}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Get SLAM Map
        </button>
      </div>

      {/* Status & Response */}
      {message && <div className="text-sm text-gray-700 mt-2">Status: {message}</div>}

      {mapResponse && (
        <pre className="bg-gray-100 rounded p-2 text-sm mt-2">
          {JSON.stringify(mapResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}
