"use client"
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type Props = {
  title?: string;
  text?: any;
  list?: any;
};

function decodeHTML(encodedString: string) {
  if (typeof window === "undefined") return encodedString; // SSR fix

  const doc = new DOMParser().parseFromString(encodedString, "text/html");
  return doc.documentElement.textContent || "";
}

import he from "he";
import s from "@/app/projects/[id]/project.module.scss";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";

type ProjectInfoProps = {
  description: string,
  details: string
}

export default function TitleTextLeftListRight({ title, text, list }: Props) {
  const sectionRef = useGsapFadeIn<HTMLDivElement>();
  return (
    <div className={s.two_columns_content__wrapper} ref={sectionRef}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <h2>{title}</h2>
                <AnimatedText htmlContent={text} className={s.noGapContent} />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className={s.text}>
                <ul>
                  {
                    list.map((item: any, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item.text }}></li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
