import CommunityGuideLineCard from "./community-guideline-card";
import CommunityStats from "./community-stats";

export async function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col gap-6 w-80 shrink-0 sticky top-22 h-fit">
      <CommunityStats />

      <CommunityGuideLineCard />
    </aside>
  );
}
