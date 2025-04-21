import Link from "next/link";
import { ProjectCardHomeProps } from "../types";

export default function ProjectCardHome({ title, url }: ProjectCardHomeProps) {
    return (
        <Link href={url} className="flex flex-col items-center justify-center gap-2 w-full h-[140px] p-4 bg-purple-secondary rounded-lg hover:bg-purple-secondary/90 transition-colors">
            <h3 className="text-lg font-bold text-white">{title}</h3>
        </Link>
    )
}   
