import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";

type Props = {
  image: string,
}

export default function SmallImage({image}: Props) {

  return (
    <section className={s.halfScreenImage}>
      <div className="container">
        {/*<Image src={image} alt={image} width={900} height={600} />*/}
        <img src={`https://dev.modx.fresco.bz/upload_resources/${image}`} alt=""/>
      </div>
    </section>
  )
}