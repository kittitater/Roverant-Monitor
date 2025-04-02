"use client";

import React from "react";
import Layout from "@/components/main/AppLayout";

export default function SummaryReportPage() {
  // Mock summary stats
  const summary = {
    totalPatrols: 10,
    totalAlerts: 4,
    distanceTraveled: 18.3,
    lastUpdated: "2025-01-23 17:00",
  };

  // Mock final notes
  const finalNotes =
    "All missions completed successfully. No critical alerts remaining. Next scheduled maintenance: 2025-02-01.";

  // Mock “Export PDF” handler
  function handleExport() {
    alert("Mock: Export summary report as PDF!");
  }

  return (
    <Layout>
      <main className="pt-[110px] min-h-svh mx-auto max-w-7xl px-4 py-6 space-y-6">
        <section className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Summary Report
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            High-level final overview with key metrics.
          </p>
        </section>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Patrols</p>
            <h2 className="text-2xl font-bold">{summary.totalPatrols}</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Alerts</p>
            <h2 className="text-2xl font-bold">{summary.totalAlerts}</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Distance (km)</p>
            <h2 className="text-2xl font-bold">{summary.distanceTraveled}</h2>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 rounded-2xl p-4 flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
            <h2 className="text-lg font-bold">{summary.lastUpdated}</h2>
          </div>
        </section>

        {/* Final Notes */}
        <section className="bg-white dark:bg-gray-800 p-6 border border-gray-300 rounded-2xl space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Final Notes</h2>
          <p className="text-gray-600 dark:text-gray-300">{finalNotes}</p>
          <button
            onClick={handleExport}
            className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Export as PDF
          </button>
        </section>
      </main>
    </Layout>
  );
}