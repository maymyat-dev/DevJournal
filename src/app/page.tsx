import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import PostListSkeleton from "@/features/posts/components/post-list-skeleton";
import { SearchParams } from "@/features/posts/types/search-params";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<SearchParams>;
};

async function Page({ searchParams }: Props) {
  const params = await searchParams;
  
  return (
    <main className="container max-w-4xl m-auto mb-16 animate-in fade-in duration-500">
      <Heading 
          title="All Posts" 
          description="Discover interesting stories, ideas, and perspectives from around the world." 
        />

      <Suspense fallback={<PostListSkeleton />}>
        <PostList searchParams={params} />
      </Suspense>
    </main>
  );
}

export default Page;

