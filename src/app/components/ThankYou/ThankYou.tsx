import React, { useState } from 'react';
import s from "./thank-you.module.scss";
import ButtonWithWrapper from "@/app/components/Button/Button";
import LinkWithWrapper from "@/app/components/Link/Link";

export default function ThankYou({ animateCloseModal } : any) {
  return (
    <>
      <p className={s.thText}>Мы свяжемся с вами в ближайшее время</p>
      <ButtonWithWrapper onClick={animateCloseModal}  className="" dotReverce={false} isWrapper={false} name={"Буду ждать"} />
    </>
  );
}