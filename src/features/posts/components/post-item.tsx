import React from 'react'
import { Post } from '../types/post'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { SINGLE_POST } from '@/path'
import { MoveUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props extends Post {
    isCard?: boolean
}

function PostItem({id, title, body, isCard = true} : Props) {
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
    </Card>
  )
}

export default PostItem