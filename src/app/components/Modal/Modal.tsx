"use client";

import { useEffect, useRef } from "react";
import s from "./modal.module.scss";
import Image from "next/image";
import gsap from "gsap";
import React, { isValidElement } from "react";
import {useModalStore} from "@/app/components/Modal/modalStore";

type ModalContentProps = {
  animateCloseModal?: () => void;
};

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModalStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && modalWrapperRef.current) {
      modalWrapperRef.current.style.display = "flex"; // Убираем display: none

      gsap.fromTo(
        modalWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.current,
        { y: "50px", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.3, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [isOpen]);

  const animateCloseModal = () => {
    if (modalRef.current && modalWrapperRef.current) {
      gsap.to(modalRef.current, {
        y: "50px",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      gsap.to(modalWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          modalWrapperRef.current!.style.display = "none"; // Скрываем после анимации
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") animateCloseModal();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!isOpen || !modalContent) return null;

  const contentWithCloseModal = isValidElement(modalContent.content)
    ? React.cloneElement(modalContent.content, { animateCloseModal } as ModalContentProps)
    : modalContent.content;

  return (
    <div className={s.modalWrapper} onClick={animateCloseModal} ref={modalWrapperRef}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <div className={s.header}>
          <span className={s.title}>{modalContent.title || "Модальное окно"}</span>
          <button onClick={animateCloseModal} className={s.close}>
            <Image src={"/img/icon/X.svg"} alt={"Закрыть"} width={24} height={24} priority />
          </button>
        </div>
        <div>{contentWithCloseModal}</div>
      </div>
    </div>
  );
};
