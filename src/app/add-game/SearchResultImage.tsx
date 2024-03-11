import Image from "next/image";

export function SearchResultImage({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string;
}) {
  const displayImage = src ? (
    <div className="h-40 w-40 md:h-60 md:w-60 relative overflow-hidden flex justify-center align-middle">
      <div className="h-40 w-40 md:h-60 md:w-60 relative flex flex-col justify-center align-middle overflow-hidden">
        <Image
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="160px"
          src={src}
          alt={alt}
          className="w-40 h-40 md:h-60 md:w-60 rounded-lg"
        ></Image>
      </div>
    </div>
  ) : (
    <div className="text-lg h-40 w-40 md:h-60 md:w-60 text-center bg-slate-400 text-gray-300 align-middle flex flex-col justify-center">
      <span>No image found</span>
    </div>
  );
  return (
    <>
      <div className="absolute">{displayImage}</div>
    </>
  );
}
