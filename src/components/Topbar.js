"use client";  // Enables client-side interactivity in Next.js App Router

import { PlusCircle } from "lucide-react";

/**
 * TopBar component containing quick-access tab buttons and add-task button.
 *
 * Props:
 * - topNavTabs: Array of strings (Today, Upcoming, Previous)
 * - activeTab: Currently selected top tab
 * - setActiveTab: Setter function for active top tab
 * - setShowPortal: Opens the task creation modal
 */

export default function TopBar({ topNavTabs, activeTab, setActiveTab, setShowPortal }) {
  return (
    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
      {/* Navigation Tab Buttons Section */}
      <div className="flex flex-wrap gap-3 bg-white rounded-lg shadow px-4 py-3 transition-all duration-300">
        {topNavTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ease-in-out tracking-wide shadow-sm ${
              activeTab === tab
                ? "bg-indigo-600 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
            }`}
            aria-label={`Switch to ${tab} view`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Task Floating Button */}
      <div className="relative group">
        <button
          onClick={() => setShowPortal(true)}
          className="p-4 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Add a new task"
        >
          
          <PlusCircle size={36} />
        </button>

         {/* Tooltip on hover */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-medium px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 whitespace-nowrap">
          Add a new task
        </div>
      </div>
    </div>
  );
}
