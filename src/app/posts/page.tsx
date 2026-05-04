import Heading from '@/components/heading'
import {FAKE_POSTS} from '@/data'
import PostItem from '@/features/posts/components/post-item'

function page() {
  return (
    <main>
      <Heading title="All Posts" description="View all posts" />
      <div>
        {
          FAKE_POSTS.map((post) => (
            <PostItem key={post.id} {...post} />
          ))
        }
      </div>
    </main>
  )
}

export default page