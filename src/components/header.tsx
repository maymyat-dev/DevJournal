
import { loginPath, postsPath, profilePath, registerPath } from "@/path";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { BookOpenText, LogOut } from "lucide-react";
import { signOut } from "@/features/auth/actions/signout";
import { getSession } from "@/lib/getSession";

async function Header() {
  const session = await getSession()
  return (
    <header className="sticky top-0 z-50 mb-5 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <BookOpenText className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              ShareNest
            </h1>
            <p className="text-xs text-muted-foreground">
              Share your ideas with the world
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
         
          {
            session ? <SignOutButton/> : <SignInAndSignUpButton/>
          }
           <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;

function SignInAndSignUpButton() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" className="rounded-lg font-medium" asChild>
        <Link href={loginPath}>Sign in</Link>
      </Button>

      <Button className="rounded-lg px-5 font-medium shadow-sm shadow-primary/20 transition-all duration-200 hover:shadow-md active:scale-95" asChild>
        <Link href={registerPath}>Sign up</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <>
      <Button variant={"link"}>
        <Link href={profilePath}>profile</Link>
      </Button>
      <Button variant={"link"}>
        <Link href={postsPath}>my posts</Link>
      </Button>
    <form action={signOut} className="flex items-center gap-2">
      <Button 
        type="submit"
        variant="outline" 
        className="rounded-lg gap-2 border-muted-foreground/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all duration-200 active:scale-95"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline font-medium">Sign out</span>
      </Button>
      </form>
    </>
  );
}
