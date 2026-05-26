import PostItem from '@/features/posts/components/post-item'
import { getPosts } from '../queries/get-posts';

interface Props {
  userId?: string | undefined
}
async function PostList({userId= undefined  }: Props) {
  

  const posts = await getPosts(userId);

  return (
      <div className='mt-5'>
          {
          posts.map((post) => (
            <div  key={post.id} className='space-y-6 mb-6'>
              <PostItem {...post} />
            </div>
          ))
        }
    </div>
  )
}

export default PostList