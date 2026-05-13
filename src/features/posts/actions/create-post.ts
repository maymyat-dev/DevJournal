"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { postCreateSchema } from "../schemas/post-create-schema";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput }) => {
    const { title, body } = parsedInput;

    await prisma.post.create({
      data: {
        title,
        body,
      },
    });

    revalidatePath(postsPath);

    return {
      success: true,
    };
  });
