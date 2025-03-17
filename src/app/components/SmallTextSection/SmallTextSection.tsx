import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[slug]/project.module.scss";
import AnimatedText from "@/app/components/AnimatedText/AnimatedText";

type Props = {
  title?: string,
  text: string,
}

export default function SmallTextSection({title, text}: Props) {

  const textContent = !!title ? title + text : text;

  return (
    <section className={s.narrowText}>
      <div className="container">
        <AnimatedText htmlContent={textContent} className={s.text} />
      </div>
    </section>
  )
}