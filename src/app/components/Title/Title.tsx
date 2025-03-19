"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./title.module.scss";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type TitleProps = {
  title: string;
  className?: string;
  is_mobile?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export default function Title({ title, className, is_mobile, as: Tag = "h2" }: TitleProps) {
  const titleRef = useGsapFadeIn<HTMLDivElement>()
  return (
    <div ref={titleRef} className={`${s.title} ${className || ""} ${is_mobile ? s.mb : ""}`}>
      <Tag>{title}</Tag>
    </div>
  );
}