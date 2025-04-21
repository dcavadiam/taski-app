import { create } from "zustand";
import { Task, TaskStore } from "../types";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks: Task[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    set({ tasks });
  },
  addTask: (task: Task) => set((state) => {
    const newTasks = [...state.tasks, task];
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    }
    return { tasks: newTasks };
  }),
  updateTask: (task: Task) =>
    set((state) => {
      const newTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      }
      return { tasks: newTasks };
    }),
  deleteTask: (id: string) =>
    set((state) => {
      const newTasks = state.tasks.filter((t) => t.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('tasks', JSON.stringify(newTasks));
      }
      return { tasks: newTasks };
    }),
}));
