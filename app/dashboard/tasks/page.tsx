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
import TaskPrioritySelect from "@/features/tasks/components/TaskPrioritySelect"

export default function TasksPage() {
    const { tasks } = useTaskStore()
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined)
    const [priorityFilter, setPriorityFilter] = useState<string | undefined>(undefined)
    const [orderDate, setOrderDate] = useState<string | undefined>(undefined)


    const handleStatusChange = (value: string) => {
        setStatusFilter(value)
    }

    const handlePriorityChange = (value: string) => {
        setPriorityFilter(value)
    }

    const handleOrderDateChange = (value: string) => {
        setOrderDate(value)
    }

    const filteredTasks = tasks.filter((task) => {
        const matchesStatus = !statusFilter || task.status === statusFilter;
        const matchesPriority = !priorityFilter || task.priority === priorityFilter;
        return matchesStatus && matchesPriority;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (orderDate === "asc") {
            const dateA = a.dueDate ? new Date(a.dueDate) : new Date(); // Si no hay fecha, se usa la fecha actual
            const dateB = b.dueDate ? new Date(b.dueDate) : new Date(); // Si no hay fecha, se usa la fecha actual
            return dateA.getTime() - dateB.getTime();
        } else {
            const dateA = a.dueDate ? new Date(a.dueDate) : new Date(); // Si no hay fecha, se usa la fecha actual
            const dateB = b.dueDate ? new Date(b.dueDate) : new Date(); // Si no hay fecha, se usa la fecha actual
            return dateB.getTime() - dateA.getTime();
        }
    })

    return (
        <section className="p-6 rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-scroll py-4 px-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Tareas</h1>
            <div className="flex justify-between items-center mb-6 gap-6">
                <Input placeholder="Buscar tarea" className="bg-white text-black hover:bg-white/80" />
                <TaskStatusSelect value={statusFilter} onValueChange={handleStatusChange} />
                <TaskPrioritySelect value={priorityFilter} onValueChange={handlePriorityChange} />
                <OrderDateSelect value={orderDate} onValueChange={handleOrderDateChange} />
                <Button onClick={() => setIsFormOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Nueva Tarea
                </Button>
            </div>

            <div className="space-y-4">
                {
                    sortedTasks.length > 0 ? (
                        sortedTasks.map((task: Task) => (
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
