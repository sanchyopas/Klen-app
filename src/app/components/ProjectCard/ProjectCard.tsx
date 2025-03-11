import s from "./projectCard.module.scss"
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  id: number;
}

export default function ProjectCard(  { title, image, id }:Props ) {
  return (
    <div className={s.item} key={id}>
      <img
        src={`https://test-6600.fg.onl${image}`}
        alt={title}
      />
      <Link href={`/projects/${id}`}></Link>
      <h3 className={s.name}>{title}</h3>
    </div>
  );
};
