import { getSession } from "@/lib/getSession";
import { postsPath, profilePath } from "@/path";

import { HeaderLogo } from "./header-logo";
import { DesktopNav } from "./desktop-nav";
import { AuthButtons } from "./auth-buttons";
import { SignOutButton } from "./sign-out-button";
import { ModeToggle } from "./mode-toggle";
import { MobileNav } from "./mobile-nav";
import SearchInput from "../search-input";

async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white dark:bg-black backdrop-blur-md transition-all duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        
        <div className="flex shrink-0 items-center">
          <HeaderLogo />
        </div>

        <div className="hidden md:flex flex-1 items-center pl-6">
          {session && (
            <DesktopNav profilePath={profilePath} postsPath={postsPath} />
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl justify-end">
          
          {session && (
            <div className="hidden lg:block w-full max-w-md transition-all duration-300 focus-within:max-w-lg">
              <SearchInput placeholder="Search posts..." />
            </div>
          )}

          {session ? (
            <>
              <div className="hidden md:block shrink-0">
                <SignOutButton />
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <AuthButtons />
            </div>
          )}

          <div className="md:hidden flex items-center shrink-0">
            <MobileNav profilePath={profilePath} postsPath={postsPath} session={!!session}/>
          </div>

          <div className="flex items-center shrink-0">
            <ModeToggle />
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;