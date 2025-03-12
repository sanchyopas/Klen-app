import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";

type Props = {
  images: string[],
}

export default function ImageContrastBlock({images}: Props) {

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          {
            images.map((image, i) => (
              <img src={image} alt="" />
            ))
          }
        </div>
      </div>
    </section>
  )
}