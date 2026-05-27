import Comments from "@/features/comment/components/comments";
import PostItem from "@/features/posts/components/post-item";
import { getPost } from "@/features/posts/queries/get-post";
interface Props  {
    params: Promise<{ id: string}>
}

async function SinglePost({ params }: Props) {
    const { id } = await params;
    const post = await getPost(id);
    
    
    
    if (!post) {
        return <h2>Post not found.</h2>
    }

    return <>
        <PostItem {...post} isCard={false} />
        <Comments postId={post.id}/>
    </>
}

export default SinglePost


