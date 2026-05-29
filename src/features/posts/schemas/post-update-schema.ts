import z from "zod";

export const postUpdateSchema = z.object({
  id: z.string(),
  status: z.enum(["DONE", "IN_PROGRESS"]),
  title: z.string().min(3).max(100),
  body: z.string().min(5),
  images: z.array(z.string()).max(4),
  tags: z.array(z.string().trim().min(1).max(20)).max(5),
});
