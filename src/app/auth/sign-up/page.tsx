import { SignUpForm } from "@/features/auth/components/signup-form";
import Link from "next/link";
import AuthHero from "@/features/auth/components/auth-hero";

const SignUp = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        
        <AuthHero/>

        <div className="flex items-center justify-center px-6 py-6">
          <div className="w-full max-w-md">
            <div className="mb-2">
              <h2 className="text-3xl font-semibold tracking-tight">
                Create account
              </h2>

              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Start writing and exploring today.
              </p>
            </div>

            <SignUpForm />

            <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              Already have an account?
              <span className="cursor-pointer font-medium text-black transition hover:opacity-70 dark:text-white">
                <Link href="/auth/sign-in">Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;