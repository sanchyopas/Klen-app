import { ReactElement } from "react";
import s from "./title.module.scss"

type TitleProps = {
  title: ReactElement;
  className?: string;
  is_mobile?: boolean;
}

export default function Title( { title, className, is_mobile }:TitleProps  ) {
  return (
    <div className={`${s.title} ${className} ${is_mobile ? s.mb : ""}`}>
      {title}
    </div>
  );
};
