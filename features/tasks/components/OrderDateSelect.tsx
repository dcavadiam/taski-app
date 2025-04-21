import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface OrderDateSelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
}

export default function OrderDateSelect({ value, onValueChange }: OrderDateSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-[180px] bg-white text-black dark:text-white hover:bg-white/80">
                <SelectValue placeholder="Ordenar por fecha" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="asc">Más recientes</SelectItem>
                <SelectItem value="desc">Más antiguas</SelectItem>
            </SelectContent>
        </Select>
    )
} 