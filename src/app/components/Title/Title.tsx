import s from "./title.module.scss"

type TitleProps = {
  title: string;
  className?: string;
  is_mobile?: boolean;
}

export default function Title( { title, className, is_mobile }:TitleProps  ) {
  return (
    <div className={`${s.title} ${className} ${is_mobile ? s.mb : ""}`}>
      <h2>{title}</h2>
    </div>
  );
};
