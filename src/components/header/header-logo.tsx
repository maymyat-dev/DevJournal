import Link from "next/link";
import { BookOpenText } from "lucide-react";

export function HeaderLogo() {
  return (
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
  );
}