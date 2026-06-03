import { Skeleton } from "@/components/ui/skeleton";

function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div 
          key={index} 
          className="rounded-2xl border border-border/50 bg-card/40 p-5 space-y-4 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostListSkeleton