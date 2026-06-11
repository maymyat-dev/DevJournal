import React from 'react'
import { CommentWithUsername } from "../types/comment-username";
import CommentDeleteButton from './comment-delete-button';

interface CommentItemProps {
  comment: CommentWithUsername;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const firstLetter = comment.user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="group relative flex items-start space-x-3 py-4 border-b border-muted/50 last:border-0 transition-all duration-200">
    
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-semibold text-xs">
        {firstLetter}
      </div>
      <div className="flex-1 space-y-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {comment.user?.name || "Anonymous"}
          </span>
          
          <span className="text-xs text-muted-foreground">
            {new Date(comment.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground/90 whitespace-pre-line wrap-break-word pr-2">
          {comment.content}
        </p>
      </div>

      <div className="shrink-0 pt-0.5">
        <CommentDeleteButton id={comment.id}/>
      </div>

    </div>
  )
}

export default CommentItem;