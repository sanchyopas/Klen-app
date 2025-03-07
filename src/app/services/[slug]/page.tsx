import ProjectInfo from "@/app/components/ProjectInfo/ProjectInfo";
import Slider from "@/app/components/Slider/Slider";
import SmallTextSection from "@/app/components/SmallTextSection/SmallTextSection";
import TextSection from "@/app/components/TextSection/TextSection";
import ParallaxImageBig from "@/app/components/ParallaxImageBig/ParallaxImageBig";
import TwoColumnText from "@/app/components/TwoColumnText/TwoColumnText";
import SmallImage from "@/app/components/SmallImage/SmallImage";
import s from "@/app/projects/[id]/project.module.scss";
import MiniSlider from "@/app/components/MiniSlider/MiniSlider";
import TwoColumnImage from "@/app/components/TwoColumnImage/TwoColumnImage";
import ThreeColumnImage from "@/app/components/ThreeColumnImage/ThreeColumnImage";
import LeftTextRightImage from "@/app/components/LeftTextRightImage/LeftTextRightImage";

export default function Project() {
  return (
    <div>
      {/*Заголовок и текст в две колонки */}
      <ProjectInfo title={data.section_1.title} description={data.section_1.description}
                   details={data.section_1.details}/>

      <Slider slides={data.slides} is_boolet={true}/>

      {/* Текст из параграфов */}
      <SmallTextSection text={data.section_text_small}/>

      {/* Широкий текст  */}
      <TextSection text={data.section_text}/>

      {/* Картинка с паралаксом */}
      <ParallaxImageBig image={data.parallax_image_big}/>

      {/* Текст в две колонки */}
      <TwoColumnText text={data.text_two_column}/>

      {/* Маленькая картинка в пол экрана */}
      <SmallImage image={data.image_small}/>

      {/* Картинка с паралаксом */}
      <ParallaxImageBig image={data.parallax_image_big}/>

      <Slider slides={data.slides} is_boolet={true}/>

      {/* Блок с маленьким слайдером */}
      <section id={s.services}>
        <div className={s.two_columns_content}>
          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">
                <div className={s.text}>
                  <h3>Общественный центр в сосновом бору</h3>
                  <div className={s.noGapContent}>
                    <p className={s.lightText}>Конкурсный проект культурно-досугового центра на побережье Финского
                      залива. Сосновый бор. 2024.</p>
                    <p>Наш культурно — досуговый центр строится на идее проницаемости и, соответственно, постоянной
                      визуальной связи человека, леса и моря. Все помещения, которым необходимы глухие стены,
                      расположены в длинных «пеналах», повёрнутых перпендикулярно побережью и парковке. Все остальные
                      функции занимают пространства между глухими прямоугольниками, их стены прозрачны. Таким образом,
                      передвигаясь вдоль парковки, по берегу, или же внутри центра, посетителю всегда открывается тот
                      или иной вид сквозь дом.</p>
                    <p>Разные функциональные зоны и отдельные помещения накрыты деревянными плоскими крышами,
                      расположенными на разных уровнях. Перетекающие пространства, «левитирующие» крыши и постоянное
                      присутствие природного окружения в доме вкупе создают насыщенный и разнообразный интерьер.</p>
                    <p>Снаружи горизонтальные летящие объёмы крыш складываются в своеобразное продолговатое облако,
                      проплывающее между стволов деревьев.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <MiniSlider slides={data.slides}/>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Картинки в две колонки */}
      <TwoColumnImage images={data.two_colum_image}/>

      {/* Картинки в 3 колонки */}
      <ThreeColumnImage images={data.three_colum_image}/>

      {/* Две колонки слево текст справо картинка */}
      <LeftTextRightImage image={data.two_column_left_text_right_image.image} text={data.two_column_left_text_right_image.text}/>

      {/* Две колонки слево большая картинка справо маленькая */}
      <section>
        <div className="container">
          <div className={s.imagesGreed}>
            <img
              className={s.wide}
              src="/img/bureau.jpg"
              alt=""
            />
            <img
              src="/img/bureau.jpg"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Слево заголовок текст справо не нуменованный списки */}
      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>

                  <h2>Заголовок H2</h2>

                  <div className={s.noGapContent}>
                    <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство, дополняя его элементами комфортной городской среды на следующих
                      этапах (благоустройство, фасады, интерьеры)</p>
                  </div>
                </div>

              </div>

              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <ul>
                    <li>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство
                    </li>
                    <li>Дополняя его элементами комфортной городской среды на следующих этапах</li>
                    <li>Дополняя его элементами комфортной городской среды на следующих этапах</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Слево заголовок текст справо не нумерованный списки */}
      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>

                  <h3>Заголовок H3</h3>

                  <div className={s.noGapContent}>
                    <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство, дополняя его элементами комфортной городской среды на следующих
                      этапах (благоустройство, фасады, интерьеры)</p>
                  </div>
                </div>

              </div>

              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <ul>
                    <li>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство
                    </li>
                    <li><p>Дополняя его элементами комфортной городской среды на следующих этапах</p></li>
                    <li><span>Дополняя его элементами комфортной городской среды на следующих этапах</span></li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Слево заголовок текст справо нумерованный списки */}
      <div className={s.two_columns_content__wrapper}>
        <div className={s.two_columns_content}>

          <div className="container">
            <div className={`${s.row} row`}>
              <div className="col-12 col-md-6">

                <div className={s.text}>

                  <h3>Заголовок H3</h3>

                  <div className={s.noGapContent}>
                    <p>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство, дополняя его элементами комфортной городской среды на следующих
                      этапах (благоустройство, фасады, интерьеры)</p>
                  </div>
                </div>

              </div>

              <div className="col-12 col-md-6">

                <div className={s.text}>
                  <ol>
                    <li>Построение осмысленной структуры города в будущем дает возможность полноценно использовать
                      сформированное пространство
                    </li>
                    <li><p>Дополняя его элементами комфортной городской среды на следующих этапах</p></li>
                    <li><span>Дополняя его элементами комфортной городской среды на следующих этапах</span></li>
                  </ol>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Slider slides={data.slides} is_boolet={true}/>
    </div>
  );
};

