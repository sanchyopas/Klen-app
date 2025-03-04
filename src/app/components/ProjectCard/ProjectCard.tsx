import s from "./projectCard.module.scss"
import Link from "next/link";

export default function ProjectCard( { data }:any ) {

  const { link, image, title } = data

  return (
    <div className={s.item} key={link}>
      <img
        src={`${image}`}
        alt={title}
      />
      <Link href={`/projects/${link}`}></Link>
      <h3 className={s.name}>{title}</h3>
    </div>
  );
};
