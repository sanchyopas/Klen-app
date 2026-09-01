"use client";

import { useState } from "react";
import s from "./projectCard.module.scss"
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  id: number;
  slug: string;
  priority?: boolean;
}

export default function ProjectCard({ title, image, id, slug, priority = false }: Props) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Пока изображение не загрузилось, на месте карточки — скелетон
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${s.item} ${isLoaded ? "" : s.loading} project-card`} key={id}>
        <Image
          src={`${API_URL}${image}`}
          alt={title}
          width={800}
          height={400}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          onLoad={() => setIsLoaded(true)}
        />
      <Link href={`/projects/${slug}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <h3 className={s.name}>{title}</h3>
    </div>
  );
}
