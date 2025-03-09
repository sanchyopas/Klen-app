"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./AnimatedText.module.scss"

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps = {
  htmlContent: string;
  className?: string;
};

export default function AnimatedText({ htmlContent, className = "" }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          end: "bottom 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return <div ref={textRef} className={`${className} ${s.defaultPosition}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
