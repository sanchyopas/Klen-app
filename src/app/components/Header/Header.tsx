'use client'

import s from "./header.module.scss"
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import MenuLink from "@/app/components/MenuLink/MenuLink";

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <header className={s.header}>
      <div className={`${s.container} container`}>
        <div className={s.logo}>
          <Link href="/">KLЁN — architectural bureau</Link>
          <Image src={"/img/Logo.svg"} alt={"KLЁN — architectural bureau"} width={117} height={40} layout="responsive" />
        </div>

        <button
          className={ menuOpen ? `${s.burger} ${s.open}` : s.burger }
          onClick={openMenu}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={ menuOpen ? `${s.mobileMenuWrapper} ${s.open}` : s.mobileMenuWrapper }>
          <nav>
            <ul>
              <li><MenuLink clickEvent={openMenu} link={'/buro'} name={'Бюро'}/></li>
              <li><MenuLink clickEvent={openMenu} link={'/projects'} name={'Проекты'}/></li>
              <li><MenuLink clickEvent={openMenu} link={'/services'} name={'Услуги'}/></li>
              <li><MenuLink clickEvent={openMenu} link={'/contacts'} name={'Контакты'}/></li>
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
