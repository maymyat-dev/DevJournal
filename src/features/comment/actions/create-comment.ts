"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { loginPath, postsPath, singlePostPath } from "@/path";
import { getSession } from "@/lib/getSession";
import { commentCreateSchema } from "../schemas/comment-create";
import { redirect } from "next/navigation";

export const createComment = actionClient
  .inputSchema(commentCreateSchema)
  .action(async ({ parsedInput }) => {
    const { content, postId } = parsedInput;
    const session = await getSession();

     if (!session) redirect(loginPath);

    await prisma.comment.create({
      data: {
        content, 
        userId: session.user.id,
        postId
      },
    });

    revalidatePath(singlePostPath(postId));

    return {
      success: true,
    };
  });
