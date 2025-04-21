import { SquarePlus, Plus, ArrowRight } from "lucide-react";
import ProjectCardHome from "@/features/projects/components/ProjectCardHome"
import TasksTable from "@/features/tasks/components/TaskTable"
import { Button } from "@/components/ui/button"
import { Task } from "@/features/tasks/types";
import Link from "next/link";

export default function Home() {
  const projects = [
    { id: 1, title: "Proyecto 1", url: "/dashboard/projects" },
    { id: 2, title: "Proyecto 2", url: "/dashboard/projects" },
    { id: 3, title: "Proyecto 3", url: "/dashboard/projects" },
    { id: 4, title: "Proyecto 4", url: "/dashboard/projects" },
  ]

  const recentTasks = [
    {
      id: "1",
      title: "Tarea 1",
      description: "Descripción de la tarea 1",
      dueDate: "2024-01-01",
      status: "Pendiente",
      project: "Proyecto 1",
      priority: "Alta" as const
    },
    {
      id: "2",
      title: "Tarea 2",
      description: "Descripción de la tarea 2",
      dueDate: "2024-01-02",
      status: "En progreso",
      project: "Proyecto 2",
      priority: "Media" as const
    },
    {
      id: "3",
      title: "Tarea 3",
      description: "Descripción de la tarea 3",
      dueDate: "2024-01-03",
      status: "Completada",
      project: "Proyecto 3",
      priority: "Baja" as const
    }
  ]

  return (
    <section className="flex flex-col w-full rounded-xl bg-accent h-[calc(100vh-7rem)] overflow-y-scroll py-6 px-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          ¡Bienvenido de nuevo!
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Aquí puedes ver tus proyectos y tareas más recientes, si deseas ver más, puedes hacerlo en la sección de proyectos y tareas.
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Proyectos recientes</h2>
            <Link
              href="/dashboard/projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Ver más <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {
              projects.slice(0, 4).map(({ id, title, url }) => (
                <ProjectCardHome key={id} title={title} url={url} />
              ))
            }
            <div className="flex flex-col items-center justify-center gap-2 w-full h-[140px] p-4 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 hover:border-primary/50 transition-all duration-300 group">
              <SquarePlus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <h3 className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Crear proyecto
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Tareas recientes</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                <Plus className="w-4 h-4 mr-2" />
                Nueva tarea
              </Button>
              <Link
                href="/dashboard/tasks"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                Ver más <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="rounded-lg border bg-card">
            <TasksTable tasks={recentTasks as Task[]} />
          </div>
        </div>
      </div>
    </section>
  );
}
