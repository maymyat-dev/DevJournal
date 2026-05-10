import PostItem from '@/features/posts/components/post-item'
import { getPosts } from '../queries/get-posts';

async function PostList() {
   const posts = await getPosts();
  return (
      <div>
          {
          posts.map((post) => (
            <PostItem key={post.id} {...post} />
          ))
        }
    </div>
  )
}

export default PostList