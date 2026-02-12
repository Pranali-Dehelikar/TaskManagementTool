import api from "./axiosConfig";

export const createUser = (user) => api.post("/users", user);

export const getAllUsers = () => api.get("/users");