import s from "./services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";

export const metadata = {
  title: "Страница сервиса - Klen",
  description: "Свяжитесь с нами",
  keywords: ["Klen", "Компания Клен"]
};

export default function ProjectsPage () {
  return (
    <>
      <section id={s.services}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h3>Разработка продукта</h3>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>

                  <div className={s.linkList}>
                    <LinkWithWrapper className={s.linkWrapper} link={"#"} dotReverce={false} isWrapper={false}
                                     name={"Best use"}/>
                    <LinkWithWrapper className={s.linkWrapper} link={"#"} dotReverce={false} isWrapper={false}
                                     name={"Разработка продукта и продуктовой стратегии"}/>
                  </div>
                </div>

              </div>

              <div className="col-12 col-md-6">
                <div className={s.img}>
                  <img src="/img/image.jpg" alt=""/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h2>Заголовок H2</h2>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>
                </div>

              </div>

              <div className="col-12 col-md-6"></div>
            </div>
          </div>

        </div>
      </div>

      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h3>Заголовок H3</h3>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>
                </div>

              </div>

              <div className="col-12 col-md-6"></div>
            </div>
          </div>

        </div>
      </div>

      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h4>Заголовок H4</h4>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>
                </div>

              </div>

              <div className="col-12 col-md-6"></div>
            </div>
          </div>

        </div>
      </div>

      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h5>Заголовок H5</h5>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>
                </div>

              </div>

              <div className="col-12 col-md-6"></div>
            </div>
          </div>

        </div>
      </div>

      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <h6>Заголовок H6</h6>
                  <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                    сформированное пространство, дополняя его элементами комфортной городской среды на следующих этапах
                    (благоустройство, фасады, интерьеры)</p>
                </div>

              </div>

              <div className="col-12 col-md-6"></div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};