import { Card, CardContent } from "@/components/ui/card";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, LoaderCircle, CircleAlert, Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "../store/useTaskStore";
import { useProjectStore } from "@/features/projects/store/useProjectStore";
import { useState } from "react";
import TaskForm from "./TaskForm";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showSuccessToast, showDeleteToast } from "@/lib/toast";

export default function TaskCard({ task }: { task: Task }) {
    const { title, description, project, status, priority }: Task = task;
    const { deleteTask, updateTask } = useTaskStore();
    const { updateProjectStats } = useProjectStore();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const statusConfig = {
        "Pendiente": { icon: CircleAlert, color: "text-yellow-500" },
        "En progreso": { icon: LoaderCircle, color: "text-gray-500" },
        "Completada": { icon: CircleCheckBig, color: "text-green-500" }
    };

    const priorityConfig = {
        "Alta": "bg-red-100 text-red-700",
        "Media": "bg-yellow-100 text-yellow-700",
        "Baja": "bg-green-100 text-green-700"
    };

    const StatusIcon = statusConfig[status as keyof typeof statusConfig]?.icon || CircleAlert;
    const statusColor = statusConfig[status as keyof typeof statusConfig]?.color || "text-yellow-500";

    const handleMarkAsCompleted = () => {
        updateTask({
            ...task,
            status: "Completada"
        });

        if (project) {
            updateProjectStats(project);
        }

        showSuccessToast("Tarea marcada como completada", {
            label: "Deshacer",
            onClick: () => {
                updateTask({
                    ...task,
                    status: "Pendiente"
                });
                if (project) {
                    updateProjectStats(project);
                }
            }
        });
    };

    const handleDelete = () => {
        deleteTask(task.id);
        if (project) {
            updateProjectStats(project);
        }
        showDeleteToast("Tarea eliminada correctamente");
    };

    return (
        <>
            <Card className="group hover:shadow-md transition-all duration-200">
                <CardContent className="py-3 sm:py-4 px-4 sm:px-6">
                    <div className="flex gap-2 sm:gap-4 items-start">
                        <div className="pt-1">
                            <StatusIcon className={cn("h-5 w-5 sm:h-6 sm:w-6", statusColor)} />
                        </div>

                        <div className="flex-1 space-y-1.5 sm:space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-base sm:text-lg group-hover:text-primary transition-colors">{title}</h3>
                                <div className="flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="hover:bg-accent p-1.5 sm:p-2" onClick={() => setIsFormOpen(true)}>
                                        <Pencil className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive p-1.5 sm:p-2">
                                                <Trash className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta acción no se puede deshacer. Se eliminará permanentemente la tarea `{title}`.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                    Eliminar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    {
                                        status !== "Completada" && (
                                            <Button variant="ghost" size="sm" className="hover:bg-green-500/10 hover:text-green-500" onClick={handleMarkAsCompleted}>
                                                <CircleCheckBig className="h-4 w-4" />
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{description}</p>

                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                <span className={cn(
                                    "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium",
                                    priorityConfig[priority as keyof typeof priorityConfig]
                                )}>
                                    {priority}
                                </span>
                                <span className="text-xs sm:text-sm text-muted-foreground">
                                    {
                                        project ? (
                                            <span className="font-medium">Proyecto: {project}</span>
                                        ) : (
                                            <span className="font-medium">Sin proyecto</span>
                                        )
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <TaskForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                taskToEdit={task}
            />
        </>
    )
}


