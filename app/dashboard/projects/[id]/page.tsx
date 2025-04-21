'use client'
import { useProjectStore } from "@/features/projects/store/useProjectStore";
import TaskCard from "@/features/tasks/components/TaskCard";
import { useTaskStore } from "@/features/tasks/store/useTaskStore";
import { redirect } from "next/navigation";
import { CalendarDays, Clock, ListTodo, ArrowLeft } from "lucide-react";
import { use, useEffect } from "react";
import Link from "next/link";

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { projects, updateProjectStats } = useProjectStore();
    const project = projects.find((project) => project.id === id);

    if (!project) {
        redirect("/not-found");
    }

    const { tasks } = useTaskStore();
    const projectTasks = tasks.filter(task => task.project === project.title);

    useEffect(() => {
        updateProjectStats(project.title);
    }, [id, tasks, updateProjectStats]);

    return (
        <section className="p-6 rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-auto">
            {/* Botón de navegación */}
            <Link
                href="/dashboard/projects"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white mb-6 transition-colors"
            >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver a Proyectos</span>
            </Link>

            {/* Header del proyecto */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{project?.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project?.description}</p>

                {/* Estadísticas del proyecto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <ListTodo className="w-5 h-5 text-blue-500" />
                            <span className="font-medium">Total Tareas</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{projectTasks.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-purple-500" />
                            <span className="font-medium">Progreso</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{project.progress}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-green-500" />
                            <span className="font-medium">Estado</span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{project.status}</p>
                    </div>
                </div>
            </div>

            {/* Lista de tareas */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-blue-500" />
                    Tareas del Proyecto
                </h2>

                {projectTasks.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">No hay tareas para este proyecto</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projectTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
