import { Project } from "../types";

export const projects: Project[] = [
  {
    id: "1",
    title: "Proyecto 1",
    description: "Desarrollo de nueva funcionalidad para la plataforma",
    progress: 75,
    status: "En progreso",
    pendingTasks: 5,
    completedTasks: 15,
    inProgressTasks: 10,
  },
  {
    id: "2",
    title: "Proyecto 2",
    description: "Optimización del rendimiento del sistema",
    progress: 30,
    status: "Pendiente",
    pendingTasks: 8,
    completedTasks: 4,
    inProgressTasks: 2,
  },
  {
    id: "3",
    title: "Proyecto 3",
    description: "Implementación de nuevas características",
    progress: 90,
    status: "Casi completado",
    pendingTasks: 2,
    completedTasks: 18,
    inProgressTasks: 0,
  },
  {
    id: "4" ,
    title: "Proyecto 4",
    description: "Rediseño de la interfaz de usuario",
    progress: 45,
    status: "En progreso",
    pendingTasks: 6,
    completedTasks: 8,
    inProgressTasks: 0,
  },
];
