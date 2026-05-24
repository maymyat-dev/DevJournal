"use server";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { postDeleteSchema } from "../schemas/post-delete-schema";
import { redirect } from "next/navigation";
import { loginPath } from "@/path";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";

export const deletePost = actionClient
  .inputSchema(postDeleteSchema)
  .action(async ({ parsedInput: { id } }) => {
    const session = await getSession();
    if (!session) {
      redirect(loginPath)
    }

    const owner = await isOwner(session.user.id);

    if (!owner) {
      throw new Error("You are not authorized to delete this post");
    }
    await prisma.post.delete({
      where: {
      id
      }
    });
    return {
     success: true,
   }
  });
