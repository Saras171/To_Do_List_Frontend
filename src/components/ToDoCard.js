"use client";  // Enables client-side interactivity (hooks, state, events)

import {
  Trash2, ChevronDown, ChevronUp, RotateCw, XCircle, Pencil
} from "lucide-react";

/**
 * Renders a single Todo task with details, actions, and subtasks.
 * 
 * Props:
 * - todo: Task object
 * - formatDate: Utility function for formatting date
 * - toggleStatus: Marks task as completed/uncompleted
 * - softDelete: Sends task to trash
 * - restoreFromTrash: Recovers task from trash
 * - permanentlyDelete: Deletes task permanently
 * - activeTab: Current active tab
 * - expandedTodo: Currently expanded task ID
 * - setExpandedTodo: Expands/collapses subtasks
 * - setEditTodo: Triggers the edit modal
 * - getStatusColorClass: Utility to determine color class from status
 */

export default function TodoCard({
  todo,
  formatDate,
  toggleStatus,
  softDelete,
  restoreFromTrash,
  permanentlyDelete,
  activeTab,
  expandedTodo,
  setExpandedTodo,
  setEditTodo,
  getStatusColorClass,
}) {
  return (
    <div className="bg-[#FFF8E1] p-4 rounded-md shadow hover:shadow-md transition">
    {/* === Main Header Row === */}
      <div className="flex justify-between items-center">
        {/* Left: Checkbox and info */}
        <div className="flex items-start gap-3">
                 {/* Completion Toggle */}
          <input
            type="checkbox"
            className="accent-green-600 mt-1"
            checked={todo.status === "completed"}
            onChange={() => toggleStatus(todo)}
            aria-label="Mark task completed"
          />

                 {/* Task Metadata */}
          <div>
            <p className="text-lg font-medium">{todo.title}</p>
            <p className="text-sm text-gray-600">
              Start: {formatDate(todo.start_date)} | Due: {formatDate(todo.due_date)} |{" "}
              <span className={`font-semibold ${getStatusColorClass(todo.status)}`}>
                {todo.status}
              </span>
            </p>
            
            {/* Expand/Collapse Subtasks */}
            {todo.subtasks?.length > 0 && (
              <button
                onClick={() => setExpandedTodo(expandedTodo === todo.id ? null : todo.id)}
                className="text-xs text-blue-600 mt-1 flex items-center gap-1 hover:underline"
              >
                {expandedTodo === todo.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {expandedTodo === todo.id ? "Hide subtasks" : "View subtasks"}
              </button>
            )}
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          {activeTab !== "Trash" ? (
            <>
              <button onClick={() => setEditTodo(todo)} title="Edit" className="text-blue-600 hover:text-blue-800">
                <Pencil size={18} />
              </button>
              <button onClick={() => softDelete(todo.id)} title="Move to Trash" className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => restoreFromTrash(todo.id)} title="Restore" className="text-green-600 hover:text-green-800">
                <RotateCw size={18} />
              </button>
              <button onClick={() => permanentlyDelete(todo.id)} title="Delete Permanently" className="text-red-600 hover:text-red-800">
                <XCircle size={18} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Subtask list */}
      {expandedTodo === todo.id && todo.subtasks?.length > 0 && (
        <ul className="mt-2 ml-8 list-disc text-sm text-gray-700 space-y-1">
          {todo.subtasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
