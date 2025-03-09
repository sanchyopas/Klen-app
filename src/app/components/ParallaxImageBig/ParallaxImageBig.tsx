"use client";

import { useEffect, useRef } from "react";
import s from "@/app/projects/[id]/project.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image: string;
};

export default function ParallaxImageBig({ image }: Props) {
  const imageRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;

    gsap.fromTo(
      el,
      { y: 100 },
      {
        y: -100,
        ease: "easeInOut",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
        },
      }
    );
  }, []);

  return (
    <section className={s.fullScreenImage}>
      <div className={`container ${s.containerImage}`}>
        <img
          ref={imageRef}
          src={`https://dev.modx.fresco.bz/upload_resources/${image}`}
          alt=""
          className={s.parallaxImage}
        />
      </div>
    </section>
  );
}
