import React from 'react'
import { CommentWithUsername } from "../types/comment-username";

interface CommentItemProps {
  comment: CommentWithUsername;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const firstLetter = comment.user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="group relative flex items-start space-x-3 rounded-xl border p-4 transition-all duration-200 ">
      
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full ">
        {firstLetter}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          {/* User Name */}
          <span className="text-sm font-medium">
            {comment.user?.name || "Anonymous"}
          </span>
          
          <span className="text-xs">
            {new Date(comment.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <p className="text-sm leading-relaxed whitespace-pre-line">
          {comment.content}
        </p>
      </div>

    </div>
  )
}

export default CommentItem