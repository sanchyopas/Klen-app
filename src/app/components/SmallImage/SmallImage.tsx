"use client"
import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";
import { useRef } from "react";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  image: string,
}

export default function SmallImage({image}: Props) {
  const imageRef = useGsapFadeIn<HTMLDivElement>();
  return (
    <section className={s.halfScreenImage} ref={imageRef}>
      <div className="container">
        <Image
          src={`https://test-6600.fg.onl/upload_resources/${image}`}
          alt=""
          width={900}
          height={600}
        />
      </div>
    </section>
  )
}