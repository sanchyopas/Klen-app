import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";

type Props = {
  image_1: string,
  image_2: string,
  image_3: string,
}



export default function ThreeColumnImage({image_1, image_2, image_3}: Props) {

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img src={`https://dev.modx.fresco.bz/upload_resources/${image_1}`} alt=""/>
          <img src={`https://dev.modx.fresco.bz/upload_resources/${image_2}`} alt=""/>
          <img src={`https://dev.modx.fresco.bz/upload_resources/${image_3}`} alt=""/>
        </div>
      </div>
    </section>
  )
}