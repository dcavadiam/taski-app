import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404</h1>
                    <h2 className="text-2xl font-semibold tracking-tight">Página no encontrada</h2>
                    <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>
                </div>
                <div className="space-x-4">
                    <Button asChild>
                        <Link href="/dashboard">
                            Volver al inicio
                        </Link>
                    </Button>
                    {/* <Button variant="outline" asChild>
                        <Link href="/contact">
                            Contactar soporte
                        </Link>
                    </Button> */}
                </div>
            </div>
        </div>
    )
} 