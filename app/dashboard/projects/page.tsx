import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Plus, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { projects } from "@/features/projects/mocks/index"

export default function ProjectsPage() {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En progreso":
                return "bg-blue-500"
            case "Pendiente":
                return "bg-yellow-500"
            case "Casi completado":
                return "bg-green-500"
            default:
                return "bg-gray-500"
        }
    }

    return (
        <div className="p-6 rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-scroll py-4 px-5 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Proyectos</h1>
                    <p className="text-muted-foreground mt-1">Gestiona y monitorea tus proyectos activos</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Nuevo Proyecto
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(({ id, title, description, progress, status, pendingTasks, completedTasks }) => (
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

                                <div className="flex justify-between items-center pt-4">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-1">
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                            <span className="text-sm">{completedTasks}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                                            <span className="text-sm">{pendingTasks}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">Ver detalles</Button>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
} 