'use client'
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProjectStore } from "../store/useProjectStore";
import { Plus, Pencil } from "lucide-react";
import { Project } from "../types";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

interface CreateProjectModalProps {
    project?: Project;
    mode?: 'create' | 'edit';
}

export default function CreateProjectModal({ project, mode = 'create' }: CreateProjectModalProps) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "En progreso",
    });

    const { projects, setProjects } = useProjectStore();

    useEffect(() => {
        if (project && mode === 'edit') {
            setFormData({
                title: project.title,
                description: project.description,
                status: project.status,
            });
        }
    }, [project, mode]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar duplicados excluyendo el proyecto actual en modo edición
        const isDuplicate = projects.some(p =>
            p.title === formData.title &&
            (!project || p.id !== project.id)
        );

        if (isDuplicate) {
            showErrorToast("El proyecto ya existe");
            return;
        }

        if (mode === 'create') {
            const newProject = {
                id: Date.now().toString(),
                title: formData.title,
                description: formData.description,
                status: formData.status,
                progress: 0,
                dueDate: new Date().toISOString(),
                pendingTasks: 0,
                completedTasks: 0,
                inProgressTasks: 0,
            };

            const updatedProjects = [...projects, newProject];
            setProjects(updatedProjects);
            showSuccessToast("Proyecto creado correctamente");
        } else if (project) {
            const updatedProjects = projects.map(p =>
                p.id === project.id
                    ? { ...p, title: formData.title, description: formData.description }
                    : p
            );
            setProjects(updatedProjects);
            showSuccessToast("Proyecto actualizado correctamente");
        }

        setOpen(false);
        setFormData({ title: "", description: "", status: "Pendiente" });
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
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Nombre del proyecto"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Describe tu proyecto"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {mode === 'create' ? 'Crear Proyecto' : 'Guardar Cambios'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
} 