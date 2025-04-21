'use client'
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "../store/useProjectStore";
import { Plus, Pencil } from "lucide-react";
import { CreateProjectModalProps } from "../types";
import { showSuccessToast, showErrorToast } from "@/lib/toast";
import { projectFormSchema, projectSchema, ProjectFormData } from "../schemas/project.schema";
import { ZodError } from "zod";

export default function CreateProjectModal({ project, mode = 'create' }: CreateProjectModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<ProjectFormData>>({
        title: "",
        description: "",
        status: "Pendiente" as const,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { projects, setProjects } = useProjectStore();

    useEffect(() => {
        if (project && mode === 'edit') {
            setFormData({
                title: project.title,
                description: project.description,
                status: project.status as "Pendiente" | "En progreso" | "Completado",
            });
        }
    }, [project, mode]);

    const validateField = (field: keyof ProjectFormData, value: unknown) => {
        try {
            projectFormSchema.shape[field].parse(value);
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        } catch (error) {
            if (error instanceof ZodError) {
                setErrors(prev => ({
                    ...prev,
                    [field]: error.errors[0].message
                }));
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validatedFormData = projectFormSchema.parse(formData);

            // Verificar duplicados excluyendo el proyecto actual en modo edición
            const isDuplicate = projects.some(p =>
                p.title === validatedFormData.title &&
                (!project || p.id !== project.id)
            );

            if (isDuplicate) {
                showErrorToast("El proyecto ya existe");
                return;
            }

            if (mode === 'create') {
                const newProject = projectSchema.parse({
                    ...validatedFormData,
                    id: Date.now().toString(),
                    progress: 0,
                    pendingTasks: 0,
                    completedTasks: 0,
                    inProgressTasks: 0,
                });
                const updatedProjects = [...projects, newProject];
                setProjects(updatedProjects);
                showSuccessToast("Proyecto creado correctamente");
            } else if (project) {
                const updatedProject = projectSchema.parse({
                    ...project,
                    ...validatedFormData,
                });
                const updatedProjects = projects.map(p =>
                    p.id === project.id ? updatedProject : p
                );
                setProjects(updatedProjects);
                showSuccessToast("Proyecto actualizado correctamente");
            }

            setOpen(false);
            setFormData({ title: "", description: "", status: "Pendiente" as const });
            setErrors({});
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors);
                showErrorToast("Por favor, corrige los errores en el formulario");
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2" variant={mode === 'edit' ? "outline" : "default"}>
                    {mode === 'create' ? <Plus className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                    {mode === 'create' ? 'Crear Proyecto' : ''}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{mode === 'create' ? 'Crear Nuevo Proyecto' : 'Editar Proyecto'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => {
                                setFormData({ ...formData, title: e.target.value });
                                validateField('title', e.target.value);
                            }}
                            placeholder="Nombre del proyecto"
                            aria-invalid={!!errors.title}
                            aria-describedby={errors.title ? "title-error" : undefined}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive" id="title-error">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => {
                                setFormData({ ...formData, description: e.target.value });
                                validateField('description', e.target.value);
                            }}
                            placeholder="Describe tu proyecto"
                            aria-invalid={!!errors.description}
                            aria-describedby={errors.description ? "description-error" : undefined}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive" id="description-error">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <Button type="submit" className="w-full">
                        {mode === 'create' ? 'Crear Proyecto' : 'Guardar Cambios'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 