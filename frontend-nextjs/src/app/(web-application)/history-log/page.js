"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/main/AppLayout";
import { useAuth } from "@/app/(web-application)/(authentication)/context/AuthContext";
import { useRover } from "@/components/context/RoverContext";

export default function HistoryLogPage() {
  const { user } = useAuth();
  const { selectedRover } = useRover();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch alerts from the database
  useEffect(() => {
    const fetchAlerts = async () => {
      if (!selectedRover || !user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const idToken = await user.getIdToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/rover/${selectedRover.rover_id}/alerts?limit=100&offset=0`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${idToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [selectedRover, user]);

  // Mock logs (unchanged)
  const logs = [
    {
      id: 1,
      time: "09:00",
      event: "Patrol Started",
      location: "Base",
      remark: "Initial check OK",
    },
    {
      id: 2,
      time: "09:15",
      event: "Reached Checkpoint A",
      location: "Entrance Gate",
      remark: "No abnormal activity",
    },
    {
      id: 3,
      time: "09:30",
      event: "Detected Movement",
      location: "Sector 3",
      remark: "Possible staff member",
    },
    {
      id: 4,
      time: "09:45",
      event: "Resume Patrol",
      location: "Sector 3",
      remark: "All clear",
    },
  ];

  // Function to map alert type to severity (since severity isn't in the backend schema)
  const getSeverity = (type) => {
    switch (type.toLowerCase()) {
      case "error":
      case "warning":
        return "High";
      case "temperature high":
        return "Medium";
      default:
        return "Low";
    }
  };

  return (
    <Layout>
      <main className="pt-[110px] min-h-svh mx-auto px-8 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Alert Log
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Review past alerts, triggers, or incidents with additional details.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Past Alerts
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 text-left font-medium">Date/Time</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">Severity</th>
                  <th className="px-3 py-2 text-left font-medium">Description</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-3 py-2 text-center text-gray-500">
                      Loading alerts...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="px-3 py-2 text-center text-red-500">
                      Error: {error}
                    </td>
                  </tr>
                ) : alerts.length > 0 ? (
                  alerts.map((alert) => (
                    <tr
                      key={alert.alert_id}
                      className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-3 py-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </td>
                      <td className="px-3 py-2">{alert.type}</td>
                      <td
                        className={
                          getSeverity(alert.type) === "High"
                            ? "text-red-500"
                            : getSeverity(alert.type) === "Medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }
                      >
                        {getSeverity(alert.type)}
                      </td>
                      <td className="px-3 py-2">{alert.description}</td>
                      <td className="px-3 py-2">
                        {alert.resolved ? "Resolved" : "Unresolved"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-3 py-2 text-center text-gray-500">
                      No alerts available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Patrol Log
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Detailed log of each patrol event including time, location, and remarks.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-900 p-6 border border-gray-300 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Recent Patrol Activities
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 text-left font-medium">Event</th>
                  <th className="px-3 py-2 text-left font-medium">Location</th>
                  <th className="px-3 py-2 text-left font-medium">Remark</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{log.time}</td>
                    <td className="px-3 py-2">{log.event}</td>
                    <td className="px-3 py-2">{log.location}</td>
                    <td className="px-3 py-2">{log.remark}</td>
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