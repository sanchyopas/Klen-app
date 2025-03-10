"use client";

import s from "@/app/projects/[id]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  image: string;
  text: string;
  title: string;
};

export default function LeftTextRightImage({ image, text, title }: Props) {
  const imageRef = useGsapFadeIn<HTMLImageElement>();
  const titleRef = useGsapFadeIn<HTMLHeadingElement>();

  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <h2 ref={titleRef}>{title}</h2>
              <AnimatedText htmlContent={text} className={s.text} />
            </div>

            <div className="col-12 col-md-6">
              <div className={s.img}>
                <img
                  ref={imageRef}
                  src={`https://dev.modx.fresco.bz/upload_resources/${image}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
