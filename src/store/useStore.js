import { create } from "zustand";
import api from "./api";
import { apiStatus } from "./api";

const useStore = create((set, get) => ({
  getInitalDataStatus: apiStatus.initial,
  vistCount: 0,
  messages: [],
  recentVist: [],
  getInitalData: async () => {
    if (get().getInitalDataStatus === apiStatus.success) return;
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
  getInitalProjectsStatus: apiStatus.initial,
  projects: [],
  getInitalProjectData: async () => {
    if (get().getInitalProjectsStatus === apiStatus.success) return;
    try {
      set({ getInitalProjectsStatus: apiStatus.loading });
      const { data } = await api.get("/admin/projects");
      set({ projects: data.projects });
      set({ getInitalProjectsStatus: apiStatus.success });
    } catch (error) {
      console.log(error);
      set({ getInitalProjectsStatus: apiStatus.error });
    }
  },
  getProjectById: async (id) => {
    const projects = get().projects;
    let project = projects.find((project) => project._id === id);

    if (!project) {
      const { data } = await api.get(`/admin/project/${id}`);
      project = data.project;
    }
    return project;
  },
}));

export default useStore;
