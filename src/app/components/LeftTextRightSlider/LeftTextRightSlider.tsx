import s from "@/app/projects/[id]/project.module.scss";
import MiniSlider from "@/app/components/MiniSlider/MiniSlider";

type Props = {
  text: string,
  title: string
  slides: any
}

export default function LeftTextRightSlider({slides, title, text}: Props) {
  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <h3>{title}</h3>
                <div className={s.noGapContent} dangerouslySetInnerHTML={{__html: text}}></div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <MiniSlider slides={slides}/>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}