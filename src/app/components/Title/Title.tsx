import {ReactElement} from "react";
import s from "./title.module.scss"

type TitleProps = {
  title: string;
  className?: string;
  is_mobile?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Title({title, className, is_mobile, as: Tag = "h2"}: TitleProps) {
  return (
    <div className={`${s.title} ${className} ${is_mobile ? s.mb : ""}`}>
      <Tag>{title}</Tag>
    </div>
  );
};
