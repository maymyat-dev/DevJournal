import { loginPath, postsPath, profilePath, registerPath } from "@/path";
import Link from "next/link";
import { ModeToggle } from "./header/mode-toggle";
import { Button } from "./ui/button";
import { BookOpenText, LogOut, Menu, User, FileText } from "lucide-react";
import { signOut } from "@/features/auth/actions/signout";
import { getSession } from "@/lib/getSession";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

async function Header() {
  const session = await getSession();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between">
        
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform duration-200 active:scale-98"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-xs">
            <BookOpenText className="h-5 w-5" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-tight sm:text-xl leading-none">
              ShareNest
            </h1>
            <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
              Share your ideas with the world
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {session ? (
            <>
              <nav className="hidden md:flex items-center gap-1 mr-2">
                <Button variant="ghost" className="rounded-lg text-muted-foreground hover:text-foreground" asChild>
                  <Link href={profilePath}>Profile</Link>
                </Button>
                <Button variant="ghost" className="rounded-lg text-muted-foreground hover:text-foreground" asChild>
                  <Link href={postsPath}>My Posts</Link>
                </Button>
              </nav>

              <form action={signOut} className="hidden sm:block">
                <Button 
                  type="submit"
                  variant="outline" 
                  size="sm"
                  className="rounded-lg gap-2 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200 active:scale-95"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Sign out</span>
                </Button>
              </form>
              <div className="md:hidden">
                <MobileNav profilePath={profilePath} postsPath={postsPath} />
              </div>
            </>
          ) : (
           
            <SignInAndSignUpButton />
          )}
          
          <div className="border-l border-border/60 pl-2 sm:pl-3">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;


function SignInAndSignUpButton() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button variant="ghost" size="sm" className="rounded-lg font-medium text-muted-foreground hover:text-foreground" asChild>
        <Link href={loginPath}>Sign in</Link>
      </Button>

      <Button size="sm" className="rounded-lg px-4 font-medium shadow-xs transition-all duration-200 hover:opacity-95 active:scale-95" asChild>
        <Link href={registerPath}>Sign up</Link>
      </Button>
    </div>
  );
}

interface MobileNavProps {
  profilePath: string;
  postsPath: string;
}

function MobileNav({ profilePath, postsPath }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-border/50">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-70 sm:w-75 pt-12">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="flex flex-col gap-2 px-4">
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-11 text-base" asChild>
            <Link href={profilePath}>
              <User className="h-5 w-5 text-muted-foreground" />
              Profile
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl h-11 text-base" asChild>
            <Link href={postsPath}>
              <FileText className="h-5 w-5 text-muted-foreground" />
              My Posts
            </Link>
          </Button>
          
          <div className="my-2 border-t border-border" />
          
          <form action={signOut} className="w-full sm:hidden">
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