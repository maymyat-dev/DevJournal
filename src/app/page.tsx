import Heading from "@/components/heading";
import PostList from "@/features/posts/components/post-list";
import { SearchParams } from "@/features/posts/types/search-params";
import { Suspense } from "react";


type Props = {
  searchParams: Promise<SearchParams>;
}
async function Page({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main className='mb-10'>
      <Heading title="All Posts" description="View all posts" />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList searchParams={params} />
      </Suspense>
    </main>
  );
}

export default Page;
