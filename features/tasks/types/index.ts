export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: "Pendiente" | "En progreso" | "Completada";
  project?: string;
  priority: "Alta" | "Media" | "Baja";
}

export interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
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
