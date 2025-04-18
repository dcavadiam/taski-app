export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "Pendiente" | "En progreso" | "Completada";
  project: string;
  priority: "Alta" | "Media" | "Baja";
}
