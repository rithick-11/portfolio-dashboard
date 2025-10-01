import axios from "axios";
import Cookies from "js-cookie";

export const apiStatus = {
  initial: "initial",
  loading: "loading",
  success: "success",
  error: "error",
};

const api = axios.create({
  baseURL: "https://portfolio-server-pink-seven.vercel.app",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});

export default api;
