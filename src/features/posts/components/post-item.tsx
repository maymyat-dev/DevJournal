
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { editPostPath, singlePostPath } from '@/path'
import { MoveUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Post, User } from '../../../../generated/prisma/client'
import { Badge } from '@/components/ui/badge'
import DeleteButton from './delete-button'
import { isOwner } from '@/lib/isOwner'

interface Props extends Post {
    isCard?: boolean
    user: User 
}

async function PostItem({ id, title, body, isCard = true, status, user }: Props) {

  return (
      <Card className='relative'>
          <Badge className='absolute top-4 right-4' variant={status === "IN_PROGRESS" ? "outline" : "default"} >{status}</Badge>
          <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription className={cn(isCard && "line-clamp-2")}>{body}</CardDescription>
              <p>{user.name}</p>
          </CardHeader>
          {
              isCard && (
                  <CardContent className='space-x-4'>
                      <Button variant="outline" size="sm" asChild >
                      <Link href={singlePostPath(id)}><MoveUpRight/>Read</Link>
                      </Button>
                      {
                         await isOwner(user.id) && (
                              <Button variant="outline" size="sm" asChild >
                              <Link href={editPostPath(id)}><MoveUpRight/>Edit</Link>
                              </Button>
                          )
                      }
                  </CardContent>
              )
          }
          
          {
              !isCard && (await isOwner(user.id)) && (
                  <CardContent className='space-x-4'>
                      <DeleteButton id={id} />
                  </CardContent>
              )
          }
          
    </Card>
  )
}

export default PostItem