import api from "./axiosConfig";

export const getAllTasks = () => api.get("/tasks");

export const createTask = (task) => api.post("/tasks", task);

export const searchTasks = (keyword) =>
  api.get("/tasks/search", {
    params: { keyword },
  });

  export const getTasksByDate = (date, token) =>
  api.get("/tasks/by-date", {
    params: { date },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


/* Check Google Form score and update status */
export const checkTaskScore = (id, token) =>
  api.post(`/tasks/${id}/check`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

/* Manually update task status (if needed) */
export const updateTaskStatus = (id, status, token) =>
  api.patch(`/tasks/${id}/status`, null, {
    params: { status },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });