"use client";  // Enables client-side hooks and interactivity in Next.js App Router

import { useState, useEffect } from "react";
import { updateTodo } from "@/utils/api";

/**
 * TodoEditPortal Component
 * --------------------------
 * Modal form to edit an existing todo.
 * Supports updating category, title, subtasks, and date range.
 *
 * Props:
 * - todo: The todo object to edit
 * - onClose: Function to close the modal
 * - onUpdate: Callback to refresh the todo list after update
 */
export default function TodoEditPortal({ todo, onClose, onUpdate }) {
    // === Local state for form fields ===
  const [category, setCategory] = useState(todo.category);
  const [title, setTitle] = useState(todo.title);
  const [subtasks, setSubtasks] = useState(todo.subtasks.map((text, i) => ({ id: Date.now() + i, text })));
  const [startDate, setStartDate] = useState(todo.start_date);
  const [endDate, setEndDate] = useState(todo.due_date);
  const [error, setError] = useState("");

   // === Subtask input handling ===
  const handleSubtaskChange = (id, value) => {
    setSubtasks(subtasks.map((task) => (task.id === id ? { ...task, text: value } : task)));
  };

   // Add new empty subtask field
  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { text: "", id: Date.now() }]);
  };

  
  // === Form Submission Logic ===
  const handleSubmit = async () => {
    setError("");

    // Validation
    if (!title.trim()) return setError("Please enter a title.");
    if (!startDate || !endDate) return setError("Please select start and end dates.");
    if (new Date(startDate) > new Date(endDate)) return setError("End date cannot be before start date.");


       // Prepare payload for update
    const updates = {
      category,
      title: title.trim(),
      subtasks: subtasks.map((t) => t.text).filter(Boolean),
      start_date: startDate,
      due_date: endDate,
    };

    try {
      await updateTodo(todo.id, updates);  // Update todo in backend
      onUpdate(); // Refresh todos
      onClose();  // Close modal
    } catch (err) {
      console.error("Update failed:", err.message);
      setError(err.message || "Failed to update task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6 animate-slide-up">
      {/* === Header === */}
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">Edit Todo</h2>
        
        {/* Error Display */}
        {error && <p className="text-red-600 mb-2 text-sm text-center">{error}</p>}

 {/* === Form Section === */}
        <div className="space-y-4">
           {/* Category Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            >
              <option value="casual">Casual</option>
              <option value="important">Important</option>
            </select>
          </div>

 {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border px-4 py-2 rounded-md"
            />
          </div>

   {/* Subtask Inputs */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtasks</label>
            {subtasks.map((task, idx) => (
              <div key={task.id} className="flex items-center space-x-2 mt-2">
                <input
                  type="radio"
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
            <button onClick={handleAddSubtask} className="mt-2 text-indigo-600 hover:underline text-sm">
              + Add another subtask
            </button>
          </div>


 {/* Date Range Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border px-4 py-2 rounded-md mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border px-4 py-2 rounded-md mt-1"
              />
            </div>
          </div>
        </div>

   {/* === Action Buttons === */}
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
