'use client';

import s from "./preloader.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      gsap.to(`.${s.preloader}`, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setLoading(false),
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className={s.preloader}>
      <div className={s.logo}>
        <Image src={"/img/Preloader.png"} alt={"KLЁN — architectural bureau"} width={117} height={40} layout="responsive"/>
      </div>
    </div>
  );
}
