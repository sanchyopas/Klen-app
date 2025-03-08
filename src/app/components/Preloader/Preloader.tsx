'use client';

import s from "./preloader.module.scss"
import Image from "next/image";
import {useEffect, useState} from "react";

export default function Preloader() {

  const [screenLoading, setScreenLoading] = useState(true);

  useEffect(() => {
    setScreenLoading(true);
    setTimeout(() => {
      setScreenLoading(false);
    }, 3000);
  }, []);

  return (<>
    {screenLoading && <div className={s.preloader}>
        <div className={s.logo}>
            <Image src={"/img/Preloader.png"} alt={"KLЁN — architectural bureau"} width={117} height={40}
                   layout="responsive"/>
        </div>
    </div>}
  </>)
}