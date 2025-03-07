import s from "@/app/projects/[id]/project.module.scss";

type Props = {
  title: string,
  text: string,
  list: any;
}

export default function TitleTextLeftListRight({title, text, list}:Props) {
  return (
    <div className={s.two_columns_content__wrapper}>
      <div className={s.two_columns_content}>

        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">

              <div className={s.text}>

                <h2>{title}</h2>
                <div className={s.noGapContent} dangerouslySetInnerHTML={{ __html: text }}>)</div>
              </div>

            </div>

            <div className="col-12 col-md-6">

              <div className={s.text}>
                <ul>
                  {
                    list.map((item:any, i:number) => {
                      return (
                        <li key={i}>{item}</li>
                      )
                    })
                  }

                  <li>Дополняя его элементами комфортной городской среды на следующих этапах</li>
                  <li>Дополняя его элементами комфортной городской среды на следующих этапах</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}