import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth"; // change if needed

export const loginUser = async (email, password) => {
  return axios.post(`${BASE_URL}/login`, { email, password });
};

export const registerUser = async (name, email, password, smsEnabled) => {
  return axios.post(`${BASE_URL}/register`, { name, email, password, smsEnabled });
};
