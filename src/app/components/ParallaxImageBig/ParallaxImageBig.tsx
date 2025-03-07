import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";

type Props = {
  image: string,
}

export default function ParallaxImageBig({image}: Props) {

  return (
    <section className={s.fullScreenImage}>
      <div className="container">
        {/*<Image src={image} alt={image} width={1360} height={720} />*/}
        <img src={`https://dev.modx.fresco.bz/upload_resources/${image}`} alt=""/>
      </div>
    </section>
  )
}