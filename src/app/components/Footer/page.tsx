import React from 'react';
import s from "./footer.module.scss"
import Link from "next/link";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/page";

export default function Footer () {
  return (
    <>
      <footer className={s.footer}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <div className={s.logo}>
                <a href="/">KLЁN — architectural bureau</a>
                <img
                  src="/img/Logo.svg"
                  alt="KLЁN — architectural bureau"
                />
              </div>

              <nav>
                <ul>
                  <li>
                    <LinkWithWrapper dotReverce={true} isWrapper={false} name={"Бюро"} link={"/buro"} />
                  </li>
                  <li>
                    <LinkWithWrapper dotReverce={true} isWrapper={false} name={"Проекты"} link={"/projects"} />
                  </li>
                  <li>
                    <LinkWithWrapper dotReverce={true} isWrapper={false} name={"Услуги"} link={"/services"} />
                  </li>
                  <li>
                    <LinkWithWrapper dotReverce={true} isWrapper={false} name={"Контакты"} link={"/contacts"} />
                  </li>
                </ul>
              </nav>
            </div>

            <div className="col-12 col-md-6">
              <Title title={"Давайте обсудим ваш проект"}/>
              <ul>
                <li>
                  <LinkWithWrapper dotReverce={false} isWrapper={false} name={"Отправить заявку"} link={"#"} />
                </li>
                <li className={s.grayLink}>
                  <LinkWithWrapper dotReverce={false} isWrapper={false} name={"Пригласить в тендер"} link={"#"} />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={`container ${s.footerEndLine}`}>
          <div className={`${s.row} row`}>
            <div className="col-12 col-md-6">
              <span>ⓒ 2025</span>
            </div>

            <div className="col-12 col-md-6">
              <a href="#">политика конфиденциальности</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};