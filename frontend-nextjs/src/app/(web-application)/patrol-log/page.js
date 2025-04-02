"use client";

import React from "react";
import Layout from "@/components/main/AppLayout";

export default function PatrolLogPage() {
  // Mock logs
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

  return (
    <Layout>
      <main className="pt-[110px] min-h-svh mx-auto max-w-7xl px-4 py-6 space-y-6">
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