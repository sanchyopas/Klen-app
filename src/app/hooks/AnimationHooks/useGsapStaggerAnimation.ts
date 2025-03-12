"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapStaggerAnimation = (
  {start = "top 90%", end="bottom 80%", duration = 1.2, delay = 0, ease = "power3.out", stagger = 0.3} = {}
) => {
  const ref = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (ref.current.length === 0) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: ease,
        stagger: stagger,
        scrollTrigger: {
          trigger: ref.current[0],
          start: start,
          end: end,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);



  return ref;
}