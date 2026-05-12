"use client"
import { Post } from '../types/post'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { SINGLE_POST } from '@/lib/path'
import { MoveUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { deletePost } from '../actions/delete-post'

interface Props extends Post {
    isCard?: boolean
}

function PostItem({ id, title, body, isCard = true }: Props) {
    const deletePostHandler = async () => {
        await deletePost(id as string);
    }
  return (
      <Card>
          <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription className={cn(isCard && "line-clamp-2")}>{body}</CardDescription>
          </CardHeader>
          {
              isCard && (
                  <CardContent>
                      <Button variant="outline" size="sm" asChild >
                      <Link href={SINGLE_POST(id)}><MoveUpRight/>Read</Link>
                  </Button>
                  </CardContent>
              )
          }
          {
              !isCard && (
                  <CardFooter>
                      <Button variant="destructive" size="sm" onClick={deletePostHandler}>Delete</Button>
                  </CardFooter>
              )
          }
          
    </Card>
  )
}

export default PostItem