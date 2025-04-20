import { Select, SelectValue, SelectContent, SelectTrigger, SelectItem } from "@/components/ui/select"

import { TaskPrioritySelectProps } from "../types"

export default function TaskPrioritySelect({ value, onValueChange, errors }: TaskPrioritySelectProps) {
    return (
        <Select
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger className={errors?.priority ? "border-red-500" : ""}>
                <SelectValue placeholder="Seleccionar prioridad" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Alta">Alta</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Baja">Baja</SelectItem>
            </SelectContent>
        </Select>
    )
}
