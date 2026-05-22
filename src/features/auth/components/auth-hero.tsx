import AuthImage from "./auth-image";
import AuthImageSrc from "../../../../public/auth-image.jpg";

function AuthHero() {
  return (
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
  );
}

export default AuthHero;