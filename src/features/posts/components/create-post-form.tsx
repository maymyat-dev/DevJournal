
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
import { createPost } from "@/features/posts/actions/create-post";
const CreatePostForm = () => {

  return (
    <Card>
        <CardHeader>
          <CardTitle>Create new post</CardTitle>
          <CardDescription>This will be create new post</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="space-y-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" name="title" />
            </div>

            <div>
              <label htmlFor="body">Description</label>
              <Textarea id="body" name="body"></Textarea>
            </div>

          <Button type="submit">Create</Button>
          </form>
        </CardContent>
      </Card>
  )
}

export default CreatePostForm