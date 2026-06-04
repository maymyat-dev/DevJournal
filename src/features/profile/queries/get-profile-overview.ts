"use server"

import { prisma } from "@/lib/prisma"

interface ProfileOverview {
    isPremium: boolean
    postsCount: number
    commentsCount: number
    premiumExpires?: Date | null
    premiumAmount: number | null
    premiumCurrency: string | null
    premiumLastPaymentAt: Date | null
}

export const getProfileOverview = async (userId: string): Promise<ProfileOverview> => {
    const [user, postsCount, commentsCount] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          isPremium: true,
          premiumExpires: true,
          premiumAmount: true,
          premiumCurrency: true,
          premiumLastPaymentAt: true,
        },
      }),
      prisma.post.count({ where: { userId } }),
      prisma.comment.count({ where: { userId } }),
    ]);

    return {
      isPremium: user?.isPremium || false,
      postsCount,
      commentsCount,
      premiumExpires: user?.premiumExpires ?? null,
      premiumAmount: user?.premiumAmount ?? null,
      premiumCurrency: user?.premiumCurrency ?? null,
      premiumLastPaymentAt: user?.premiumLastPaymentAt ?? null,
    };
}