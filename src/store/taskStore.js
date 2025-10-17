import { create } from "zustand";
import api from "../utils/api.js";

const useTaskStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  contextMenuTaskId: null,

  setProjects: (projects) => set({ projects }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setContextMenuTaskId: (id) => set({ contextMenuTaskId: id }),

  deleteTask: async (taskId) => {
    try {
      await api.delete(`/project/task/${taskId}`);
      alert("삭제 완료!");
      const { projects, selectedProject } = get();
      const updatedProjects = projects.map((p) =>
        p.id === selectedProject.id
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p
      );
      set({ projects: updatedProjects, contextMenuTaskId: null });
    } catch (err) {
      console.error(err);
    }
  },
}));
export default useTaskStore;
