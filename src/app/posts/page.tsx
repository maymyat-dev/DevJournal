import Heading from "@/components/heading";
import CreatePostForm from "@/features/posts/components/create-post-form";
import PostList from "@/features/posts/components/post-list";
import { Suspense } from "react";
import { getSession } from '@/lib/getSession';
import { loginPath } from '@/path';
import { redirect } from 'next/navigation';
import { SearchParams } from "@/features/posts/types/search-params";

type Props = {
  searchParams: Promise<SearchParams>;
}

async function page({ searchParams }: Props) {
  const params = await searchParams;
   const session = await getSession();
 
  if(!session) {
    redirect(loginPath)
  }
  
  return (
    <main className="max-w-4xl mx-auto">
      <Heading title="All Posts" description="Discover interesting stories, ideas, and perspectives from around the world." />
      
      <div className="mt-5">
        <CreatePostForm/>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PostList userId={session.user.id} searchParams={params} />
      </Suspense>
     
    </main>
  );
}

export default page;
