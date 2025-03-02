import Link from "next/link";
import s from "./link.module.scss"

type LinkProps = {
  dotReverce: boolean;
  isWrapper: boolean;
  name: string;
  link: string;
}
export default function LinkWithWrapper({dotReverce, isWrapper, name, link}: LinkProps) {
  return (
    <>
      {isWrapper ? (
        <div className={s.linkWrapper}>
          <Link href={link} className={`${s.link} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</Link>
        </div>
      ) : (
        <Link href={link} className={`${s.link} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</Link>
      )}
    </>)
}