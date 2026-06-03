import { signOut } from "@/features/auth/actions/signout";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <form action={signOut} className="hidden sm:block">
      <Button
        type="submit"
        variant="outline"
        className="rounded-lg gap-2 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200 active:scale-95"
      >
        <LogOut className="h-4 w-4" />
        <span className="font-medium">Sign out</span>
      </Button>
    </form>
  );
}