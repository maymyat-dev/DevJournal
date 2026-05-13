
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "../types/post";
import { updatePost } from "../actions/edit-posts";

type EditPostFormProps = {
    post: Post;
}

const EditPostForm = ({ post }: EditPostFormProps) => {
    const updatePostWithId = updatePost.bind(null, post.id as string)
   
  return (
    <Card>
        <CardHeader>
          <CardTitle>Edit post</CardTitle>
          <CardDescription>This will update the post</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updatePostWithId} className="space-y-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" defaultValue={post.title} />
            </div>

            <div>
              <label htmlFor="body">Description</label>
              <Textarea id="body" name="body" defaultValue={post.body}></Textarea>
            </div>

                  <Button type="submit">Update</Button>
          </form>
        </CardContent>
      </Card>
  )
}

export default EditPostForm