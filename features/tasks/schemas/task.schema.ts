import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede tener más de 100 caracteres"),
  description: z.string().optional(),
  status: z
    .enum(["Pendiente", "En progreso", "Completada"], {
      errorMap: () => ({ message: "El estado es requerido" }),
    })
    .default("Pendiente"),
  priority: z
    .enum(["Alta", "Media", "Baja"], {
      errorMap: () => ({ message: "La prioridad es requerida" }),
    })
    .default("Media"),
  project: z.string().optional(),
  dueDate: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
