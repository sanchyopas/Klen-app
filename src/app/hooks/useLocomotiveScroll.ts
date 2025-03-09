"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

export function useLocomotiveScroll() {
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR Fix

    const scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]") as HTMLElement,
      smooth: true, // Включаем плавность
      lerp: 0.1, // Сила инерции (чем меньше, тем мягче)
      multiplier: 1, // Скорость скролла
      reloadOnContextChange: true,
    });

    scrollRef.current = scroll;

    console.log("✅ Locomotive Scroll активирован");

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
        console.log("🛑 Locomotive Scroll уничтожен");
      }
    };
  }, []);

  return scrollRef;
}
