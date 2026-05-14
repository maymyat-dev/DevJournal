"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { editPostPath, singlePostPath } from '@/path'
import { MoveUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { deletePost } from '../actions/delete-post'
import { Post } from '../../../../generated/prisma/client'
import { Badge } from '@/components/ui/badge'

interface Props extends Post {
    isCard?: boolean
}

function PostItem({ id, title, body, isCard = true, status }: Props) {
    const deletePostHandler = async () => {
        await deletePost(id as string);
    }
  return (
      <Card className='relative'>
          <Badge className='absolute top-4 right-4' variant={status === "IN_PROGRESS" ? "outline" : "default"} >{status}</Badge>
          <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription className={cn(isCard && "line-clamp-2")}>{body}</CardDescription>
          </CardHeader>
          {
              isCard && (
                  <CardContent className='space-x-4'>
                      <Button variant="outline" size="sm" asChild >
                      <Link href={singlePostPath(id)}><MoveUpRight/>Read</Link>
                      </Button>
                      <Button variant="secondary" size="sm" asChild >
                      <Link href={editPostPath(id)}><MoveUpRight/>Edit</Link>
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