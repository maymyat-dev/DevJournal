import Image, { StaticImageData } from "next/image";

type Props = {
  imageSrc: StaticImageData;
};

function AuthImage({ imageSrc }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt="Authentication"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>
  );
}

export default AuthImage;