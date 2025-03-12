import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[slug]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type Props = {
  text: string,
}

export default function SmallTextSection({text}: Props) {

  return (
    <section className={s.narrowText}>
      <div className="container">
        <AnimatedText htmlContent={text} className={s.text} />
      </div>
    </section>
  )
}