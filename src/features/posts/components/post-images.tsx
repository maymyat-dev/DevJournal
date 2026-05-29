import Image from "next/image";

interface PostImagesProps {
  images: string[];
}

const imageGridStyles: Record<number, string> = {
  1: "grid-cols-1 aspect-[4/3] sm:aspect-video",
  2: "grid-cols-2 aspect-[4/2] sm:aspect-[16/10]",
  3: "grid-cols-3 aspect-video",
  4: "grid-cols-4 aspect-[16/10] sm:aspect-video",
};

const imageSizes: Record<number, string> = {
  1: "(max-width: 768px) 100vw, 700px",
  2: "(max-width: 768px) 50vw, 350px",
  3: "33vw",
  4: "25vw",
};

const PostImages = ({ images }: PostImagesProps) => {
  if (!images?.length) return null;

  const displayImages = images.slice(0, 4);

  const gridStyle =
    imageGridStyles[displayImages.length] || imageGridStyles[4];

  const sizes =
    imageSizes[displayImages.length] || imageSizes[4];

  return (
    <div
      className={`mt-3 grid gap-1 overflow-hidden rounded-xl border ${gridStyle}`}
    >
      {displayImages.map((image, index) => (
        <div key={index} className="relative h-full w-full">
          <Image
            src={image}
            alt={`post-image-${index}`}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PostImages;