import s from "./buro.module.scss"
import Link from "next/link";
export default function Buro() {
  return (
    <section
      id={s.buro}
      className={s.fullscreen_bg}
    >
      <img
        src="/img/bureau.jpg"
        className={s.bg}
        alt=""
      />
      <Link href="/buro"></Link>

      <div className={s.title}>
        <h2>бюро</h2>
      </div>
    </section>
  )
}