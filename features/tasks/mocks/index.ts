import { Task } from "../types";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripción de la tarea 1",
    dueDate: "2024-01-01",
    status: "Pendiente",
    project: "Proyecto 1",
    priority: "Alta" as const,
  },
  {
    id: 2,
    title: "Tarea 2",
    description: "Descripción de la tarea 2",
    dueDate: "2024-01-02",
    status: "En progreso",
    project: "Proyecto 2",
    priority: "Media" as const,
  },
  {
    id: 3,
    title: "Tarea 3",
    description: "Descripción de la tarea 3",
    dueDate: "2024-01-03",
    status: "Completada",
    project: "Proyecto 3",
    priority: "Baja" as const,
  },
];