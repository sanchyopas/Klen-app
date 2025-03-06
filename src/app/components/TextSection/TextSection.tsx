import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[slug]/project.module.scss";

type Props = {
  text: string,
}

export default function TextSection({text}: Props) {

  return (
    <section className={s.wideText}>
      <div className="container">
        <div className={s.text} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </section>
  )
}