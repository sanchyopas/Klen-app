"use client";

import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Title = dynamic(() => import("@/app/components/Title/Title"), {
  ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedTitle({ title }: { title: string }) {
  const titleRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  useEffect(() => {
    if (isTouch || !titleRef.current) return;
    const el = titleRef.current;

    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [isTouch]);

  return (
    <h1 ref={titleRef}>
      <Title title={title} as="h1" />
    </h1>
  );
}
