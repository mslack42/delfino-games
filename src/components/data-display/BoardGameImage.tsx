import Image from "next/image";
import React from "react";
import { twJoin } from "tailwind-merge";

type BoardGameImageProps = {
  imageUrl?: string;
  imageName?: string;
  size: number;
  lineHeight: number;
};
export function BoardGameImage(props: BoardGameImageProps) {
  const lineHeight = `h-${props.lineHeight} `;
  return props.imageUrl ? (
    <Image
      //Don't optimise for a bit - see what the stats look like in Vercel
      unoptimized
      src={props.imageUrl!}
      alt={props.imageName!}
      height={props.size}
      width={props.size}
      className={twJoin("w-auto", lineHeight)}
    ></Image>
  ) : (
    <div
      className={twJoin(
        lineHeight,
        "text-lg text-center bg-slate-400 text-gray-300 align-middle"
      )}
    >
      <span>No image found</span>
    </div>
  );
}
