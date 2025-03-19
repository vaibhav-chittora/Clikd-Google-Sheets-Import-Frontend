import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Backend running on 3000

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// ✅ Get All Tasks
export const fetchTasks = async () => {
  const { data } = await axios.get(`${API_URL}/tasks`, getAuthHeader());
  return data;
};

// ✅ Create Task
export const createTask = async (task) => {
  const { data } = await axios.post(`${API_URL}/tasks`, task, getAuthHeader());
  return data;
};

// ✅ Update Task
export const updateTask = async (id, task) => {
  const { data } = await axios.put(
    `${API_URL}/tasks/${id}`,
    task,
    getAuthHeader()
  );
  return data;
};

// ✅ Delete Task
export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/tasks/${id}`, getAuthHeader());
};

// ✅ Import Tasks from Google Sheets
export const importTasks = async (sheetUrl) => {
  const { data } = await axios.post(
    `${API_URL}/import`,
    { sheetUrl },
    getAuthHeader()
  );
  return data;
};

export const fetchPaginatedTasks = async (page = 1, limit = 10) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/tasks/paginated?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return data;
};
