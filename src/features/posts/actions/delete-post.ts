"use server";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postDeleteSchema } from "../schemas/post-delete-schema";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.post.delete({
      where: {
      id
      }
    });
    return {
     success: true,
   }
  });
