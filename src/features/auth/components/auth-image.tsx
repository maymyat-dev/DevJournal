import Image, { StaticImageData } from "next/image";

type Props = {
  imageSrc: StaticImageData;
};

function AuthImage({ imageSrc }: Props) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt="Authentication"
        fill
        priority
        className="object-cover transition duration-700 hover:scale-105"
      />
    </div>
  );
}

export default AuthImage;