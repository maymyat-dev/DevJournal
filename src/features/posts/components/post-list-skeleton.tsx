import { Skeleton } from "@/components/ui/skeleton";

function PostListSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-md border border-border/50 bg-card/40 p-5 space-y-4 mt-5"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <Skeleton className="h-7 w-2/3" />

          <Skeleton className="h-80 w-full rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-3">
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-14" />
            </div>

            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostListSkeleton