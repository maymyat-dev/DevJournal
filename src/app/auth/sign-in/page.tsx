import Link from "next/link";
import { SignInForm } from "@/features/auth/components/signin-form";
import AuthHero from "@/features/auth/components/auth-hero";

const SignIn = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        
        <AuthHero/>

        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md">

            <SignInForm />



            <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            If you don&apos;t have an account, 
              <span className="cursor-pointer font-medium text-black transition hover:opacity-70 dark:text-white">
                <Link href="/auth/sign-up">Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;