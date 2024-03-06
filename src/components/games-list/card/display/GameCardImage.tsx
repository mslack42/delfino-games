import Image from "next/image";

export function GameCardImage(props: { src: string | undefined; alt: string }) {
  const displayImage = props.src ? (
    <div className="h-40 w-40 relative overflow-hidden flex justify-center align-middle">
      <div className="h-40 w-40 relative flex flex-col justify-center align-middle overflow-hidden">
        <Image
          fill={true}
          style={{ objectFit: "cover" }}
          sizes="160px"
          src={props.src}
          alt={props.alt}
          className="w-40 h-40 rounded-lg"
        ></Image>
      </div>
    </div>
  ) : (
    <div className="text-lg h-40 w-40 text-center bg-slate-400 text-gray-300 align-middle">
      <span>No image found</span>
    </div>
  );
  return <>{displayImage}</>;
}
