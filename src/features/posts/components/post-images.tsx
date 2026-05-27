import Image from "next/image";

interface PostImagesProps {
  image: string[];
}

const PostImages = ({ images }: PostImagesProps) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border">
        <Image
          src={images[0]}
          alt="post image"
          className="h-full w-full object-cover max-h-150"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-1 aspect-2/1 sm:aspect-video rounded-xl overflow-hidden border">
        <Image
          src={images[0]}
          alt="post image"
          className="h-full w-full object-cover"
        />
        <Image
          src={images[1]}
          alt="post image"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="mt-3 grid grid-cols-3 gap-1 aspect-3/1 sm:aspect-video rounded-xl overflow-hidden border">
        <Image
          src={images[0]}
          alt="post image"
          className="h-full w-full object-cover"
        />
        <Image
          src={images[1]}
          alt="post image"
          className="h-full w-full object-cover"
        />
        <Image
          src={images[2]}
          alt="post image"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-4 gap-1 aspect-3/1 sm:aspect-video rounded-xl overflow-hidden border">
      <Image
        src={images[0]}
        alt="post image"
        className="h-full w-full object-cover"
      />
      <Image
        src={images[1]}
        alt="post image"
        className="h-full w-full object-cover"
      />
      <Image
        src={images[2]}
        alt="post image"
        className="h-full w-full object-cover"
      />
      <Image
        src={images[3]}
        alt="post image"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default PostImages;
