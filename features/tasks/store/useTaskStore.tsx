import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

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
