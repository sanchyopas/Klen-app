import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[id]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type Props = {
  text: string,
}

export default function TextSection({text}: Props) {

  return (
    <section className={s.wideText}>
      <div className="container">
          <AnimatedText htmlContent={text} className={s.text} />
      </div>
    </section>
  )
}