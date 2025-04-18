import { create } from "zustand";
import { Task } from "../types";

interface TaskStore {
  tasks: Task[];
  isNewTaskModalOpen: boolean;
  addTask: (task: Task) => void;
  openNewTaskModal: () => void;
  closeNewTaskModal: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  isNewTaskModalOpen: false,
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  openNewTaskModal: () => set({ isNewTaskModalOpen: true }),
  closeNewTaskModal: () => set({ isNewTaskModalOpen: false }),
}));
