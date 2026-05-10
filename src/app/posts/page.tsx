import Heading from '@/components/heading'
import PostList from '@/features/posts/components/post-list'
import { Suspense } from 'react'


function page() {
  return (
    <main>
      <Heading title="All Posts" description="View all posts" />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList/>
      </Suspense>
      <div>
        
      </div>
    </main>
  )
}

export default page