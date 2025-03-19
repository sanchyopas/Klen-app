"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedText({ html }: { html: string }) {
  const textRef = useGsapFadeIn<HTMLDivElement>();


  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
