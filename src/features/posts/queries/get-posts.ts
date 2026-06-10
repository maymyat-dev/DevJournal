import { prisma } from "@/lib/prisma";
import { Post, User } from "../../../../generated/prisma/client";
import { SearchParams } from "../types/search-params";

interface PostWithUser extends Post {
  user: User;
  votes: { value: number; userId: string }[],
  _count: { comment: number }
}

interface PaginatedPosts {
  posts: PostWithUser[];
  totalPages: number;
  currentPage: number;
}

export const getPosts = async (
  userId: string | undefined,
  searchParams: SearchParams,
): Promise<PaginatedPosts> => {
  
  const POSTS_PER_PAGE = 6;
  const currentPage = Number(searchParams.page) || 1;
  const skip = (currentPage - 1) * POSTS_PER_PAGE;
  const tagFilter = searchParams.tag

  const whereCondition = {
    userId,
    title: {
      contains: searchParams.search,
      mode: "insensitive" as const,
    },
    ...tagFilter && {
      tags: {
        has: tagFilter,
      }
    }
  };


  const [totalCount, posts] = await prisma.$transaction([
    prisma.post.count({
      where: whereCondition,
    }),
    prisma.post.findMany({
      orderBy: {
        createdAt: searchParams.sort?.toString() === "asc" ? "asc" : "desc",
      },
      where: whereCondition,
      include: {
        user: true,
        votes: {
          select: {
            value: true,
            userId: true
          }
        },
        _count: {
          select: {
            comment: true
          }
        }
      },
      skip,
      take: POSTS_PER_PAGE,
    }),
  ]);
  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return {
    posts,
    totalPages,
    currentPage,
  };
};
