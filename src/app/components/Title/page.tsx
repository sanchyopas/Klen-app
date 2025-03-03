import s from "./title.module.scss"

export default function Title( { title }:any  ) {
  return (
    <div className={s.title}>
      <h2>{title}</h2>
    </div>
  );
};
