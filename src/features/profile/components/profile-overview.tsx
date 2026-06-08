import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileOverview } from "../queries/get-profile-overview";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown,
  MessageSquare,
  SquarePen,
  FileText,
  Settings,
} from "lucide-react";
import { postsPath } from "@/path";
import PremiumUpgradeButton from "./premium-upgrade-button";

interface ProfileOverviewProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

const ProfileOverview = async ({ user }: ProfileOverviewProps) => {
  const {
    isPremium,
    postsCount,
    commentsCount,
    premiumExpires,
    premiumAmount,
    premiumCurrency,
    premiumLastPaymentAt,
  } = await getProfileOverview(user.id);

  const formattedExpiry = premiumExpires
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumExpires,
      )
    : "N/A";

  const formattedLastPayment = premiumLastPaymentAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        premiumLastPaymentAt,
      )
    : "N/A";

  const formattedPayment =
    premiumAmount && premiumCurrency
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: premiumCurrency.toUpperCase(),
        }).format(premiumAmount / 100)
      : "N/A";

  const planLabel = isPremium ? "Premium" : "Free";

  return (
    <Card className="overflow-hidden border-border/60 bg-card/50 shadow-lg backdrop-blur-md mt-5">
      <div
        className={`h-36 sm:h-44 w-full transition-all duration-300 relative ${
          isPremium
            ? "bg-linear-to-r from-amber-600 via-orange-500 to-yellow-500"
            : "bg-linear-to-r from-indigo-600 via-violet-500 to-purple-600"
        }`}
      />

      <CardContent className="relative px-4 pb-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 -mt-16 sm:-mt-20 mb-6 pb-6 border-b border-border/40 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-4 ring-background shadow-2xl rounded-3xl bg-background">
              <AvatarImage
                src={user.image ?? ""}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="text-3xl font-extrabold rounded-3xl bg-muted">
                {user.name.charAt(0).toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5 sm:mb-2">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  {user.name}
                </h2>
                {isPremium && (
                  <Badge className="gap-1 rounded-full bg-amber-500 text-white font-semibold px-2.5 py-0.5 text-xs border-none shadow-xs">
                    <Crown className="h-3 w-3 fill-current" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm font-medium text-muted-foreground/90">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:mb-2">
            <Button
              size="sm"
              className="flex-1 sm:flex-initial rounded-xl font-medium shadow-xs transition-all active:scale-95"
              asChild
            >
              <Link href={postsPath}>
                <FileText className="mr-2 h-4 w-4" />
                My Posts
              </Link>
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="flex-1 sm:flex-initial rounded-xl font-medium border-border/80 shadow-xs transition-all hover:bg-muted/50 active:scale-95"
            >
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Card className="border-border/40 bg-background/40 transition-all duration-200 hover:border-indigo-500/30">
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 p-4 sm:p-5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <SquarePen className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground/80 truncate">
                  Total Posts
                </p>
                <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-0.5">
                  {postsCount}
                </h4>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/40 bg-background/40 transition-all duration-200 hover:border-emerald-500/30">
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4 p-4 sm:p-5">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground/80 truncate">
                  Comments
                </p>
                <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground mt-0.5">
                  {commentsCount}
                </h4>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 pt-6 border-t border-border/40 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/85">
            Membership Details
          </h3>

          <div className="grid grid-cols-2 gap-y-3 gap-x-4 p-4 rounded-md bg-muted/30 border border-border/30 text-sm font-medium text-foreground">
            <div className="flex justify-between border-b border-border/20 pb-2 col-span-2 sm:col-span-1">
              <span className="text-muted-foreground">Plan</span>
              <span
                className={
                  isPremium ? "text-amber-500 font-bold" : "font-semibold"
                }
              >
                {planLabel}
              </span>
            </div>
            <div className="flex justify-between border-b border-border/20 pb-2 col-span-2 sm:col-span-1">
              <span className="text-muted-foreground">Expired Date</span>
              <span>{formattedExpiry}</span>
            </div>
            <div className="flex justify-between sm:border-none pb-2 sm:pb-0 col-span-2 sm:col-span-1">
              <span className="text-muted-foreground">Last Payment</span>
              <span>{formattedLastPayment}</span>
            </div>
            <div className="flex justify-between col-span-2 sm:col-span-1">
              <span className="text-muted-foreground">Amount Paid</span>
              <span>{formattedPayment}</span>
            </div>
          </div>

          {!isPremium && (
            <div className="flex justify-end pt-2">
              <PremiumUpgradeButton />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
