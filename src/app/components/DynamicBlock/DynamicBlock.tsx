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
    case "Текст в 2 колонки":
      return <ProjectInfo description={block.text_left} details={block.text_right}/>
    case "Текст в 2 колонки по центру":
      return <TextTwoColumn text={block.text} />
    case "Фотогалерея":
      return <Slider slide_contian={true} slides={Array.isArray(block.image) ? block.image : []} is_boolet={true}/>
    case "Текст в 1 колонку по центру":
      return <SmallTextSection text={block.text}/>
    case "Текст по центру на 50% ширины":
      return <TextSection text={block.text}/>
    case "1 изображение (полноэкранное)":
      return <ParallaxImageBig image={block.image}/>
    case "1 изображение (на 50% ширины) по центру":
      return <SmallImage image={block.image}/>
    case "Слева - заголовок H3 + текст ниже | справа - слайдер изображений на 50% ширины (квадратные)":
      return <LeftTextRightSlider slides={block.slider} text={block.text} title={block.title}/>
    case "2 изображения в ряд (вертикальные) по центру":
      return <TwoColumnImage imageOne={block.image_1} imageTwo={block.image_2}/>
    case "3 изображения в ряд (вертикальные)":
      return <ThreeColumnImage image_1={block.image_1} image_2={block.image_2} image_3={block.image_3}/>
    case "Слева - заголовок H3 + текст ниже | справа - 1 изображение на 50% ширины":
      return <LeftTextRightImage image={block.image} text={block.text} title={block.title}/>
    case "2 изображения в ряд - на 2/3 ширины слева и 1/3 справа":
      return <TwoImageLeftWideNarrow image_left={block.image_left} image_right={block.image_right}  />
    case "Слева - заголовок H2 + текст ниже | справа - маркированный список":
      return <TitleTextLeftListRight text={block.text} title={block.title} as={'h2'} list={block.list}/>
    case "Слева - заголовок H3 + текст ниже | справа - маркированный список":
      return <TitleTextLeftListRight text={block.text} title={block.title} as={'h3'} list={block.list}/>
    case "Слева - заголовок H3 + текст ниже | справа - нумерованный список":
      return <TitleTextLeftNumListRight text={block.text} title={block.title} list={block.list} />
    default:
      return
  }
}