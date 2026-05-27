import * as z from "zod";

export const commentDeleteSchema = z.object({
    userId: z.string(),
    postId: z.string(),
    

})