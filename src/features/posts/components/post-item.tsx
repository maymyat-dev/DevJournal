import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { editPostPath, singlePostPath } from "@/path";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Post, User } from "../../../../generated/prisma/client";
import { Badge } from "@/components/ui/badge";
import { isOwner } from "@/lib/isOwner";
import { getSession } from "@/lib/getSession";
import VoteButtons from "./vote-buttons";
import PostImages from "./post-images";
import { Crown, ArrowRight, Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  images,
  user,
  votes,
  tags,
}: Props) {
  const session = await getSession();
  const currentUserId = session?.user.id;
  const score = votes.reduce((acc, vote) => acc + vote.value, 0);
  const isPremium = user.isPremium;
  const owner = await isOwner(user.id);

  const userVote = currentUserId
    ? votes.find((v) => v.userId === currentUserId)?.value || null
    : null;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-card/60 backdrop-blur-md border-muted/60",
        isPremium && "border-amber-500/30 shadow-md shadow-amber-500/5",
      )}
    >
      {/* {isPremium && (
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 animate-gradient-x" />
  )} */}

      <CardHeader className="space-y-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6 border border-muted-foreground/10">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback className="text-[10px] font-bold">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {user.name}
            </span>

            {isPremium && (
              <Badge
                variant="default"
                className="h-4.5 gap-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[9px] font-black text-white uppercase tracking-wider px-2 border-none shadow-xs shadow-amber-500/20"
              >
                <Crown className="h-2.5 w-2.5 fill-current animate-pulse" />
                Pro
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors duration-200 leading-snug">
            {title}
          </CardTitle>

          <Badge
            variant={status === "IN_PROGRESS" ? "outline" : "default"}
            className={cn(
              "font-semibold uppercase tracking-wider text-[10px] px-2.5 py-0.5 shrink-0",
              status === "IN_PROGRESS" &&
                "text-amber-500 border-amber-500/30 bg-amber-500/5",
            )}
          >
            {status.replace("_", " ")}
          </Badge>
        </div>

        {images?.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-muted/25 bg-muted/10">
            <PostImages images={images} />
          </div>
        )}

        {body && (
          <CardDescription
            className={cn(
              "prose prose-sm dark:prose-invert max-w-none text-muted-foreground/90 leading-relaxed",
              isCard && "line-clamp-3",
            )}
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Link key={tag} href={`/?tag=${tag}`}>
                <Badge
                  variant="secondary"
                  className="text-xs font-normal text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors cursor-pointer rounded-md px-2 py-0"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="flex items-center">
          <VoteButtons
            postId={id}
            initialScore={score}
            initialUserVote={userVote}
          />
        </div>

        <div className="flex items-center sm:gap-2 gap-0">
          {owner && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-250 font-medium text-xs px-3"
              asChild
            >
              <Link href={editPostPath(id)}>
                <Edit3 className="mr-1.5 h-3.5 w-3.5 opacity-80 group-hover:scale-105 transition-transform" />
                <span>Edit</span>
              </Link>
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            className="h-8 rounded-lg font-semibold text-xs px-4 shadow-sm shadow-primary/10 transition-all duration-200 hover:shadow-md active:scale-98"
            asChild
          >
            <Link href={singlePostPath(id)}>
              <span>Read Post</span>
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 opacity-90 transition-transform duration-250 group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default PostItem;
