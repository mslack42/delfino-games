import { Conditional } from "@/components/common/Conditional";
import Image from "next/image";

export function ExpansionSummaryCardImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <>
      <Conditional when={!!src}>
        <div className="h-36 w-36 md:h-40 md:w-40 relative overflow-hidden flex justify-center align-middle">
          <div className="h-36 w-36 md:h-40 md:w-40 relative flex flex-col justify-center align-middle overflow-hidden">
            <Image
              //Don't optimise for a bit - see what the stats look like in Vercel
              unoptimized
              fill={true}
              style={{ objectFit: "cover" }}
              sizes="160px"
              src={src}
              alt={alt}
              className="w-36 h-36 md:h-40 md:w-40 rounded-lg"
            ></Image>
          </div>
        </div>
      </Conditional>
      <Conditional when={!src}>
        <div className="text-lg h-36 w-36 md:h-40 md:w-40 text-center bg-slate-400 text-gray-300 align-middle">
          <span>No image found</span>
        </div>
      </Conditional>
    </>
  );
}
