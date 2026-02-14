import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // must match Spring Boot server
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
