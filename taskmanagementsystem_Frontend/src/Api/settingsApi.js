import axios from "axios";

const BASE_URL = "http://localhost:8080/api/settings";

export const getSettings = (token) => {
  return axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateSettings = (data, token) => {
  return axios.put(BASE_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getProfile = (token) => {
  return axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
