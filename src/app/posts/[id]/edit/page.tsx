import EditPostForm from '@/features/posts/components/edit-post-form'
import { getPost } from '@/features/posts/queries/get-post'
import { notFound } from 'next/navigation'

type EditPostPageProps = {
    params: Promise<{id : string}>
}

const EditPostPage = async({ params }: EditPostPageProps) => {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound()
    }


  return (
      <div>
          <EditPostForm post={post} />
    </div>
  )
}

export default EditPostPage