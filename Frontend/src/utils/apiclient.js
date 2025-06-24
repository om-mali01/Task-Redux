import axios from "axios";

const apiclient = axios.create({
  baseURL: "http://127.0.0.1:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

apiclient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");
  const userName = localStorage.getItem("user_name");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (userId) {
    config.headers["User-Id"] = userId;
  }
  if (userName) {
    config.headers["User-Name"] = userName;
  }

  return config;
});

export default apiclient;
