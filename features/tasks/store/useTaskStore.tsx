import { create } from "zustand";
import { Task, TaskStore } from "../types";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => set({ tasks }),
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (task: Task) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
    })),
  deleteTask: (id: string) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
}));
