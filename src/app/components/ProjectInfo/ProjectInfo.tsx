import he from "he";
import s from "@/app/projects/[id]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type ProjectInfoProps = {
  description: string,
  details: string
}

export default function ProjectInfo({description, details}: ProjectInfoProps) {
  return (
    <section>
      <div className="container">
        <div className={s.two_columns_content}>
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <AnimatedText htmlContent={description} className={s.noGapContent} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <AnimatedText htmlContent={details} className={s.noGapContent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}