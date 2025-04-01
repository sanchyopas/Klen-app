"use client"
import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";
import { useRef } from "react";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  image: string,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SmallImage({image}: Props) {
  const imageRef = useGsapFadeIn<HTMLDivElement>();
  return (
    <section className={s.halfScreenImage} ref={imageRef}>
      <div className="container">
        <Image
          src={`${API_URL}${image}`}
          alt=""
          width={900}
          height={600}
        />
      </div>
    </section>
  )
}