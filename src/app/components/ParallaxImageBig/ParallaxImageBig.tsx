"use client";

import { useEffect, useRef } from "react";
import s from "@/app/projects/[id]/project.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // ✅ Регистрируем ScrollTrigger

type Props = {
  image: string;
};

export default function ParallaxImageBig({ image }: Props) {
  const imageRef = useRef(null); // 🎯 Ссылка на картинку

  useEffect(() => {
    const el = imageRef.current;

    gsap.fromTo(
      el,
      { y: 150 }, // 🔹 Стартовое положение (ниже обычного)
      {
        y: -150, // 🔥 Плавное движение вверх
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom", // 🟢 Анимация начинается, когда картинка касается нижнего края экрана
          end: "bottom top", // 🔴 Завершается, когда она полностью уходит за верх экрана
          scrub: 2, // 📌 Плавное движение, зависящее от скорости скролла
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
