import Title from "@/app/components/Title/Title";
import s from "@/app/projects/[id]/project.module.scss";
import AnimatedText from "@/app/AnimateWrapperComponents/AnimatedText/AnimatedText";

type Props = {
  text: string,
}

export default function SmallTextSection({text}: Props) {

  return (
    <section className={s.narrowText}>
      <div className="container">
        <div className={s.text}>
          <AnimatedText html={text} />
        </div>
      </div>
    </section>
  )
}