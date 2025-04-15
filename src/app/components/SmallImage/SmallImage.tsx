"use client"
import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";
import { useRef } from "react";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  image: any,
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SmallImage({image}: Props) {
  const imageRef = useGsapFadeIn<HTMLDivElement>();

  console.log(image.hasOwnProperty("image"), image);

  return (
    <section className={s.halfScreenImage} ref={imageRef}>
      <div className="container">
        {image.hasOwnProperty("image") ?
          <Image
            src={`${API_URL}${image.image}`}
            alt=""
            width={900}
            height={600}
          />
          :
          <Image
            src={`${API_URL}${image}`}
            alt=""
            width={900}
            height={600}
          />
        }
      </div>
    </section>
  )
}