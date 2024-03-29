import Image from "next/image";

export function GameCardImage(props: { src: string | undefined; alt: string }) {
  const displayImage = props.src ? (
    <div className="h-40 w-40 md:h-60 md:w-60 relative overflow-hidden flex justify-center align-middle">
      <div className="h-40 w-40 md:h-60 md:w-60 relative flex flex-col justify-center align-middle overflow-hidden">
        <Image
          //Don't optimise for a bit - see what the stats look like in Vercel
          unoptimized
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="160px"
          src={props.src}
          alt={props.alt}
          className="w-40 h-40 md:h-60 md:w-60 rounded-lg"
        ></Image>
      </div>
    </div>
  ) : (
    <div className="text-lg h-40 w-40 md:h-60 md:w-60 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );
  return <>{displayImage}</>;
}
