import { prisma } from "@/lib/prisma";

export const getCommunityStats = async () => {
    const [totalMembers, totalPosts] = await Promise.all([
        prisma.user.count(),
        prisma.post.count()
    ])
    
    return {
        totalMembers,
        totalPosts
    }
}