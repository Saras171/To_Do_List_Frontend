"use client";  // Enables client-side interactivity in Next.js App Router

import { useState } from "react";
import { addTodo } from "@/utils/api"; //  API utility for adding todos

/**
 * TodoAddPortal Component
 * -----------------------
 * A modal form that allows users to add a new todo task with category, subtasks, and date range.
 *
 * Props:
 * @param {Function} onClose - Callback to close the modal after submission or cancellation.
 */
export default function TodoAddPortal({ onClose }) {
  // === Local State Management ===
  const [category, setCategory] = useState("casual");
  const [title, setTitle] = useState("");
  const [subtasks, setSubtasks] = useState([{ text: "", id: Date.now() }]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

   // === Handle subtask input updates ===
  const handleSubtaskChange = (id, value) => {
    setSubtasks(subtasks.map(task => task.id === id ? { ...task, text: value } : task));
  };

    // === Add a new empty subtask ===
  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { text: "", id: Date.now() }]);
  };

   // === Validate and submit todo ===
  const handleSubmit = async () => {
    setError("");

    // Validate
    if (!title.trim()) return setError("Please enter a title.");
    if (!startDate || !endDate) return setError("Please select start and end dates.");
    if (new Date(startDate) > new Date(endDate)) return setError("End date cannot be before start date.");


     // === Prepare payload ===
    const payload = {
      category,
      title: title.trim(),
      subtasks: subtasks.map((t) => t.text).filter(Boolean), // convert to string[] Only non-empty subtasks
      start_date: startDate,
      due_date: endDate,
    };

      // === Call backend API ===
    try {
      const result = await addTodo(payload);
      console.log("Todo added:", result);
      onClose(); // Close portal on success
    } catch (err) {
      console.error("Add todo failed:", err.message);
      setError(err.message || "Failed to add todo");
    }
  };



  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 animate-slide-up">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">Add New Todo</h2>

 {/* Error Message */}
        {error && <p className="text-red-600 mb-2 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          {/* Category  Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              placeholder='Select Category of todoes'
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            >
              <option value="casual">Casual</option>
              <option value="important">Important</option>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter main task title"
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtasks</label>
            {subtasks.map((task, idx) => (
              <div key={task.id} className="flex items-center space-x-2 mt-2">
                <input
                  type="radio"
                  name="activeSubtask"
                  className="accent-indigo-600"
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => handleSubtaskChange(task.id, e.target.value)}
                  placeholder={`Subtask ${idx + 1}`}
                  className="flex-grow border px-4 py-1 rounded-md"
                />
              </div>
            ))}
            <button
              onClick={handleAddSubtask}
              className="mt-2 text-indigo-600 hover:underline text-sm"
            >
              + Add another subtask
            </button>
          </div>

  {/* === Start & End Dates === */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (endDate && e.target.value > endDate) {
                    setEndDate(""); // Clear endDate if it's now before startDate
                  }
                }}
                min={new Date().toISOString().split("T")[0]}
                className="w-full border px-4 py-2 rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split("T")[0]}
                className="w-full border px-4 py-2 rounded-md mt-1"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 rounded-md text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add this new todo
          </button>
        </div>
      </div>
    </div>
  );
}
