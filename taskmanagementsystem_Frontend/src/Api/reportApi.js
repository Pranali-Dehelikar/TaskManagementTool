import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const fetchTasksForReport = (token, keyword = "") =>
  axios.get(`${BASE_URL}/api/tasks/report`, {
    params: { keyword },
    headers: { Authorization: `Bearer ${token}` },
  });

export const downloadTaskPdf = (token, keyword = "") =>
  axios.get(`${BASE_URL}/api/reports/tasks/pdf`, {
    params: { keyword },
    responseType: "blob",
    headers: { Authorization: `Bearer ${token}` },
  });
