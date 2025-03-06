'use client';

import Link from "next/link";
import s from "./link.module.scss"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


type LinkProps = {
  dotReverce: boolean;
  isWrapper: boolean;
  className?: string;
  name?: string;
  link?: string;
}
export default function LinkWithWrapper({className, dotReverce, isWrapper, name, link}: LinkProps) {

  const router = useRouter();
  const [isActive, setIsActive] = useState(false)
  const [linkComponent, setLink] = useState('')

  useEffect(() => {
    if (isActive) {
      const timeoutId = setTimeout(() => {
        router.push(linkComponent);
        setIsActive(false);
      }, 750);

      return () => clearTimeout(timeoutId);
    }
  }, [isActive]);

  const transitionEffect = (e: any) => {
    e.preventDefault();
    setLink(e.target.href);
    setIsActive(true);
  }

  return (
    <>
      {isWrapper ? (
        <div className={ className ? `${className} ${s.linkWrapper}` : s.linkWrapper}>
          <Link onClick={transitionEffect} href={link ?? "#"} className={`${s.link} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</Link>
          <div className={ isActive? `${s.transataonEffect} ${s.active}` : s.transataonEffect}></div>
        </div>
      ) : (
        <>
          <Link onClick={transitionEffect} href={link ?? "#"} className={`${s.link} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</Link>
          <div className={ isActive? `${s.transataonEffect} ${s.active}` : s.transataonEffect}></div>
        </>
      )}
    </>)
}