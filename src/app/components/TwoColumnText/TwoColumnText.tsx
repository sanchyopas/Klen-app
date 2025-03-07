import s from "@/app/projects/[id]/project.module.scss";
import Image from "next/image";

type Props = {
  text: string,
}

export default function TwoColumnText({text}: Props) {

  return (
    <section className={s.twoColsText}>
      <div className="container">
        <div className={s.text} dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </section>
  )
}