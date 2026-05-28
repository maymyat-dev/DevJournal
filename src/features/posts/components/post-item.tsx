import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { MoveUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Post, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import DeleteButton from "./delete-button";
import { isOwner } from "@/lib/isOwner";
import { getSession } from "@/lib/getSession";
import VoteButtons from "./vote-buttons";

interface Props extends Post {
  isCard?: boolean;
  user: User;
  votes: { value: number; userId: string }[];
}

async function PostItem({
  id,
  title,
  body,
  isCard = true,
  status,
  user,
  votes,
}: Props) {

  const session = await getSession();
  const currentUserId = session?.user.id;
  const score = votes.reduce((acc, vote) => acc + vote.value, 0);

  const userVote = currentUserId ? votes.find((v) => v.userId === currentUserId)?.value || null : null;



  return (
    <Card className="relative">
      <Badge
        className="absolute top-4 right-4"
        variant={status === "IN_PROGRESS" ? "outline" : "default"}
      >
        {status}
      </Badge>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription
          className={cn(isCard && "line-clamp-2", "prose dark:prose-invert prose-sm sm:prose-base max-w-none" )}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <p>{user.name}</p>
        <div>
          <VoteButtons postId={id} initialScore={score} initialUserVote={userVote} />
        </div>
      </CardHeader>
      {isCard && (
        <CardContent className="space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={singlePostPath(id)}>
              <MoveUpRight />
              Read
            </Link>
          </Button>
          {(await isOwner(user.id)) && (
            <Button variant="outline" size="sm" asChild>
              <Link href={editPostPath(id)}>
                <MoveUpRight />
                Edit
              </Link>
            </Button>
          )}
        </CardContent>
      )}

      {!isCard && (await isOwner(user.id)) && (
        <CardContent className="space-x-4">
          <DeleteButton id={id} />
        </CardContent>
      )}
    </Card>
  );
}

export default PostItem;
