
import { aboutPath, loginPath, postsPath, registerPath } from "@/path";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { BookOpenText } from "lucide-react";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <BookOpenText className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
              Web Journal
            </h1>
            <p className="text-xs text-muted-foreground">
              Share your ideas with the world
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href={postsPath}>Posts</Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link href={aboutPath}>About</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <LoginAndRegister />
        </div>
      </div>
    </header>
  );
}

export default Header;

function LoginAndRegister() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" asChild>
        <Link href={loginPath}>Sign in</Link>
      </Button>

      <Button className="rounded-xl px-5" asChild>
        <Link href={registerPath}>Get Started</Link>
      </Button>
    </div>
  );
}

function SignOutButton() {
  return (
    <div>
      <Button variant="destructive">Sign out</Button>
    </div>
  );
}
