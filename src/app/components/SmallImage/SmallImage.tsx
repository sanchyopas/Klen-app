"use client"
import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";
import { useRef } from "react";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  image: string,
}

export default function SmallImage({image}: Props) {
  const imageRef = useGsapFadeIn();
  return (
    <section className={s.halfScreenImage} ref={imageRef}>
      <div className="container">
        {/*<Image src={image} alt={image} width={900} height={600} />*/}
        <img src={`https://dev.modx.fresco.bz/upload_resources/${image}`} alt="" />
      </div>
    </section>
  )
}