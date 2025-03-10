"use client"
import s from "./Cookie.module.scss";
import { useState, useEffect } from 'react';
import LinkWithWrapper from "@/app/components/Link/Link";
import Image from "next/image";

export default function Cookie() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже дано согласие
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  // if (!showBanner) {
  //   return null;
  // }

  return (
    <div className={[
      s.cookie,
      showBanner ? '' : s.hide
    ].filter(Boolean).join(' ')}>
      <div className={s.header}>
        <span className={s.title}>Мы используем файлы cookie</span>
        <button
          onClick={handleAccept}
          className={s.accept}
        >
          <Image src={"/img/icon/X.svg"} alt={"KLЁN — architectural bureau"} width={24} height={24}/>
        </button>
      </div>
      <LinkWithWrapper className={s.linkWrapper} link={"/policy"} dotReverce={false} isWrapper={true} name={"подробнее"} />
    </div>
  );
}