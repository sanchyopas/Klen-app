"use client"
import s from "./AnimatedText.module.scss"
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";


type AnimatedTextProps = {
  htmlContent: string;
  className?: string;
};

export default function AnimatedText({ htmlContent, className = "" }: AnimatedTextProps) {
  const textRef = useGsapFadeIn<HTMLDivElement>();
  return <div ref={textRef} className={`${className} ${s.defaultPosition}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
