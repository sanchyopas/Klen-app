"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "@/app/projects/[slug]/project.module.scss";
import {useGsapStaggerAnimation} from "@/app/hooks/AnimationHooks/useGsapStaggerAnimation";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  imageOne: string;
  imageTwo: string;
};

export default function TwoColumnImage({ imageOne, imageTwo }: Props) {
  const imagesRef = useGsapStaggerAnimation();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img
            ref={(el) => {
              if (el) imagesRef.current[0] = el;
            }}
            src={`${API_URL}${imageOne}`}
            alt=""
          />
          <img
            ref={(el) => {
              if (el) imagesRef.current[1] = el;
            }}
            src={`${API_URL}${imageTwo}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
