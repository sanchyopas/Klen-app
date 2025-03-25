import TwoColumnText from "@/app/components/TwoColumnText/TwoColumnText";
import Slider from "@/app/components/Slider/Slider";
import SmallTextSection from "@/app/components/SmallTextSection/SmallTextSection";
import TextSection from "@/app/components/TextSection/TextSection";
import ParallaxImageBig from "@/app/components/ParallaxImageBig/ParallaxImageBig";
import SmallImage from "@/app/components/SmallImage/SmallImage";
import LeftTextRightImage from "@/app/components/LeftTextRightImage/LeftTextRightImage";
import ProjectInfo from "@/app/components/ProjectInfo/ProjectInfo";
import LeftTextRightSlider from "@/app/components/LeftTextRightSlider/LeftTextRightSlider";
import TwoColumnImage from "@/app/components/TwoColumnImage/TwoColumnImage";
import ThreeColumnImage from "@/app/components/ThreeColumnImage/ThreeColumnImage";
import TwoImageLeftWideNarrow from "@/app/components/TwoImageLeftWideNarrow/TwoImageLeftWideNarrow";
import TitleTextLeftListRight from "@/app/components/TitleTextLeftListRight/TitleTextLeftListRight";
import TitleTextLeftNumListRight from "@/app/components/TitleTextLeftNumListRight/TitleTextLeftNumListRight";
import TextTwoColumn from "@/app/components/TextTwoColumn/TextTwoColumn";

export const DynamicBlock = ({block}: any) => {
  switch (block.template) {
    case "Текстовый блок - 2 колонки без заголовков":
      return <ProjectInfo description={block.text_left} details={block.text_right}/>
    case "текст в 2 колонки":
      return <TextTwoColumn text={block.text} />
    case "Галлерея фото":
      return <Slider slide_contian={true} slides={Array.isArray(block.image) ? block.image : []} is_boolet={true}/>
    case "Текстовый блок - узкая колонка по центру":
      return <SmallTextSection text={block.text}/>
    case "Текст":
      return <TextSection text={block.text}/>
    case "Изображение на весь экран":
      return <ParallaxImageBig image={block.image}/>
    case "Изображение с отступом по краям":
      return <SmallImage image={block.image}/>
    case "Слева текст / Справа слайдер":
      return <LeftTextRightSlider slides={block.slider} text={block.text} title={block.title}/>
    case "2 изображения в ряд (вертикальные) по центру":
      return <TwoColumnImage imageOne={block.image_1} imageTwo={block.image_2}/>
    case "3 изображения без текста":
      return <ThreeColumnImage image_1={block.image_1} image_2={block.image_2} image_3={block.image_3}/>
    case "Заголовок и текст слева + картинка справа":
      return <LeftTextRightImage image={block.image} text={block.text} title={block.title}/>
    case "2 изображения в ряд - на 2/3 ширины слева и 1/3 справа":
      return <TwoImageLeftWideNarrow image_left={block.image_left} image_right={block.image_right}  />
    case "Заголовок h2 и текст слева + список справа":
      return <TitleTextLeftListRight text={block.text} title={block.title} as={'h2'} list={block.list}/>
    case "Заголовок h3 и текст слева + список справа":
      return <TitleTextLeftListRight text={block.text} title={block.title} as={'h3'} list={block.list}/>
    case "Заголовок h3 и текст слева + нумерованный список справа":
      return <TitleTextLeftNumListRight text={block.text} title={block.title} list={block.list} />
    default:
      return
  }
}