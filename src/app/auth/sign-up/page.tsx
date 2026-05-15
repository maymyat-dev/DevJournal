import AuthImage from "@/features/auth/components/auth-image";
import { SignUpForm } from "@/features/auth/components/signup-form";
import AuthImageSrc from "../../../../public/auth-image.jpg";

const SignUp = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm lg:grid-cols-2 dark:border-zinc-800 dark:bg-zinc-950">
        
        <div className="relative hidden lg:block">
          <AuthImage imageSrc={AuthImageSrc} />

          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute bottom-10 left-10 z-10 max-w-sm text-white">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-300">
              Web Journal
            </p>

            <h1 className="text-4xl font-semibold leading-tight">
              Share your ideas with the world.
            </h1>

            <p className="mt-4 text-sm leading-6 text-zinc-200">
              Write posts, discover premium content, and build your own space
              for learning and creativity.
            </p>
          </div>
        </div>

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
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;