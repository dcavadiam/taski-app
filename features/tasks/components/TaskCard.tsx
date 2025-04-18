import { Card, CardContent } from "@/components/ui/card";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, LoaderCircle, CircleAlert, Pencil, Trash, EllipsisVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TaskCard({ task }: { task: Task }) {
    const { title, description, project, status, priority }: Task = task;

    const statusConfig = {
        "Pendiente": { icon: LoaderCircle, color: "text-gray-500" },
        "En progreso": { icon: CircleAlert, color: "text-yellow-500" },
        "Completada": { icon: CircleCheckBig, color: "text-green-500" }
    };

    const priorityConfig = {
        "Alta": "bg-red-100 text-red-700",
        "Media": "bg-yellow-100 text-yellow-700",
        "Baja": "bg-green-100 text-green-700"
    };

    const StatusIcon = statusConfig[status as keyof typeof statusConfig]?.icon || LoaderCircle;
    const statusColor = statusConfig[status as keyof typeof statusConfig]?.color || "text-gray-500";

    return (
        <Card className="group hover:shadow-md transition-all duration-200">
            <CardContent className="p-4">
                <div className="flex gap-4 items-start">
                    <div className="pt-1">
                        <StatusIcon className={cn("h-6 w-6", statusColor)} />
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{title}</h3>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="sm" className="hover:bg-accent">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="hover:bg-accent">
                                    <EllipsisVertical className="h-4 w-4" />
                                </Button>
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
                                <span className="font-medium">Proyecto:</span> {project}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


