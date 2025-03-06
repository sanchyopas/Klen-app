import s from "@/app/projects/[slug]/project.module.scss";
import Image from "next/image";

type Props = {
  image: string,
  text: string,
}

export default function LeftTextRightImage({image, text}: Props) {

  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>

        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">

              <div className={s.text} dangerouslySetInnerHTML={{ __html: text }}></div>

            </div>

            <div className="col-12 col-md-6">
              <div className={s.img}>
                <img src={image} alt=""/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}