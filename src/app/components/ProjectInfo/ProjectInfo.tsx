import he from "he";
import s from "@/app/projects/[id]/project.module.scss";

type ProjectInfoProps = {
  description: string,
  details: string
}

function decodeHTML(encodedString: string) {
  if (typeof window === "undefined") return encodedString; // SSR fix

  const doc = new DOMParser().parseFromString(encodedString, "text/html");
  return doc.documentElement.textContent || "";
}


export default function ProjectInfo({description, details}: ProjectInfoProps) {
  // Пока что пусть будет декодирует
  // const decodedDetails = he.decode(details || "");
  // const decodedDescription = he.decode(description || "");
  return (
    <section>
      <div className="container">
        <div className={s.two_columns_content}>
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <div className={s.noGapContent} dangerouslySetInnerHTML={{ __html: description }}></div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <div className={s.noGapContent} dangerouslySetInnerHTML={{ __html: details }} ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}