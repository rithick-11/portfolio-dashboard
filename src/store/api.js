import axios from "axios";
import Cookies from "js-cookie";

export const apiStatus = {
  initial: "initial",
  loading: "loading",
  success: "success",
  error: "error",
};

const baseUrl = {
  development: "http://localhost:3010",
  production: "https://portfolio-server-pink-seven.vercel.app",
}

const api = axios.create({
  baseURL: baseUrl.production,
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default api;
