import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";

type Props = {
  imageOne: string;
  imageTwo: string;
}

export default function TwoColumnImage({imageOne, imageTwo}: Props) {

  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img src={`https://dev.modx.fresco.bz/upload_resources/${imageOne}`} alt=""/>
          <img src={`https://dev.modx.fresco.bz/upload_resources/${imageTwo}`} alt=""/>
        </div>
      </div>
    </section>
  )
}