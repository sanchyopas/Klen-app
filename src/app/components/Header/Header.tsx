"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import s from "./header.module.scss";
import Link from "next/link";
import Image from "next/image";
import MenuLink from "@/app/components/MenuLink/MenuLink";
import useAppHeight from "@/app/hooks/useAppHeight";

type HeaderProps = {
  headerData: {
    telegram?: string;
    phone?: string;
  };
};

export default function Header({ headerData }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useAppHeight();

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    gsap.fromTo(
      ".logo",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );

    gsap.fromTo(
      gsap.utils.toArray(".menu-item"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.4 }
    );

    gsap.fromTo(
      gsap.utils.toArray(".contact-item"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.6 }
    );
  }, []);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isFixMenu, setIsFixMenu] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isHide, setIsHide] = useState(false);

  const getScrollbarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  const disableBodyScroll = () => {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  };

  useEffect( () => {
    if (menuOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < prevScrollPos) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }

      if (currentScrollPos <= 1000) {
        setIsFixMenu(false);
      } else {
        setIsFixMenu(true);
      }

      if (currentScrollPos <= 150) {
        setIsHide(false);
      } else {
        setIsHide(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

const menuItem = [
  // {
  //   "name": "Бюро",
  //   "link": "/buro"
  // },
  {
    "name": "Проекты",
    "link": "/projects"
  },{
    "name": "Услуги",
    "link": "/services"
  },{
    "name": "Контакты",
    "link": "/contacts"
  },
]

  return (
    <header className={[
      s.header,
      isFixMenu ? s.fixMenu : '',
      isShow ? s.show : '',
      isHide ? s.hide : '',
    ].filter(Boolean).join(' ')}>
      <div className={`${s.container} container`}>
        <div className={`${s.logo} logo`}>
          <Link href="/">KLЁN — architectural bureau</Link>
          <Image src={"/img/Logo.svg"} alt={"KLЁN — architectural bureau"} width={117} height={40} layout="responsive"/>
        </div>

        <button className={menuOpen ? `${s.burger} ${s.open}` : s.burger} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`${menuOpen ? `${s.mobileMenuWrapper} ${s.open}` : s.mobileMenuWrapper} mobileMenuWrapper`}>
          <nav>
            <ul>
              {menuItem.map((item, index) => (
                <li key={index} className="menu-item">
                  <MenuLink clickEvent={() => setMenuOpen(false)} link={item.link} name={item.name}/>
                </li>
              ))}
            </ul>
          </nav>

          <div className={s.contacts}>
            <a href={`${headerData?.telegram}`} target="_blank" className="contact-item">
              <img src="/img/icon/Telegram.svg" alt="Telegram"/>
            </a>
            <a href={`tel:${headerData?.phone}`} className="contact-item">{headerData?.phone}</a>
          </div>
        </div>
      </div>
    </header>
      );
    }
