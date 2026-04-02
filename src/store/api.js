import axios from "axios";
import Cookies from "js-cookie";

export const apiStatus = {
  initial: "initial",
  loading: "loading",
  success: "success",
  error: "error",
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3010",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default api;
