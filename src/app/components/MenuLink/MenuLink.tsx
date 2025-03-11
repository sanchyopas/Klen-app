import Link from "next/link";
import s from "./menu-link.module.scss"

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

type LinkProps = {
  clickEvent?: any;
  link: string;
  name: string;
}

export default function MenuLink({clickEvent, link, name}: LinkProps) {

  const router = useRouter();
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState([0, 0])

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        clickEvent();
        setIsActive(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {

    }
  }, [isActive]);

  const clickEffect = (e: any) => {
    const element = e.target.getBoundingClientRect();

    setPosition([e.clientX, e.clientY - element.top]);
    setIsActive(true);
  }

  return (
    <>
      <Link onClick={clickEffect} href={link ?? "#"} className={''} prefetch={true}>{name}</Link>
      <div className={isActive ? `${s.clickEffect} ${s.active}` : s.clickEffect}>
        <div style={{ left: position[0], top: position[1] }} className={isActive ? s.active : ''} ></div>
      </div>
    </>)
}