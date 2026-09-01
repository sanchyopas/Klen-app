"use client";

import Link from "next/link";
import s from "./link.module.scss"

type LinkProps = {
  dotReverce: boolean;
  isWrapper: boolean;
  className?: string;
  name?: string;
  link?: string;
  dotOnHover?: boolean;
}
export default function LinkWithWrapper({className, dotReverce, isWrapper, name, link, dotOnHover}: LinkProps) {
  // dotOnHover — точка появляется только по наведению
  const dotClass = dotOnHover ? s.dotHover : (dotReverce ? s.dotReverce : s.dot);

  return (
    <>
      {isWrapper ? (
        <div className={ className ? `${className} ${s.linkWrapper}` : s.linkWrapper}>
          <Link href={link ?? "#"} className={`${s.link} ${dotClass}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >{name}</Link>
        </div>
      ) : (
        <>
          <Link href={link ?? "#"} className={`${s.link} ${dotClass}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >{name}</Link>
        </>
      )}
    </>)
}