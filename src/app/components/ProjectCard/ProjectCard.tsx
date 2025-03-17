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
  return (
    <div className={`${s.item} project-card`} key={id}>
        <Image
          src={`https://test-6600.fg.onl${image}`}
          alt={title}
          width={800}
          height={400}
          priority
        />
      <Link href={`/projects/${slug}`} />
      <h3 className={s.name}>{title}</h3>
    </div>
  );
}

