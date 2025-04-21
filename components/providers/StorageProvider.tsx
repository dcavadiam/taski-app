'use client'

import { useEffect, useState } from "react";
import { useLoadTasksFromStorage } from "@/features/tasks/hooks/useLoadTasksFromStorage";
import { useLoadProjectsFromStorage } from "@/features/projects/hooks/useLoadProjectsFromStorage";
import { Loading } from "@/components/ui/loading";

export default function StorageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isLoading, setIsLoading] = useState(true);
    const loadTasks = useLoadTasksFromStorage();
    const loadProjects = useLoadProjectsFromStorage();

    useEffect(() => {
        Promise.all([loadTasks, loadProjects]).finally(() => setIsLoading(false));
    }, [loadTasks, loadProjects]);

    if (isLoading) {
        return <Loading className="h-screen" />;
    }

    return <>{children}</>;
} 