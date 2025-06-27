"use client"; // Enables client-side hooks like useEffect in Next.js App Router

// React and Routing
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// Icons
import {
  FolderOpen, Star, Clock, RefreshCcw, CheckCircle, Trash
} from "lucide-react";

// UI Components
import Header from "@/components/Header";
import TodoAddPortal from "@/components/ToDoAddPortal";
import TodoEditPortal from "@/components/ToDoEditPortal";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/Topbar";
import TodoList from "@/components/TodoList";

// API CALLS
import {
  getCurrentUser,
  getAllTodos,
  markTodoCompleted,
  updateTodo,
  deleteTodo,
} from "@/utils/api";

// === Utilities ===
import {
  recalculateStatus,
  getStatusColorClass
} from "@/utils/statusUtils";

// === Dashboard Page ===
export default function DashboardPage() {
  const router = useRouter();

  // === State Variables ===
  const [user, setUser] = useState(null);   // Authenticated user info
  const [todos, setTodos] = useState([]);      // All todos
  const [activeTab, setActiveTab] = useState("All");    // Current selected tab
  const [showPortal, setShowPortal] = useState(false);  // Control add portal modal
  const [editTodo, setEditTodo] = useState(null);   // Control edit modal
  const [expandedTodo, setExpandedTodo] = useState(null); // Expanded todo item
  const [sidebarOpen, setSidebarOpen] = useState(true); // Toggle sidebar

  // Date Formatting
  const today = new Date();
  const formatDate = (d) => new Date(d).toISOString().split("T")[0];
  const todayStr = formatDate(today);

  // === Fetch and authenticate user ===
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        const all = await getAllTodos();

             // Update todos with dynamic status
        const updatedTodos = all.map((todo) => ({
          ...todo,
          status: recalculateStatus(todo),
        }));
        setTodos(updatedTodos);
      } catch (err) {
         toast.error("Please log in to access your dashboard.");
        router.push("/login");
      }
    };
    fetchData();
  }, [router, showPortal]);


  // === Refetch Todos and Recalculate Status ===
  const refreshTodos = async () => {
    const updated = await getAllTodos();
    const updatedTodos = updated.map((todo) => ({
      ...todo,
      status: recalculateStatus(todo),
    }));
    setTodos(updatedTodos);
  };

  // === CRUD Operations ===
  const toggleStatus = async (todo) => {
    if (todo.status === "completed") {
      await updateTodo(todo.id, {
        start_date: todo.start_date,
        due_date: todo.due_date,
      });
    } else {
      await markTodoCompleted(todo.id);
    }
    await refreshTodos();
  };

  const softDelete = async (id) => {
    await updateTodo(id, { is_deleted: true });
    await refreshTodos();
  };

  const restoreFromTrash = async (id) => {
    await updateTodo(id, { is_deleted: false });
    await refreshTodos();
  };

  const permanentlyDelete = async (id) => {
    await deleteTodo(id);
    await refreshTodos();
  };

  // === Tab-based Filtering Logic ===
  const filteredTodos = todos.filter((todo) => {
    if (todo.is_deleted && activeTab !== "Trash") return false;
    const start = formatDate(todo.start_date);
    const due = formatDate(todo.due_date);

    switch (activeTab) {
      case "Today": return start === todayStr || due === todayStr;
      case "Previous": return start < todayStr || due < todayStr;
      case "Upcoming": return start > todayStr;
      case "All": return !todo.is_deleted;
      case "Important": return todo.category === "important";
      case "Pending":
      case "Ongoing":
      case "Completed":
        return todo.status === activeTab.toLowerCase();
      case "Trash": return todo.is_deleted;
      default: return true;
    }
  });

  // === Sidebar Tabs Metadata ===
  const leftTabMeta = {
    All: { icon: <FolderOpen />, color: "text-black font-bold" },
    Important: { icon: <Star />, color: "text-[#4ABDAC]" },
    Pending: { icon: <Clock />, color: "text-red-500" },
    Ongoing: { icon: <RefreshCcw />, color: "text-yellow-700" },
    Completed: { icon: <CheckCircle />, color: "text-green-600" },
    Trash: { icon: <Trash />, color: "text-red-800" },
  };

    // Sidebar and topbar tab lists
  const leftTabs = Object.keys(leftTabMeta).map((label) => ({
    label,
    ...leftTabMeta[label],
  }));

  const topNavTabs = ["Today", "Previous", "Upcoming"];

  // === Conditional UI Render ===
  if (!user) return <p className="p-8 text-center">Loading dashboard...</p>;

   // === Render Main Dashboard ===
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
           
            {/* Header with greeting and date */}
      <Header
        title="Welcome to Your Dashboard"
        day={today.toLocaleDateString("en-IN", { weekday: "long" })}
        date={today.toLocaleDateString("en-IN")}
        username={user.username}
      />
      <main className="flex">
        {/* Sidebar navigation */}
        <Sidebar
          leftTabs={leftTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Todo Content */}
        <section className="flex-1 p-6">
          <TopBar
            topNavTabs={topNavTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setShowPortal={setShowPortal}
          />

          {/* Modal Portals */}
          {showPortal && <TodoAddPortal onClose={() => setShowPortal(false)} />}
          {editTodo && (
            <TodoEditPortal
              todo={editTodo}
              onClose={() => setEditTodo(null)}
              onUpdate={refreshTodos}
            />
          )}

          {/* Task List */}
          <TodoList
            todos={filteredTodos}
            activeTab={activeTab}
            toggleStatus={toggleStatus}
            softDelete={softDelete}
            restoreFromTrash={restoreFromTrash}
            permanentlyDelete={permanentlyDelete}
            formatDate={formatDate}
            setExpandedTodo={setExpandedTodo}
            expandedTodo={expandedTodo}
            setEditTodo={setEditTodo}
            leftTabMeta={leftTabMeta}
            getStatusColorClass={getStatusColorClass}
          />
        </section>
      </main>
    </div>
  );
}
