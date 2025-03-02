import s from "./header.module.scss"
import Link from "next/link";
export default function Header() {

  return (
    <header className={s.header}>
      <div className={`${s.container} container`}>
        <div className={s.logo}>
          <Link href="/">KLЁN — architectural bureau</Link>
          <img
            src={"/img/logo.svg"}
            alt="KLЁN — architectural bureau"
          />
        </div>

        <button
          className={s.burger}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={s.mobileMenuWrapper}>
          <nav>
            <ul>
              <li><Link href="/buro">Бюро</Link></li>
              <li><Link href="/projects">Проекты</Link></li>
              <li><Link href="/services">Услуги</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
            </ul>
          </nav>

          <div className={s.contacts}>
            <a
              href="https://www.t.me/#"
              target="_blank"
            ><img
              src="/img/icon/Telegram.svg"
              alt=""
            /></a>
            <a href="tel:+79267617433">+7 (926) 761-74-33</a>
          </div>
        </div>
      </div>
    </header>
  );
};
