"use client";

import { useEffect, useRef } from "react";
import s from "@/app/projects/[slug]/project.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image: any;
  imageMobile?: string;
  className?: string;
  yStart?: number;
  yEnd?: number;
};

export default function ParallaxImageBig({ image, imageMobile, className, yStart, yEnd }: Props) {
  const imageRef = useRef(null);

  useEffect(() => {
    const el = imageRef.current;

    // Проверяем ширину экрана с помощью matchMedia
    const mediaQuery = window.matchMedia("(min-width: 767px)");

    if (mediaQuery.matches) {
      const animation = gsap.fromTo(
        el,
        { y: yStart ? yStart : 0 },
        {
          y: yEnd ? yEnd : -200,
          ease: "easeInOut",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0,
          },
        }
      );

      // Очистка анимации при изменении ширины экрана
      mediaQuery.addEventListener("change", (event) => {
        if (!event.matches) {
          animation.kill(); // Останавливаем анимацию, если экран меньше 767px
        }
        gsap.set(el, { clearProps: "all" });
      });
    }

    // Очистка анимации при размонтировании компонента
    return () => {
      if (ScrollTrigger.getAll().length > 0) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section className={ `${s.fullScreenImage} ${className} ${imageMobile ? s.forMobileImage : ''}` }>
      <div className={`container ${s.containerImage}`}>

        {imageMobile ?
          <>
            <Image
              ref={imageRef}
              src={`${API_URL}${image}`}
              alt=""
              className={s.parallaxImage}
              width={1360}
              height={720}
              quality={0}
            />
            <Image
              src={`${API_URL}${imageMobile}`}
              alt=""
              className={s.parallaxImage_mobile}
              width={1360}
              height={720}
              quality={0}
            />
          </>:

          image.hasOwnProperty("image") ?
            <Image
              ref={imageRef}
              src={`${API_URL}${image.image}`}
              alt=""
              className={s.parallaxImage}
              width={1360}
              height={720}
              quality={0}
            />
            :
            <Image
              ref={imageRef}
              src={`${API_URL}${image}`}
              alt=""
              className={s.parallaxImage}
              width={1360}
              height={720}
              quality={0}
            />
        }

      </div>
    </section>
  );
}