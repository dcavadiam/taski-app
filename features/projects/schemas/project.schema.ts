import { z } from "zod";

export const projectFormSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede tener más de 100 caracteres"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
  status: z
    .enum(["Pendiente", "En progreso", "Completado"], {
      errorMap: () => ({ message: "El estado es requerido" }),
    })
    .default("Pendiente"),
});

export const projectSchema = projectFormSchema.extend({
  id: z.string(),
  progress: z.number().min(0).max(100).default(0),
  pendingTasks: z.number().min(0).default(0),
  completedTasks: z.number().min(0).default(0),
  inProgressTasks: z.number().min(0).default(0),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;
export type Project = z.infer<typeof projectSchema>;
