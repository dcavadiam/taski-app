import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface TaskStatusSelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
}

export default function TaskStatusSelect({ value, onValueChange }: TaskStatusSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px] bg-white text-black dark:text-white hover:bg-white/80">
                <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
                <SelectItem value="En progreso">En progreso</SelectItem>
                <SelectItem value="Completada">Completada</SelectItem>
            </SelectContent>
        </Select>
    )
} 