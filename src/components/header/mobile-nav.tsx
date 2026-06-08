'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Home, LogIn, LogOut, Menu, User } from "lucide-react";

import { signOut } from "@/features/auth/actions/signout";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose, 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { loginPath } from "@/path";

interface MobileNavProps {
  profilePath: string;
  postsPath: string;
  session: boolean; 
}

export function MobileNav({ profilePath, postsPath, session }: MobileNavProps) {
  const pathname = usePathname();

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
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex flex-col gap-4 px-2">
          
          <div className="flex flex-col gap-1.5">
            
            <SheetClose asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 rounded-xl h-11 text-base transition-all duration-200",
                  pathname === "/"
                    ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                    : "text-foreground/80 hover:bg-muted"
                )}
                asChild
              >
                <Link href="/">
                  <Home className={cn("h-5 w-5", pathname === "/" ? "text-primary" : "text-muted-foreground")} />
                  Home
                </Link>
              </Button>
            </SheetClose>

            {session && (
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-xl h-11 text-base transition-all duration-200",
                    pathname === profilePath
                      ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                  asChild
                >
                  <Link href={profilePath}>
                    <User className={cn("h-5 w-5", pathname === profilePath ? "text-primary" : "text-muted-foreground")} />
                    Profile
                  </Link>
                </Button>
              </SheetClose>
            )}

            {session && (
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-xl h-11 text-base transition-all duration-200",
                    pathname === postsPath
                      ? "bg-primary/10 text-primary font-semibold hover:bg-primary/15"
                      : "text-foreground/80 hover:bg-muted"
                  )}
                  asChild
                >
                  <Link href={postsPath}>
                    <FileText className={cn("h-5 w-5", pathname === postsPath ? "text-primary" : "text-muted-foreground")} />
                    My Posts
                  </Link>
                </Button>
              </SheetClose>
            )}
          </div>

          <div className="border-t border-border/40 my-1 mx-2" />

          {session ? (
            <form action={signOut} className="px-2">
              <SheetClose asChild>
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full justify-start gap-3 rounded-xl h-11 text-base shadow-xs active:scale-98 transition-transform"
                >
                  <LogOut className="h-5 w-5" />
                  Sign out
                </Button>
              </SheetClose>
            </form>
          ) : (
            <div className="px-2">
              <SheetClose asChild>
                <Button
                  variant="default"
                  className="w-full justify-start gap-3 rounded-xl h-11 text-base shadow-xs active:scale-98 transition-transform bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href={loginPath}> 
                    <LogIn className="h-5 w-5" />
                    Sign in
                  </Link>
                </Button>
              </SheetClose>
            </div>
          )}

        </div>
      </SheetContent>
    </Sheet>
  );
}