import axios from "axios";
import { toast } from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    toast.error(error.response?.data?.error || "An error occurred");
    return Promise.reject(error);
  }
);

export default api;
