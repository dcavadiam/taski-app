import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Task {
    title: string;
    description: string;
    dueDate: string;
    status: string;
    project: string;
    priority: 'Alta' | 'Media' | 'Baja';
}

interface TasksTableProps {
    tasks: Task[];
}

export default function TasksTable({ tasks }: TasksTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha de vencimiento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Proyecto</TableHead>
                    <TableHead>Prioridad</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task, index) => (
                    <TableRow key={index}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>{task.status}</TableCell>
                        <TableCell>{task.project}</TableCell>
                        <TableCell className={
                            task.priority === 'Alta' ? 'text-red-500' :
                                task.priority === 'Media' ? 'text-yellow-500' :
                                    'text-green-500'
                        }>
                            {task.priority}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
} 