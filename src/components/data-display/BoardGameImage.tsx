import Image from "next/image";
import React from "react";

type BoardGameImageProps = {
  imageUrl?: string;
  imageName?: string;
  size: number;
  lineHeight: number
};
export function BoardGameImage(props: BoardGameImageProps) {
  const lineHeight = `h-${props.lineHeight} `
  return props.imageUrl ? (
    <Image
      src={props.imageUrl!}
      alt={props.imageName!}
      height={props.size}
      width={props.size}
      className={"w-auto " + lineHeight}
    ></Image>
  ) : (
    <div className={lineHeight +"text-lg text-center bg-slate-400 text-gray-300 align-middle"}>
      <span>No image found</span>
    </div>
  );
}
