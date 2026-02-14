import api from "./axiosConfig";

export const getUserNotifications = (userId) =>
  api.get(`/notifications/${userId}`);

export const saveUserNotifications = (userId, notifications) =>
  api.post(`/notifications/${userId}`, notifications);
