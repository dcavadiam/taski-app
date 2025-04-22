'use client'
import Link from "next/link";
import { useState } from "react";
import { SquareCheckBig, Folder, ListCheck, Menu, X, HomeIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden fixed z-51 p-1.5 rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'left-[11rem]' : 'left-2'} top-2`}>
                {isOpen ? <X size={20} className="text-gray-600 dark:text-gray-300" /> : <Menu size={20} className="text-gray-600 dark:text-gray-300" />}
            </button>

            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed lg:static top-0 left-0 lg:h-[calc(100vh-1rem)] h-screen max-lg:bg-white max-lg:dark:bg-gray-700 w-56 p-6 flex flex-col gap-8 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} z-50`}>
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
                    <div className="mt-4 border-t dark:border-gray-200 border-gray-700 pt-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleTheme}
                            className="w-fit justify-start text-sm font-semibold p-2 rounded-md "
                        >
                            {theme === "dark" ? (
                                <>
                                    Oscuro
                                    <Moon className="h-4 w-4 mr-2" />
                                </>
                            ) : (
                                <>
                                    Claro
                                    <Sun className="h-4 w-4 mr-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </nav>
            </aside>
        </>
    )
}

