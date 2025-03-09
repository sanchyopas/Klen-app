
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

type ProjectInfoProps = {
  description: string,
  details: string
}

export default function TitleTextLeftListRight({ title, text, list }: Props) {

  return (
    <div className={s.two_columns_content__wrapper}>
      <div className={s.two_columns_content}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <h2>{title}</h2>
                  <div className={s.noGapContent} dangerouslySetInnerHTML={{ __html: text }} ></div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className={s.text}>
                <ul>
                  {
                    list.map((item: any, i: number) => <li key={i}>{item.text}</li>)
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
