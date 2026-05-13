"use server";

import { prisma } from "@/lib/prisma";
import { postsPath } from "@/path";
import { actionClient } from "@/lib/safe-action";
import { postUpdateSchema } from "../schemas/post-update-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updatePost = actionClient
  .inputSchema(postUpdateSchema)
  .action(async ({ parsedInput }) => {
    const { id, title, body } = parsedInput;

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });

    revalidatePath(postsPath);
    redirect(postsPath);
  });
