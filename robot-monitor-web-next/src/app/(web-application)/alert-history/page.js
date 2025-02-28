"use client";

import React from "react";
import Layout from "@/components/main/AppLayout";

export default function AlertHistoryPage() {
  // Mock alerts
  const alerts = [
    {
      id: 1,
      date: "2025-01-20 10:15",
      type: "Motion Detected",
      severity: "High",
      description: "Unidentified movement in Sector 2",
    },
    {
      id: 2,
      date: "2025-01-21 11:00",
      type: "Temperature High",
      severity: "Medium",
      description: "Temperature reached 40°C near Battery Compartment",
    },
    {
      id: 3,
      date: "2025-01-22 09:30",
      type: "Battery Low",
      severity: "Low",
      description: "Battery dropped below 20%",
    },
  ];

  return (
    <Layout>
      <main className="pt-[110px] mx-auto max-w-7xl px-4 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Alert History
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
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b last:border-0 border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-3 py-2">{alert.date}</td>
                    <td className="px-3 py-2">{alert.type}</td>
                    <td
                      className={
                        alert.severity === "High"
                          ? "text-red-500"
                          : alert.severity === "Medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {alert.severity}
                    </td>
                    <td className="px-3 py-2">{alert.description}</td>
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