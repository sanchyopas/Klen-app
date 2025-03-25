"use client"
import s from "@/app/projects/[slug]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  title: string,
  text: string,
  list: any;
}

export default function TitleTextLeftNumListRight({title, text, list}:Props) {
  const sectionRef = useGsapFadeIn<HTMLDivElement>();
  return (
    <div className={s.two_columns_content__wrapper} ref={sectionRef}>
      <div className={s.two_columns_content}>

        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">

              <div className={s.text}>
                <h3>{title}</h3>
                <AnimatedText htmlContent={text} className={s.noGapContent} />
              </div>

            </div>

            <div className="col-12 col-md-6">

              <div className={s.text}>
                <ol>
                  {
                    list.map((item:any, i:number) => {
                      return (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.text }}></li>
                      )
                    })
                  }
                </ol>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}