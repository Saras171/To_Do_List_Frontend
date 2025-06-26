"use client";  // Enables client-side interactivity in Next.js App Router
import TodoCard from "./ToDoCard";

/**
 * TodoList Component
 * - Renders a list of filtered todos
 * - Passes control handlers and utilities to TodoCard
 * 
 * Props:
 * - todos: array of todo objects
 * - activeTab: current active tab/category
 * - toggleStatus: mark task complete/incomplete
 * - softDelete: send task to trash
 * - restoreFromTrash: recover task from trash
 * - permanentlyDelete: delete task permanently
 * - formatDate: date formatting utility
 * - setExpandedTodo: controls subtask expansion
 * - expandedTodo: currently expanded todo ID
 * - setEditTodo: triggers edit modal
 * - leftTabMeta: tab metadata (icon, color)
 * - getStatusColorClass: status-to-color class mapper
 */
export default function TodoList({
  todos,
  activeTab,
  toggleStatus,
  softDelete,
  restoreFromTrash,
  permanentlyDelete,
  formatDate,
  setExpandedTodo,
  expandedTodo,
  setEditTodo,
  leftTabMeta,
  getStatusColorClass,
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Section Title with matching icon */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
           {/* Tab icon and color based on tab metadata */}
        {leftTabMeta[activeTab]?.icon && (
          <span className={`${leftTabMeta[activeTab].color} inline-flex items-center`}>
            {leftTabMeta[activeTab].icon}
          </span>
        )}
        <span>{activeTab} Tasks</span>
      </h2>

      {/* Render all filtered tasks */}
      <div className="space-y-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              formatDate={formatDate}
              toggleStatus={toggleStatus}
              softDelete={softDelete}
              restoreFromTrash={restoreFromTrash}
              permanentlyDelete={permanentlyDelete}
              activeTab={activeTab}
              expandedTodo={expandedTodo}
              setExpandedTodo={setExpandedTodo}
              setEditTodo={setEditTodo}
              getStatusColorClass={getStatusColorClass}
            />
          ))
        ) : (
          <p className="text-gray-500">No tasks found in {activeTab}.</p>
        )}
      </div>
    </div>
  );
}
