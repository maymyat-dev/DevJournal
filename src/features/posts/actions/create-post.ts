"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/lib/safe-action";
import { postsPath } from "@/path";
import { postCreateSchema } from "../schemas/post-create-schema";
import { getSession } from "@/lib/getSession";

export const createPost = actionClient
  .inputSchema(postCreateSchema)
  .action(async ({ parsedInput }) => {
    const { title, body, tags=[] } = parsedInput;
    const session = await getSession();

     if (!session?.user?.id) {
       throw new Error("Unauthorized");
     }

    await prisma.post.create({
      data: {
        title,
        body,
        tags,
        userId: session?.user.id
      },
    });

    revalidatePath(postsPath);

    return {
      success: true,
    };
  });
