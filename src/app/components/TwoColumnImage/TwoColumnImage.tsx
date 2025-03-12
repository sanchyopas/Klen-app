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

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img
            ref={(el) => {
              if (el) imagesRef.current[0] = el;
            }}
            src={`https://test-6600.fg.onl/upload_resources/${imageOne}`}
            alt=""
          />
          <img
            ref={(el) => {
              if (el) imagesRef.current[1] = el;
            }}
            src={`https://test-6600.fg.onl/upload_resources/${imageTwo}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
