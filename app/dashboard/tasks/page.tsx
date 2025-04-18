import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Task } from "@/features/tasks/types"
import TaskCard from "@/features/tasks/components/TaskCard"
import { Input } from "@/components/ui/input"
import TaskStatusSelect from "@/features/tasks/components/TaskStatusSelect"
import OrderDateSelect from "@/features/tasks/components/OrderDateSelect"


export default function TasksPage() {

    const tasks: Task[] = [
        {
            id: 1,
            title: "Tarea 1",
            description: "Descripción de la tarea 1",
            dueDate: "2024-01-01",
            status: "Pendiente",
            project: "Proyecto 1",
            priority: "Alta" as const
        },
        {
            id: 2,
            title: "Tarea 2",
            description: "Descripción de la tarea 2",
            dueDate: "2024-01-02",
            status: "En progreso",
            project: "Proyecto 2",
            priority: "Media" as const
        },
        {
            id: 3,
            title: "Tarea 3",
            description: "Descripción de la tarea 3",
            dueDate: "2024-01-03",
            status: "Completada",
            project: "Proyecto 3",
            priority: "Baja" as const
        }
    ]

    return (
        <section className="p-6 rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-scroll py-4 px-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Tareas</h1>
            <div className="flex justify-between items-center mb-6 gap-6">
                <Input placeholder="Buscar tarea" className="bg-white text-black hover:bg-white/80" />
                <TaskStatusSelect />
                <OrderDateSelect />
                <Button>
                    <Plus className="h-4 w-4" />
                    Nueva Tarea
                </Button>
            </div>

            <div className="space-y-4">
                {/* Ejemplo de tarjeta de tarea */}
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </section>
    )
} 
