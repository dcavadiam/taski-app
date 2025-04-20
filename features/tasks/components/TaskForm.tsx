import { useState, useEffect } from "react"

import { X } from "lucide-react"
import { ZodError } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useTaskStore } from "../store/useTaskStore"
import TaskStatusSelect from "./TaskStatusSelect"
import { taskSchema, TaskFormData } from "../schemas/task.schema"
import TaskPrioritySelect from "./TaskPrioritySelect"

import { TaskFormProps } from "../types"

import { toast } from "sonner"

export default function TaskForm({ isOpen, onClose, taskToEdit }: TaskFormProps) {
    const { addTask, updateTask } = useTaskStore()
    const [formData, setFormData] = useState<Partial<TaskFormData>>({
        title: "",
        description: "",
        status: "Pendiente",
        priority: "Media",
        project: "",
        dueDate: ""
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
                status: taskToEdit.status,
                priority: taskToEdit.priority,
                project: taskToEdit.project,
                dueDate: taskToEdit.dueDate
            })
        }
    }, [taskToEdit])

    const validateField = (field: keyof TaskFormData, value: unknown) => {
        try {
            const fieldSchema = taskSchema.shape[field]
            if (fieldSchema) {
                fieldSchema.parse(value)
                setErrors(prev => {
                    const newErrors = { ...prev }
                    delete newErrors[field]
                    return newErrors
                })
                return true
            }
            return false
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.errors[0]?.message || "Campo inválido"
                setErrors(prev => ({
                    ...prev,
                    [field]: message
                }))
            }
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const validatedData = taskSchema.parse({
                ...formData,
                id: taskToEdit?.id || crypto.randomUUID()
            })

            if (taskToEdit) {
                updateTask(validatedData)
                toast("Tarea actualizada correctamente", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })
            } else {
                addTask(validatedData)
                toast("Tarea creada correctamente", {
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                })  
            }

            setFormData({
                title: "",
                description: "",
                status: "Pendiente",
                priority: "Media",
                project: "",
                dueDate: ""
            })
            onClose()
            
        } catch (error) {
            if (error instanceof Error) {
                setErrors(prev => ({
                    ...prev,
                    form: error.message
                }))
            }
        }
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />
            <div className={`fixed right-0 top-0 h-full w-[500px] bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{taskToEdit ? "Editar Tarea" : "Nueva Tarea"}</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Título</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({ ...formData, title: e.target.value })
                                    validateField("title", e.target.value)
                                }}
                                placeholder="Título de la tarea"
                                className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && (
                                <p className="text-sm text-red-500">{errors.title}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Descripción</label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData({ ...formData, description: e.target.value })
                                    validateField("description", e.target.value)
                                }}
                                placeholder="Descripción de la tarea"
                                className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Estado</label>
                            <TaskStatusSelect
                                value={formData.status}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, status: value as "Pendiente" | "En progreso" | "Completada" })
                                    validateField("status", value)
                                }}
                            />
                            {errors.status && (
                                <p className="text-sm text-red-500">{errors.status}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Prioridad</label>
                            <TaskPrioritySelect
                                value={formData.priority}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, priority: value as "Alta" | "Media" | "Baja" })
                                    validateField("priority", value)
                                }}
                                errors={errors}
                            />
                            {errors.priority && (
                                <p className="text-sm text-red-500">{errors.priority}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Proyecto</label>
                            {/* TODO: Agregar un select para seleccionar un proyecto existente, si no existe un proyecto, se debe crear uno nuevo */}
                            <Input
                                value={formData.project}
                                onChange={(e) => {
                                    setFormData({ ...formData, project: e.target.value })
                                    validateField("project", e.target.value)
                                }}
                                placeholder="Nombre del proyecto"
                                className={errors.project ? "border-red-500" : ""}
                            />
                            {errors.project && (
                                <p className="text-sm text-red-500">{errors.project}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Fecha de vencimiento</label>
                            <Input
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => {
                                    setFormData({ ...formData, dueDate: e.target.value })
                                    validateField("dueDate", e.target.value)
                                }}
                                className={errors.dueDate ? "border-red-500" : ""}
                            />
                            {errors.dueDate && (
                                <p className="text-sm text-red-500">{errors.dueDate}</p>
                            )}
                        </div>

                        <div className="mt-auto pt-6">
                            
                            <Button type="submit" className="w-full">
                                {taskToEdit ? "Guardar Cambios" : "Crear Tarea"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
} 