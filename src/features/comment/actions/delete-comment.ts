"use server";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";
import { loginPath, singlePostPath } from "@/path";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";
import { commentDeleteSchema } from "../schemas/comment-delete";
import { revalidatePath } from "next/cache";

export const deleteComment = actionClient
  .inputSchema(commentDeleteSchema)
  .action(async ({ parsedInput: { commentId } }) => {
    const session = await getSession();
    if (!session) {
      redirect(loginPath);
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || !(await isOwner(comment.userId))) {
      throw new Error("You are not authorized to delete this post");
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath(singlePostPath(comment.postId));
  });
