"use client"; // Enables client-side interactivity in App Router

/**
 * Sidebar Component
 * ------------------
 * A collapsible sidebar for task filtering/navigation (e.g., All, Important, Completed, etc.)
 *
 * Props:
 * @param {Array} leftTabs - Array of tab objects (each with label, icon, and color class)
 * @param {string} activeTab - The currently selected tab
 * @param {function} setActiveTab - Updates the selected tab
 * @param {boolean} sidebarOpen - Determines if sidebar is expanded or collapsed
 * @param {function} setSidebarOpen - Toggles sidebar open state
 */
export default function Sidebar({ leftTabs, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  return (
    <aside className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"} min-h-screen shadow-md`}>
     
      {/* Header with toggle button */}
      <div className="p-4 flex items-center justify-between">
          {/* Show title only if sidebar is expanded */}
        <h2 className={`text-xl font-semibold transition ${sidebarOpen ? "block" : "hidden"}`}>Filters</h2>
       {/* Collapse/Expand Sidebar Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-indigo-600"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? "⏴" : "⏵"}
        </button>
      </div>

      {/* Tab list */}
      <ul className="space-y-3 px-4">
        {leftTabs.map(({ label, icon, color }) => (
          <li key={label}>
            <button
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-gray-200 transition ${
                activeTab === label ? "bg-gray-200" : ""
              } ${color}`}
              aria-label={`Filter by ${label}`}
            >
                    {/* Icon */}
              {icon}
              {sidebarOpen && <span className="capitalize">{label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
