import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[id]/project.module.scss";
import AnimatedText from "@/app/AnimateWrapperComponents/AnimatedText/AnimatedText";

type Props = {
  text: string,
}

export default function TextSection({text}: Props) {

  return (
    <section className={s.wideText}>
      <div className="container">
        <div className={s.text}>
          <AnimatedText html={text} />
        </div>
      </div>
    </section>
  )
}