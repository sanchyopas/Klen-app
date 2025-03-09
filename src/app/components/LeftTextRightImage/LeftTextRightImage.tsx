"use client";

import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image: string;
  text: string;
  title: string;
};

export default function LeftTextRightImage({ image, text, title }: Props) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return; // Предотвращаем ошибку

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 90%",
          end: "bottom 70%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <h2>{title}</h2>
              <AnimatedText htmlContent={text} className={s.text} />
            </div>

            <div className="col-12 col-md-6">
              <div className={s.img}>
                <img
                  ref={imageRef}
                  src={`https://dev.modx.fresco.bz/upload_resources/${image}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
