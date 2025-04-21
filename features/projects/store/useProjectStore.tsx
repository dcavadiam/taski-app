import { create } from "zustand";
import { Project, ProjectStore } from "../types";
import { useTaskStore } from "@/features/tasks/store/useTaskStore";

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    set({ projects });
  },
  addProject: (project: Project) => set((state) => {
    const newProjects = [...state.projects, project];
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(newProjects));
    }
    return { projects: newProjects };
  }),
  updateTitleProject: (id: string, title: string) => set((state) => {
    const newProjects = state.projects.map((p) => (p.id === id ? { ...p, title } : p));
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(newProjects));
    }
    return { projects: newProjects };
  }),
  deleteProject: (id: string) => set((state) => {
    const newProjects = state.projects.filter((p) => p.id !== id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(newProjects));
    }
    return { projects: newProjects };
  }),
  updateProjectStats: (projectName: string) => {
    const tasks = useTaskStore.getState().tasks;
    const projectTasks = tasks.filter(task => task.project === projectName);

    if (projectTasks.length === 0) return;

    const completedTasks = projectTasks.filter(task => task.status === "Completada").length;
    const pendingTasks = projectTasks.filter(task => task.status === "Pendiente").length;
    const inProgressTasks = projectTasks.filter(task => task.status === "En progreso").length;

    const progress = Math.round((completedTasks / projectTasks.length) * 100);

    let status = "Pendiente";
    if (completedTasks === projectTasks.length) {
      status = "Completado";
    } else if (inProgressTasks > 0) {
      status = "En progreso";
    }

    set((state) => {
      const newProjects = state.projects.map((p) =>
        p.title === projectName
          ? {
            ...p,
            progress,
            status,
            pendingTasks,
            completedTasks,
            inProgressTasks
          }
          : p
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem('projects', JSON.stringify(newProjects));
      }
      return { projects: newProjects };
    });
  }
}));
