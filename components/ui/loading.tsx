'use client'

import { cn } from "@/lib/utils"

export function Loading({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "flex items-center justify-center w-full h-full min-h-[200px]",
                className
            )}
            {...props}
        >
            <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">Cargando...</p>
            </div>
        </div>
    )
} 