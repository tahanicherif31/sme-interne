"use client";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

export default function VideoPlayerWrapper({ url }: { url: string }) {
  return (
    <ReactPlayer
      src={url}
      controls
      width="100%"
      height="100%"
      style={{ height: "100%" }}
    />
  );
}
