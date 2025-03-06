import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";

type Props = {
  image: string,
}

export default function ParallaxImageBig({image}: Props) {

  return (
    <section className={s.fullScreenImage}>
      <div className="container">
        <Image src={image} alt={image} width={1360} height={720} />
      </div>
    </section>
  )
}