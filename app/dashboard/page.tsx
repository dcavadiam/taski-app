import { CheckCircle2, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col w-full rounded-xl bg-accent h-[calc(100vh-2rem)] overflow-y-scroll py-6 px-8">
      <div className="flex flex-col mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          ¡Bienvenido a Taski!
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          Tu espacio centralizado para gestionar proyectos y tareas de manera eficiente.
          Organiza tu trabajo, establece prioridades y alcanza tus objetivos.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all">
            <CheckCircle2 className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Gestión de Tareas</h3>
            <p className="text-sm text-muted-foreground">Organiza y prioriza tus tareas de manera efectiva</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all">
            <Clock className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Seguimiento en Tiempo Real</h3>
            <p className="text-sm text-muted-foreground">Monitorea el progreso de tus proyectos</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <h3 className="font-semibold mb-1">Planificación Eficiente</h3>
            <p className="text-sm text-muted-foreground">Establece fechas y gestiona plazos</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">¿Por dónde quieres empezar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/projects">
              <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Proyectos</h3>
                <p className="text-muted-foreground mb-4">Gestiona tus proyectos y organiza tu trabajo</p>
                <div className="flex items-center text-primary">
                  <span className="text-sm">Ir a proyectos</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
            <Link href="/dashboard/tasks">
              <div className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group cursor-pointer">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">Tareas</h3>
                <p className="text-muted-foreground mb-4">Visualiza y gestiona tus tareas pendientes</p>
                <div className="flex items-center text-primary">
                  <span className="text-sm">Ir a tareas</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
