import s from "@/app/projects/[slug]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type Props = {
  text: string,
}

export default function TextTwoColumn({text}: Props) {
  return (
    <section className={s.twoColsText}>
      <div className="container">
        <AnimatedText htmlContent={text} className={s.text} />
      </div>
    </section>
  )
}