"use client"

import s from "@/app/projects/[id]/project.module.scss";
import MiniSlider from "@/app/components/MiniSlider/MiniSlider";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";
import Title from "@/app/components/Title/Title";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type Props = {
  text: string,
  title: string
  slides: any
}

export default function LeftTextRightSlider({slides, title, text}: Props) {
  const elemRef = useGsapFadeIn<HTMLDivElement>();
  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`} ref={elemRef}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <h3>{title}</h3>
                <AnimatedText htmlContent={text} className={s.noGapContent} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <MiniSlider slides={slides} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}