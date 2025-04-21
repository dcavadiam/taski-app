export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  status: string;
  dueDate: string;
  pendingTasks: number;
  completedTasks: number;
  inProgressTasks: number;
}

export interface ProjectStore {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateTitleProject: (id: string, title: string) => void;
  deleteProject: (id: string) => void;
  updateProjectStats: (projectName: string) => void;
}

export interface ProjectCardProps {
  project: Project;
  getStatusColor: (status: string) => string;
}
export interface ProjectCardHomeProps {
  title: string;
  url: string;
}

export interface CreateProjectModalProps {
  project?: Project;
  mode?: "create" | "edit";
}
