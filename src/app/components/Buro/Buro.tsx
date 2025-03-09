"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./buro.module.scss";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Buro() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;
    gsap.fromTo(
      `.${s.bg}`,
      { scale: 1.1 },
      {
        scale: 1,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `#${s.buro}`,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id={s.buro} className={s.fullscreen_bg}>
      <img src="/img/bureau.jpg" className={`${s.bg} bg`} alt="" />
      <Link href="/buro"></Link>

      <div className={s.title}>
        <h2>бюро</h2>
      </div>
    </section>
  );
}
