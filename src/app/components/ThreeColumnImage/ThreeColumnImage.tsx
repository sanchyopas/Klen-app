"use client"
import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useEffect, useRef} from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image_1: string,
  image_2: string,
  image_3: string,
}



export default function ThreeColumnImage({image_1, image_2, image_3}: Props) {
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
            src={`https://dev.modx.fresco.bz/upload_resources/${image_1}`}
            alt=""/>
          <img
            ref={(el) => {
              if (el) imagesRef.current[1] = el;
            }}
            src={`https://dev.modx.fresco.bz/upload_resources/${image_2}`}
            alt=""/>
          <img
            ref={(el) => {
              if (el) imagesRef.current[2] = el;
            }}
            src={`https://dev.modx.fresco.bz/upload_resources/${image_3}`}
            alt=""/>
        </div>
      </div>
    </section>
  )
}