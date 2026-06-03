import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DesktopNavProps {
  profilePath: string;
  postsPath: string;
}

export function DesktopNav({
  profilePath,
  postsPath,
}: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-1 mr-2">
      <Button
        variant="ghost"
        className="rounded-lg text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href={profilePath}>Profile</Link>
      </Button>

      <Button
        variant="ghost"
        className="rounded-lg text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href={postsPath}>My Posts</Link>
      </Button>
    </nav>
  );
}