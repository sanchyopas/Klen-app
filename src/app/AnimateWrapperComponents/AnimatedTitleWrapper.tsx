"use client";

import dynamic from "next/dynamic";


const AnimatedTitle = dynamic(() => import("./AnimatedTitle"), {
  ssr: false,
});

export default function AnimatedTitleWrapper({ title }: { title: string }) {
  return <AnimatedTitle title={title} />;
}