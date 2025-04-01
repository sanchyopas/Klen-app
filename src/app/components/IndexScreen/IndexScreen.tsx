"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import s from "./indexScreen.module.scss";
import Image from "next/image";

export default function IndexScreen( {mainData}: any ) {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;
    const tl = gsap.timeline();

    tl.fromTo(
      `.${s.helloImage}`,
      { scale: 1.2, },
      { scale: 1, duration: 3, ease: "power3.out" }
    );

  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <section id={s.hello}>
      <Image
        src={`${API_URL}${mainData.background.retina}`}
        alt={'KLËN — architectural bureau'}
        width={2720}
        height={1216}
        priority
        quality={100}
        className={`${s.helloImage} helloImage`}
      />

      <div className={`${s.mask} mask`}></div>
      <div className={s.container}>
        <h1>{mainData.title}</h1>
      </div>
    </section>
  );
};
