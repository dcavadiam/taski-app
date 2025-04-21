'use client'
import { SquarePlus } from "lucide-react"
import { useProjectStore } from "@/features/projects/store/useProjectStore"
import ProjectCard from "@/features/projects/components/ProjectCard"
import CreateProjectModal from "@/features/projects/components/CreateProjectModal"

export default function ProjectsPage() {
    const { projects } = useProjectStore();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En progreso":
                return "bg-blue-500"
            case "Casi completado":
                return "bg-yellow-500"
            default:
                return "bg-green-500"
        }
    }

    return (
        <div className="max-lg:mt-8 p-6 rounded-xl bg-accent lg:h-[calc(100vh-2rem)] h-auto lg:overflow-y-scroll py-4 px-5 flex flex-col gap-4 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-6 lg:gap-6 gap-2">
                <div>
                    <h1 className="text-3xl font-bold">Proyectos</h1>
                    <p className="text-muted-foreground mt-1">Gestiona y monitorea tus proyectos activos</p>
                </div>
                {projects.length > 0 && <CreateProjectModal mode="create" />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    projects.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center gap-4 w-full h-[200px] p-4 rounded-md border-2 border-dashed border-gray-300">
                            <SquarePlus className="w-8 h-8 text-muted-foreground" />
                            <h3 className="text-lg font-medium text-muted-foreground">
                                No hay proyectos creados
                            </h3>
                            <p className="text-sm text-muted-foreground text-center">
                                Crea tu primer proyecto para comenzar a organizar tus tareas
                            </p>
                            <CreateProjectModal mode="create" />
                        </div>
                    ) : (
                        projects.map((project) => (
                            <ProjectCard key={project.id} project={project} getStatusColor={getStatusColor} />
                        ))
                    )
                }
            </div>
        </div>
    )
} 