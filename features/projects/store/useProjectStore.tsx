import { create } from "zustand";
import { Project, ProjectStore } from "../types";
import { useTaskStore } from "@/features/tasks/store/useTaskStore";

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  setProjects: (projects: Project[]) => set({ projects }),
  addProject: (project: Project) => set((state) => ({ projects: [...state.projects, project] })),
  updateTitleProject: (id: string, title: string) => set((state) => ({ projects: state.projects.map((p) => (p.id === id ? { ...p, title } : p)) })),
  deleteProject: (id: string) => set((state) => ({ projects: state.projects.filter((p) => p.id !== id) })),
  updateProjectStats: (projectName: string) => {
    const tasks = useTaskStore.getState().tasks;
    const projectTasks = tasks.filter(task => task.project === projectName);

    console.log(projectTasks);

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

    set((state) => ({
      projects: state.projects.map((p) =>
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
      )
    }));
  }
}));
