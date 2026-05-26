"use server";

import { prisma } from "@/lib/prisma";
import { loginPath, postsPath } from "@/path";
import { actionClient } from "@/lib/safe-action";
import { postUpdateSchema } from "../schemas/post-update-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import { isOwner } from "@/lib/isOwner";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput }) => {
    const { id, title, body, status } = parsedInput;

   const session = await getSession();
    
        if (!session) {
          redirect(loginPath);
    }
    
       const post = await prisma.post.findUnique({
          where: {id}
        })
    
        
        if (!post || !(await isOwner(post.userId))) {
          throw new Error("You are not authorized to update this post");
        }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
        status
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
