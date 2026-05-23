import AuthHero from "@/features/auth/components/auth-hero";
import { ChangePasswordForm } from "@/features/auth/components/change-password-form";

const ChangePassword = async() => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        
        <AuthHero/>

        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md">

            <ChangePasswordForm/>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;