"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import s from "./indexScreen.module.scss";
import Image from "next/image";

export default function IndexScreen() {
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

  return (
    <section id={s.hello}>
      <Image
        src={`/img/image.jpg`}
        alt={'KLËN — architectural bureau'}
        width={800}
        height={400}
        priority
        className={`${s.helloImage} helloImage`}
      />
      <div className={`${s.mask} mask`}></div>
      <div className={s.container}>
        <h1>architectural bureau</h1>
      </div>
    </section>
  );
};
