"use server"

import { getSession } from "@/lib/getSession";
import { prisma } from "@/lib/prisma";
import { loginPath, postsPath, singlePostPath } from "@/path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const voteOnPost = async (postId: string, value: number) => {
    const session = await getSession();

    if (!session) {
      return redirect(loginPath);
    }

    const userId = session.user.id;

    try {
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        })

        if(existingVote) {
            if (existingVote.value === value) {
                await prisma.vote.delete({
                    where: {
                        id: existingVote.id
                    }
                })
            } else {
                await prisma.vote.update({
                    where: {
                        id: existingVote.id
                    },
                    data: {
                        value
                    }
                })
            }
            
        } else {
            await prisma.vote.create({
                data: {
                    value,
                    userId,
                    postId
                }
            })
        }
        revalidatePath(postsPath);
        revalidatePath(singlePostPath(postId));

        return {
            success: true
        }
    } catch (error) {
        console.error("Error voting on post:", error);
        throw new Error("Error voting on post");
    }
}