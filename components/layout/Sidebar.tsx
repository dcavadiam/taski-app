'use client'
import Link from "next/link";
import { useState } from "react";
import { SquareCheckBig, Folder, ListCheck, Menu, X, HomeIcon } from "lucide-react"

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden fixed z-50 p-1.5 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'left-[11rem]' : 'left-2'} top-2`}>
                {isOpen ? <X size={20} className="text-gray-600 dark:text-gray-300" /> : <Menu size={20} className="text-gray-600 dark:text-gray-300" />}
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed lg:static w-[14rem] h-full p-4 top-0 left-0 flex flex-col gap-6 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-40`}>
                <h1 className="flex items-center gap-1 text-2xl font-bold">
                    <SquareCheckBig strokeWidth={2.5} />
                    Taski
                </h1>
                <nav>
                    <ul className="flex flex-col gap-1">
                        <li>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <HomeIcon strokeWidth={1.5} />
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/projects"
                                className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <Folder strokeWidth={1.5} />
                                Proyectos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/dashboard/tasks"
                                className="flex items-center gap-1 text-sm font-semibold p-2 rounded-md transition-colors hover:bg-purple-secondary hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                <ListCheck strokeWidth={1.5} />
                                Tareas
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

