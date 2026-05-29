import Image from "next/image";

interface PostImagesProps {
  images: string[];
}

const PostImages = ({ images }: PostImagesProps) => {
  if (!images || images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="mt-3 rounded-xl overflow-hidden border w-full h-64 relative">
        <Image
          src={images[0]}
          alt="post image"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-1 aspect-[2/1] sm:aspect-video rounded-xl overflow-hidden border">
        <div className="relative w-full h-full">
          <Image src={images[0]} alt="post image" fill className="object-cover" />
        </div>
        <div className="relative w-full h-full">
          <Image src={images[1]} alt="post image" fill className="object-cover" />
        </div>
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="mt-3 grid grid-cols-3 gap-1 aspect-[3/1] sm:aspect-video rounded-xl overflow-hidden border">
        <div className="relative w-full h-full"><Image src={images[0]} alt="post image" fill className="object-cover" /></div>
        <div className="relative w-full h-full"><Image src={images[1]} alt="post image" fill className="object-cover" /></div>
        <div className="relative w-full h-full"><Image src={images[2]} alt="post image" fill className="object-cover" /></div>
      </div>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-4 gap-1 aspect-[4/1] sm:aspect-video rounded-xl overflow-hidden border">
      <div className="relative w-full h-full"><Image src={images[0]} alt="post image" fill className="object-cover" /></div>
      <div className="relative w-full h-full"><Image src={images[1]} alt="post image" fill className="object-cover" /></div>
      <div className="relative w-full h-full"><Image src={images[2]} alt="post image" fill className="object-cover" /></div>
      <div className="relative w-full h-full"><Image src={images[3]} alt="post image" fill className="object-cover" /></div>
    </div>
  );
};

export default PostImages;