import { getSession } from "@/lib/getSession";
import { postsPath, profilePath } from "@/path";

import { HeaderLogo } from "./header-logo";
import { DesktopNav } from "./desktop-nav";
import { AuthButtons } from "./auth-buttons";
import { SignOutButton } from "./sign-out-button";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";

async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <HeaderLogo />

        <div className="flex items-center gap-2 sm:gap-3">
          {session ? (
            <>
              <DesktopNav
                profilePath={profilePath}
                postsPath={postsPath}
              />

              <SignOutButton />

              <div className="md:hidden">
                <MobileNav
                  profilePath={profilePath}
                  postsPath={postsPath}
                />
              </div>
            </>
          ) : (
            <AuthButtons />
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