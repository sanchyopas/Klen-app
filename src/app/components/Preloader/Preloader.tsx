import s from "./preloader.module.scss"
import Image from "next/image";

export default function Preloader() {

  return (<>
    <div className={s.preloader}>
      <div className={s.logo}>
        <Image src={"/img/Preloader.png"} alt={"KLЁN — architectural bureau"} width={117} height={40} layout="responsive" />
      </div>
    </div>
  </>)
}