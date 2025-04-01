import s from "./projectCard.module.scss"
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  id: number;
  slug: string;
}

export default function ProjectCard({ title, image, id, slug }: Props) {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className={`${s.item} project-card`} key={id}>
        <Image
          src={`${API_URL}${image}`}
          alt={title}
          width={800}
          height={400}
          priority
        />
      <Link href={`/projects/${slug}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <h3 className={s.name}>{title}</h3>
    </div>
  );
}

