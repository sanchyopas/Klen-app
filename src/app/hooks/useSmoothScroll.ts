"use client"

import {useEffect} from "react";
import gsap from "gsap";
import { ScrollTrigger  } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"

export function useSmoothScroll() {
  useEffect(() => {
    if(typeof window !== "undefined") return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 15,
      effects: true,
    });

    return () => {
      if(smoother) smoother.kill();
    }
  }, [])
}