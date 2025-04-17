import Link from "next/link";

import { SquareCheckBig, LayoutDashboard, Folder, ListCheck } from "lucide-react"

export default function Sidebar() {
    return (
        <aside className="w-1/6 h-full p-4 flex flex-col gap-6 border-r border-b-gray-400">
            <h1 className="flex items-center gap-1 text-2xl font-bold">
                <SquareCheckBig strokeWidth={2.5} />
                Taski
            </h1>
            <nav>
                <ul className="flex flex-col gap-1">
                    <li>
                        <Link href="/" className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white">
                            <LayoutDashboard strokeWidth={1.5} />
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white">
                            <Folder strokeWidth={1.5} />
                            Proyectos
                        </Link>
                    </li>
                    <li>
                        <Link href="/tasks" className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white">
                            <ListCheck strokeWidth={1.5} />
                            Tareas
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

