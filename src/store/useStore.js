import { create } from "zustand";
import api from "./api";
import { apiStatus } from "./api";

const useStore = create((set) => ({
  getInitalDataStatus: apiStatus.initial,
  vistCount: 0,
  messages: [],
  recentVist: [],
  getInitalData: async () => {
    try {
      set({ getInitalDataStatus: apiStatus.loading });
      const response = await api.get("/admin/vist-count");

      set({
        getInitalDataStatus: apiStatus.success,
        vistCount: response.data.count,
        messages: response.data.messages,
        recentVist: response.data.recentVist,
      });
    } catch (error) {
      console.log(error);
      set({ getInitalDataStatus: apiStatus.error });
    }
  },
}));

export default useStore;
