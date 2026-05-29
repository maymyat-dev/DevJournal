import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileOverview } from "../queries/get-profile-overview";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Crown, MessageSquare, SquarePen, FileText } from "lucide-react";
import { postsPath } from "@/path";

interface ProfileOverviewProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

const ProfileOverview = async ({ user }: ProfileOverviewProps) => {
  const { isPremium, postsCount, commentsCount } = await getProfileOverview(
    user.id,
  );

  return (
    <Card className="overflow-hidden border-border/50">
      <div className="h-32 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <CardContent className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-5">
          <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
            <AvatarImage src={user.image ?? ""} alt={user.name} />
            <AvatarFallback className="text-3xl font-bold">
              {user.name.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>

              {isPremium && (
                <Badge className="w-fit gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-white shadow">
                  <Crown className="h-3.5 w-3.5 fill-white" />
                  Premium
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button size="sm" className="rounded-full shadow-sm" asChild>
                <Link href={postsPath}>
                  <FileText className="mr-2 h-4 w-4" />
                  View My Posts
                </Link>
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-border/60"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
                <SquarePen className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Total Posts
                </p>

                <h4 className="text-3xl font-bold">{postsCount}</h4>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-500">
                <MessageSquare className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Comments
                </p>

                <h4 className="text-3xl font-bold">{commentsCount}</h4>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
