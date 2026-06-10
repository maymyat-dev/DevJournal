import { Button } from "@/components/ui/button";
import { getCommunityStats } from "@/features/profile/queries/get-community-stats";
import Link from "next/link";
const CommunityStats = async() => {
      const stats = await getCommunityStats()
  return (
          <div className="rounded-md border border-border/50 bg-card p-5 shadow-xs">
        <h3 className="text-base font-bold tracking-tight mb-4 text-foreground flex items-center gap-2">
          Community Stats
        </h3>
        
        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Members</span>
            <span className="font-semibold text-primary">{stats.totalMembers }</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Posts</span>
            <span className="font-semibold text-foreground">{stats.totalPosts}</span>
          </div>
        </div>

        <Button asChild className="w-full rounded-xl font-medium shadow-sm transition-all active:scale-98">
              <Link href="/posts">
              Create Post</Link>
        </Button>
      </div>
  )
}

export default CommunityStats