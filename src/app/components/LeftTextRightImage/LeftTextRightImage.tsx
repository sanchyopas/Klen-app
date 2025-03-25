"use client";

import s from "@/app/projects/[slug]/project.module.scss";
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

  // Объединяем title и text в один htmlContent
  const htmlContent = `<h3>${title}</h3>${text}`;

  return (
    <section id={s.services}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <AnimatedText htmlContent={htmlContent} className={s.text} />
            </div>

            <div className="col-12 col-md-6">
              <div className={s.img}>
                <img
                  ref={imageRef}
                  src={`https://test-6600.fg.onl/upload_resources/${image}`}
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
