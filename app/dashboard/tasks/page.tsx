'use client'
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Task } from "@/features/tasks/types"
import TaskCard from "@/features/tasks/components/TaskCard"
import { Input } from "@/components/ui/input"
import TaskStatusSelect from "@/features/tasks/components/TaskStatusSelect"
import OrderDateSelect from "@/features/tasks/components/OrderDateSelect"
import TaskForm from "@/features/tasks/components/TaskForm"
import { useState } from "react"

import { useTaskStore } from "@/features/tasks/store/useTaskStore"

export default function TasksPage() {
    const { tasks } = useTaskStore()
    const [isFormOpen, setIsFormOpen] = useState(false)

    return (
        <section className="p-6 rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-scroll py-4 px-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Tareas</h1>
            <div className="flex justify-between items-center mb-6 gap-6">
                <Input placeholder="Buscar tarea" className="bg-white text-black hover:bg-white/80" />
                <TaskStatusSelect />
                <OrderDateSelect />
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Nueva Tarea
                </Button>
            </div>

            <div className="space-y-4">
                {
                    tasks.length > 0 ? (
                        tasks.map((task: Task) => (
                            <TaskCard key={task.id} task={task} />
                        ))
                    ) : (
                        <p>No hay tareas</p>
                    )
                }
            </div>

            <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </section>
    )
} 
