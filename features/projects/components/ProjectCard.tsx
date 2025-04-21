import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCardProps } from "../types";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CreateProjectModal from "./CreateProjectModal";
import Link from "next/link";

export default function ProjectCard({ project, getStatusColor }: ProjectCardProps) {
    const { id, title, description, status, progress, completedTasks, pendingTasks, inProgressTasks } = project;
    return (
        <Card key={id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl">{title}</CardTitle>
                        <CardDescription className="mt-2">{description}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(status)} text-white`}>
                        {status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progreso</span>
                            <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-2 xl:gap-4 pt-4">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{completedTasks}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">{inProgressTasks}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">{pendingTasks}</span>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Link href={`/dashboard/projects/${id}`}>
                                <Button variant="outline">Ver detalles</Button>
                            </Link>
                            <CreateProjectModal project={project} mode="edit" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
