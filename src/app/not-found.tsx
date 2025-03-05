import React from 'react';
import s from './not-found.module.scss'
import Image from "next/image";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function NotFound () {
  return (
    <section className={s.page404}>
      <div className="container">
        <Image src={"/img/404.png"} width={640} height={265} alt={"KLЁN — architectural bureau"} layout="responsive"/>

        <div className={s.text}>
          <span>Страница не существует, была переименована или удалена</span>
        </div>

        <div className={s.linkList}>
          <LinkWithWrapper link={"/"} dotReverce={false} isWrapper={false}
                           name={"На главную"}/>
          <LinkWithWrapper link={"/projects"} dotReverce={false} isWrapper={false}
                           name={"Проекты"}/>
        </div>
      </div>
    </section>
  );
};
