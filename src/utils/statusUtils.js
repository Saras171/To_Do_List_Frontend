/**
 * @function recalculateStatus
 * Determines the current status of a todo item based on today's date
 * and the todo's start and due dates.
 *
 * Logic:
 * - If marked completed → returns "completed"
 * - If today is between start and due dates → returns "ongoing"
 * - If today is before the start date → returns "upcoming"
 * - If today is after the due date → returns "pending"
 *
 * @param {Object} todo - A todo item with `start_date`, `due_date`, and `status`
 * @returns {"ongoing" | "upcoming" | "pending" | "completed"}
 */
export function recalculateStatus(todo) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to midnight

  const start = new Date(todo.start_date);
  start.setHours(0, 0, 0, 0); // Normalize

  const due = new Date(todo.due_date);
  due.setHours(0, 0, 0, 0); // Normalize

  if (todo.status === "completed") return "completed";
  if (today >= start && today <= due) return "ongoing";
  if (today < start) return "upcoming";
  if (today > due) return "pending";

  return todo.status; // fallback (in case dates are invalid)
}

/**
 * @function getStatusColorClass
 * Maps a todo status to a specific Tailwind text color class.
 *
 * Helps apply consistent and readable colors to status labels in the UI.
 *
 * @param {"pending" | "ongoing" | "upcoming" | "completed"} status - Task status
 * @returns {string} Tailwind class for text color
 */
export function getStatusColorClass(status) {
  switch (status) {
    case "pending":
      return "text-red-600";
    case "ongoing":
      return "text-orange-700";
    case "upcoming":
      return "text-fuchsia-600";
    case "completed":
      return "text-green-600";
    default:
      return "text-gray-500"; // Fallback color for unknown status
  }
}
