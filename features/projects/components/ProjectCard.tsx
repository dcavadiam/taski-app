import Link from "next/link";
import { ProjectCardProps } from "@/features/projects/types";

export default function ProjectCard({ title, url }: ProjectCardProps) {
    return (
        <Link href={url} className="flex flex-col items-center justify-center gap-2 w-[200px] h-auto p-4 bg-purple-secondary rounded-md">
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </Link>
    )
}   
