import z from "zod";

export const postCreateSchema = z.object({
    title: z.string().min(3).max(100),
    body: z.string().min(5)
})