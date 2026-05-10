import PostItem from '@/features/posts/components/post-item'
import { getPosts } from '../queries/get-posts';

async function PostList() {
   const posts = await getPosts();
  return (
      <div className='mt-5'>
          {
          posts.map((post) => (
            <div  key={post.id} className='mb-5'>
              <PostItem {...post} />
            </div>
          ))
        }
    </div>
  )
}

export default PostList