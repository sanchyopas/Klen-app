"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "@/app/projects/[id]/project.module.scss";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  imageOne: string;
  imageTwo: string;
};

export default function TwoColumnImage({ imageOne, imageTwo }: Props) {
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (imagesRef.current.length === 0) return;

    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
        scrollTrigger: {
          trigger: imagesRef.current[0],
          start: "top 90%",
          end: "bottom 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img
            ref={(el) => {
              if (el) imagesRef.current[0] = el;
            }}
            src={`https://dev.modx.fresco.bz/upload_resources/${imageOne}`}
            alt=""
          />
          <img
            ref={(el) => {
              if (el) imagesRef.current[1] = el;
            }}
            src={`https://dev.modx.fresco.bz/upload_resources/${imageTwo}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
