import Link from "next/link";
import { FileText, LogOut, Menu, User } from "lucide-react";

import { signOut } from "@/features/auth/actions/signout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavProps {
  profilePath: string;
  postsPath: string;
}

export function MobileNav({
  profilePath,
  postsPath,
}: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg border border-border/50"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-70 sm:w-75 pt-12">
        <SheetTitle className="sr-only">
          Navigation Menu
        </SheetTitle>

        <div className="flex flex-col gap-2 px-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl h-11 text-base"
            asChild
          >
            <Link href={profilePath}>
              <User className="h-5 w-5 text-muted-foreground" />
              Profile
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl h-11 text-base"
            asChild
          >
            <Link href={postsPath}>
              <FileText className="h-5 w-5 text-muted-foreground" />
              My Posts
            </Link>
          </Button>

          <div className="my-2 border-t border-border" />

          <form action={signOut}>
            <Button
              type="submit"
              variant="destructive"
              className="w-full justify-start gap-3 rounded-xl h-11 text-base shadow-xs"
            >
              <LogOut className="h-5 w-5" />
              Sign out
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}