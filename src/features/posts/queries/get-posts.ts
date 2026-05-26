import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";
import { SearchParams } from "../types/search-params";

interface postWithUser extends Post {
  user: User;
}
export const getPosts = async (
  userId: string | undefined,
  searchParams: SearchParams
): Promise<postWithUser[]> => {
  return prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId,
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
    },
  });
};
