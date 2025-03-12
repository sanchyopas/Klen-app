"use client";

import s from "./preloader.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";

export default function Preloader() {
  useEffect(() => {
    gsap.to(`.${s.preloader}`, {
      opacity: 0,
      duration: 2,
      delay: 3,
    });
  }, []);

  return (
    <div className={s.preloader}>
      <div className={s.logo}>
        <Image src={"/img/Preloader.png"} alt="KLЁN — architectural bureau" width={117} height={40}/>
      </div>
    </div>
  );
}
