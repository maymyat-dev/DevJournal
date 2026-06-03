import Link from "next/link";
import { loginPath, registerPath } from "@/path";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="rounded-lg font-medium text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href={loginPath}>Sign in</Link>
      </Button>

      <Button
        size="sm"
        className="rounded-lg px-4 font-medium shadow-xs transition-all duration-200 hover:opacity-95 active:scale-95"
        asChild
      >
        <Link href={registerPath}>Sign up</Link>
      </Button>
    </div>
  );
}