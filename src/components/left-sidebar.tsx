'use client'
import { Button } from "@/components/ui/button";

export function LeftSidebar() {
  const trendingTags = ["nature", "apple", "react", "tech", "photography"];

  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 shrink-0 sticky top-22 h-fit">

      <div className="rounded-md border border-border/50 bg-card p-5 shadow-xs">
        <h3 className="text-base font-bold tracking-tight mb-4 text-foreground flex items-center gap-2">
          Community Stats
        </h3>
        
        <div className="flex flex-col gap-3 text-sm mb-5">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Active Members</span>
            <span className="font-semibold text-primary">12.4k</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Posts Today</span>
            <span className="font-semibold text-foreground">842</span>
          </div>
        </div>

        <Button className="w-full rounded-xl font-medium shadow-sm transition-all active:scale-98">
          Join Community
        </Button>
      </div>

      <div className="rounded-md border border-border/50 bg-card p-5 shadow-xs">
        <h3 className="text-base font-bold tracking-tight mb-4 text-foreground flex items-center gap-2">
          Trending Tags
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

    </aside>
  );
}