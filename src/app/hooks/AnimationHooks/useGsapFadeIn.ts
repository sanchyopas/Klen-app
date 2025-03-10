"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapFadeIn = <T extends HTMLElement> (
  {start = "top 90%", end="bottom 80%", duration = 1.2, delay = 0, ease = "power3.out"} = {}
) => {
  // if (window.matchMedia("(hover: none)").matches) return;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: ease,
        scrollTrigger: {
          trigger: ref.current,
          start: start,
          end: end,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return ref;
}