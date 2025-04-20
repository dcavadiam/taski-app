export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "Pendiente" | "En progreso" | "Completada";
  project?: string;
  priority: "Alta" | "Media" | "Baja";
}

export interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task;
}

export interface TaskStatusSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  errors?: Record<string, string>;
}

export interface TaskPrioritySelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  errors?: Record<string, string>;
}
