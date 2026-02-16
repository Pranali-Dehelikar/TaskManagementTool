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
