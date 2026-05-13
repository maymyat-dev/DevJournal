import z from "zod";

export const postUpdateSchema = z.object({
    id: z.string(),
  title: z.string().min(3).max(100),
  body: z.string().min(5),
});
