import EditPostForm from '@/features/posts/components/edit-post-form'
import { getPost } from '@/features/posts/queries/get-post'
import { isOwner } from '@/lib/isOwner'
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

    const owner = await isOwner(post.user.id);

    if (!owner) {
        notFound();
    }


  return (
      <div className="max-w-4xl mx-auto">
          <EditPostForm post={post} />
    </div>
  )
}

export default EditPostPage