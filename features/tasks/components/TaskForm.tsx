import { useState, useEffect } from "react"

import { X } from "lucide-react"
import { ZodError } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useTaskStore } from "../store/useTaskStore"
import { useProjectStore } from "@/features/projects/store/useProjectStore"
import TaskStatusSelect from "./TaskStatusSelect"
import { taskSchema, TaskFormData } from "../schemas/task.schema"
import TaskPrioritySelect from "./TaskPrioritySelect"

import { TaskFormProps } from "../types"

import { showSuccessToast, showErrorToast } from "@/lib/toast"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

export default function TaskForm({ isOpen, onClose, taskToEdit }: TaskFormProps) {
    const { addTask, updateTask } = useTaskStore()
    const { projects } = useProjectStore()
    const { updateProjectStats } = useProjectStore()
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
                description: taskToEdit.description || "",
                status: taskToEdit.status || "Pendiente",
                priority: taskToEdit.priority || "Media",
                project: taskToEdit.project || "",
                dueDate: taskToEdit.dueDate || ""
            })
        }
    }, [taskToEdit])

    const validateField = (field: keyof TaskFormData, value: unknown) => {
        try {
            if (value === "" && (field === "status" || field === "priority")) {
                value = field === "status" ? "Pendiente" : "Media"
            }
            taskSchema.shape[field].parse(value)
            setErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        } catch (error) {
            if (error instanceof ZodError) {
                setErrors(prev => ({
                    ...prev,
                    [field]: error.errors[0].message
                }))
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const validatedData = taskSchema.parse({
                ...formData,
                id: taskToEdit?.id || crypto.randomUUID()
            })

            if (taskToEdit) {
                updateTask(validatedData)
                showSuccessToast("Tarea actualizada correctamente")
            } else {
                addTask(validatedData)
                showSuccessToast("Tarea creada correctamente")
            }

            // Actualizar estadísticas del proyecto
            if (validatedData.project) {
                updateProjectStats(validatedData.project)
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
                showErrorToast("Error al guardar la tarea")
            }
        }
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none "
                    }`}
                onClick={onClose}
            />
            <div className={`fixed overflow-y-scroll right-0 top-0 max-lg:pt-8 h-full w-full sm:w-[500px] bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}>
                <div className="p-4 sm:p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold">{taskToEdit ? "Editar Tarea" : "Nueva Tarea"}</h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3 sm:gap-4">
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
                            {
                                projects.length > 0 ? (
                                    <Select
                                        value={formData.project}
                                        onValueChange={(value) => {
                                            setFormData({ ...formData, project: value })
                                            validateField("project", value)
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona un proyecto" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.title}>
                                                    {project.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No hay proyectos disponibles, crea uno nuevo en la sección de proyectos</p>
                                )
                            }
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

                            <Button type="submit" className="w-full mb-4">
                                {taskToEdit ? "Guardar Cambios" : "Crear Tarea"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
} 