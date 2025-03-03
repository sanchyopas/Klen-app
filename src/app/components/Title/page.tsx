import s from "./title.module.scss"

type TitleProps = {
  title: string;
  className?: string;
}

export default function Title( { title, className }:TitleProps  ) {
  return (
    <div className={`${s.title} ${className}`}>
      <h2>{title}</h2>
    </div>
  );
};
