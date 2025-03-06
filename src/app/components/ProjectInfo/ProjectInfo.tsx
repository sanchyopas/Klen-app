import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[slug]/project.module.scss";

type ProjectInfoProps = {
  title: string,
  description: string,
  details: string
}

export default function ProjectInfo({title, description, details}: ProjectInfoProps) {

  return (
    <section>
      <div className="container">
        <Title title={title} as={"h1"}/>

        <div className={s.two_columns_content}>
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <div className={s.noGapContent} dangerouslySetInnerHTML={{ __html: details }} />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className={s.text}>
                <div className={s.noGapContent}>
                  {!!description && description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}