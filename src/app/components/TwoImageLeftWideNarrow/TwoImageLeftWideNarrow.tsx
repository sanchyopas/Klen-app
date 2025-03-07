import s from "@/app/projects/[id]/project.module.scss";

type Props = {
  image_left: string;
  image_right: string;
}
export default function TwoImageLeftWideNarrow({image_left, image_right}: Props){
  return (
    <section>
      <div className="container">
        <div className={s.imagesGreed}>
          <img className={s.wide} src={`https://dev.modx.fresco.bz/upload_resources/${image_left}`} alt="" />
          <img src={`https://dev.modx.fresco.bz/upload_resources/${image_right}`} alt="" />
        </div>
      </div>
    </section>
  )
}