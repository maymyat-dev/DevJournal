import React from 'react'
import CreateCommentForm from './create-comment-form'
import { getComments } from '../queries/get-comments'


const Comments = async() => {
 
  return (
    <div className="mt-5">
      <CreateCommentForm/>
    </div>
  )
}

export default Comments