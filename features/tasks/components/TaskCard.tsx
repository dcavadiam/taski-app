import { Card, CardContent } from "@/components/ui/card";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, LoaderCircle, CircleAlert, Pencil, Trash, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "../store/useTaskStore";
import { useState } from "react";
import TaskForm from "./TaskForm";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "sonner";

export default function TaskCard({ task }: { task: Task }) {
    const { title, description, project, status, priority }: Task = task;
    const { deleteTask, updateTask } = useTaskStore();
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
    };

    const handleDelete = () => {
        deleteTask(task.id);
        toast("Tarea eliminada correctamente", {
            action: {
                label: "Deshacer",
                onClick: () => console.log("Undo"),
            },
        });
    };

    return (
        <>
            <Card className="group hover:shadow-md transition-all duration-200">
                <CardContent className="py-4 px-6">
                    <div className="flex gap-4 items-start">
                        <div className="pt-1">
                            <StatusIcon className={cn("h-6 w-6", statusColor)} />
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{title}</h3>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="hover:bg-accent" onClick={() => setIsFormOpen(true)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
                                                <Trash className="h-4 w-4" />
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
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="hover:bg-accent">
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={handleMarkAsCompleted}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <CircleCheckBig className="h-4 w-4" />
                                                        <span>Marcar como completada</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )
                                    }
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "text-xs px-2 py-1 rounded-full font-medium",
                                    priorityConfig[priority as keyof typeof priorityConfig]
                                )}>
                                    {priority}
                                </span>
                                <span className="text-sm text-muted-foreground">
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


