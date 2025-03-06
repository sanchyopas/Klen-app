import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";

type Props = {
  image: string,
}

export default function SmallImage({image}: Props) {

  return (
    <section className={s.halfScreenImage}>
      <div className="container">
        <Image src={image} alt={image} width={900} height={600} />
      </div>
    </section>
  )
}