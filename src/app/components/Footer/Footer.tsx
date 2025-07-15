"use client";

import React from 'react';
import s from "./footer.module.scss"
import Link from "next/link";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import {useModal} from "@/app/components/Modal/ModalContext";
import FormProject from "@/app/components/FormProject/FormProject";
import ButtonWithWrapper from "@/app/components/Button/Button";
import FormTender from "@/app/components/FormTender/FormTender";
import {useModalHandlers} from "@/app/hooks/useModalHandler";


export default function Footer () {
  const { handleOpenModalBid, handleOpenModalTender } = useModalHandlers();

  return (
    <>
      <footer className={s.footer}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.logo}>
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>KLЁN — architectural bureau</Link>
                <img
                  src="/img/Logo-footer.svg"
                  alt="KLЁN — architectural bureau"
                />
              </div>

              <nav>
                <ul>
                  <li>
                    <LinkWithWrapper className="" dotReverce={true} isWrapper={false} name={"Бюро"}
                                     link={"/bureau"} />
                  </li>
                  <li>
                    <LinkWithWrapper className="" dotReverce={true} isWrapper={false} name={"Проекты"}
                                     link={"/projects"}/>
                  </li>
                  <li>
                    <LinkWithWrapper className="" dotReverce={true} isWrapper={false} name={"Услуги"}
                                     link={"/services"}/>
                  </li>
                  <li>
                    <LinkWithWrapper className="" dotReverce={true} isWrapper={false} name={"Контакты"}
                                     link={"/contacts"}/>
                  </li>
                </ul>
              </nav>
            </div>

            {/*<div className="col-12 col-md-6">*/}
            {/*  <Title title={"Давайте обсудим ваш проект"} as={"h2"}/>*/}
            {/*  <ul>*/}
            {/*    <li>*/}
            {/*      <ButtonWithWrapper onClick={handleOpenModalBid} className="" dotReverce={false} isWrapper={false} name={"Отправить заявку"} />*/}
            {/*    </li>*/}
            {/*    <li className={s.grayLink}>*/}
            {/*      <ButtonWithWrapper onClick={handleOpenModalTender} className="" dotReverce={false} isWrapper={false} name={"Пригласить в тендер"} />*/}
            {/*    </li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
          </div>
        </div>

        <div className={`container ${s.footerEndLine}`}>
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <span>ⓒ 2025</span>
            </div>

            <div className="col-12 col-md-6">
              <Link href={"/privacy"} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>политика конфиденциальности</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};