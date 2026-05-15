import z from "zod";

export const authBaseSchema = z.object({
    email: z.email(),
    password: z.string().min(10)
})