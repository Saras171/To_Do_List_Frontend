import axios from "axios";

// Base API URL from environment variables
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// Create a configured Axios instance with credentials enabled
const axiosInstance = axios.create({
  baseURL: API_BASE, 
  withCredentials: true,  // Required to send/receive cookies (e.g., JWT tokens)
});

// ==================== AUTH APIs ====================

/**
 * Signup API
 * Registers a new user
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @returns {Object} user data
 */
export async function signup(username, email, password) {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
}

/**
 * Login API
 * Authenticates user and sets cookie
 * @param {string} email
 * @param {string} password
 * @returns {Object} user data
 */
export async function login(email, password) {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
}

/**
 * Logout API
 * Clears user session cookie
 * @returns {Object} success message
 */
export async function logout() {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Logout failed" };
  }
}

/**
 * Fetch Current User
 * Retrieves the authenticated user's info from /user/me
 * @returns {Object} user data
 */
export async function getCurrentUser() {
  try {
    const response = await axiosInstance.get("/user/me");
    return response.data.user;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user" };
  }
}

// ==================== TODOS APIs ====================

/**
 * Get All Todos
 * Fetches all todos for the current authenticated user
 * @returns {Array} todos
 */
export async function getAllTodos() {
  try {
    const response = await axiosInstance.get("/todos");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch todos" };
  }
}

/**
 * Add New Todo
 * @param {Object} param0 - category, title, subtasks, start_date, due_date
 * @returns {Object} created todo
 */
export async function addTodo({ category, title, subtasks, start_date, due_date }) {
  try {
    const response = await axiosInstance.post("/todos", {
      category,
      title,
      subtasks,
      start_date,
      due_date,
    });
    return response.data;
  } catch (error) {
throw error.response?.data?.error || { message: "Failed to add todo" };
  }
}


/**
 * Update Todo
 * @param {string} id - Todo ID
 * @param {Object} updates - Fields to update
 * @returns {Object} updated todo
 */
export async function updateTodo(id, updates) {
  try {
    const response = await axiosInstance.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update todo" };
  }
}

/**
 * Delete Todo
 * Permanently deletes a todo
 * @param {string} id - Todo ID
 * @returns {Object} success message
 */
export async function deleteTodo(id) {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to delete todo" };
  }
}


/**
 * Mark Todo as Completed
 * Updates the status of a todo to 'completed'
 * @param {string} id - Todo ID
 * @returns {Object} updated todo
 */
export async function markTodoCompleted(id) {
  try {
    const response = await axiosInstance.put(`/todos/${id}`, { status: "completed" });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to mark as completed" };
  }
}
