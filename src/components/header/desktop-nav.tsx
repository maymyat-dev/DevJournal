"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  profilePath: string;
  postsPath: string;
}

export function DesktopNav({ profilePath, postsPath }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1.5 mr-2">
      
      <Button
        variant="ghost"
        className={cn(
          "relative rounded-lg font-medium h-9 px-4 transition-colors duration-300 group",
          pathname === "/" 
            ? "text-primary" 
            : "hover:text-primary"
        )}
        asChild
      >
        <Link href="/">
          Home
          <span 
            className={cn(
              "absolute bottom-0 left-2 right-2  h-0.5 rounded-full transition-all duration-300",
              pathname === "/" 
                ? "bg-primary scale-x-100" 
                : "bg-primary/40 scale-x-0 group-hover:scale-x-100"
            )} 
          />
        </Link>
      </Button>

      <Button
        variant="ghost"
        className={cn(
          "relative rounded-lg font-medium h-9 px-4 transition-colors duration-300 group",
          pathname === profilePath 
            ? "text-primary" 
            : "hover:text-primary"
        )}
        asChild
      >
        <Link href={profilePath}>
          Profile
          <span 
            className={cn(
              "absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-all duration-300",
              pathname === profilePath 
                ? "bg-primary scale-x-100" 
                : "bg-primary/40 scale-x-0 group-hover:scale-x-100"
            )} 
          />
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={cn(
          "relative rounded-lg font-medium h-9 px-4 transition-colors duration-300 group",
          pathname === postsPath 
            ? "text-primary" 
            : "hover:text-primary"
        )}
        asChild
      >
        <Link href={postsPath}>
          My Posts
          <span 
            className={cn(
              "absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-all duration-300",
              pathname === postsPath 
                ? "bg-primary scale-x-100" 
                : "bg-primary/40 scale-x-0 group-hover:scale-x-100"
            )} 
          />
        </Link>
      </Button>

    </nav>
  );
}