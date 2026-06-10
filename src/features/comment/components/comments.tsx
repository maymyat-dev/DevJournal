import React from 'react'
import CreateCommentForm from './create-comment-form'
import { getComments } from '../queries/get-comments'
import CommentItem from './comment-item'

interface CommentsProps {
  postId: string
}
const Comments = async({ postId }: CommentsProps) => {
  const comments = await getComments(postId);
  // console.log(comments)
  return (
    <div className="mt-5 space-y-5">
      <CreateCommentForm />
      <div className="space-y-5">
        {comments.length > 0 && comments.map((comment)=> <CommentItem key={comment.id} comment={comment}  />)}
      </div>
      
    </div>
  )
}

export default Comments