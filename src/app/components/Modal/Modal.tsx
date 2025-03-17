import { useEffect, useRef } from 'react';
import { useModal } from './ModalContext';
import s from "./modal.module.scss";
import Image from "next/image";
import gsap from 'gsap';
import React, { isValidElement } from 'react';

type ModalContentProps = {
  animateCloseModal?: () => void;
};

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  const getScrollbarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  const disableBodyScroll = () => {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0';
  };

  useEffect(() => {
    if (isOpen && modalRef.current && modalWrapperRef.current) {
      disableBodyScroll();

      // Устанавливаем начальное состояние: модальное окно за пределами экрана по оси Y
      gsap.set(modalRef.current, { y: '50px', opacity: 0 });
      gsap.set(modalWrapperRef.current, { opacity: 0 });

      modalWrapperRef.current.style.display = 'flex';

      // Анимация появления: перемещаем модальное окно в видимую область
      gsap.to(modalWrapperRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(modalRef.current, {
        y: '0%',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.1,
        onComplete: () => {
          if (modalWrapperRef.current) {
            modalWrapperRef.current.classList.add(s.overflow);
          }
        },
      });
    }
  }, [isOpen]);

  const animateCloseModal = () => {
    if (modalRef.current && modalWrapperRef.current) {
      if (modalWrapperRef.current) {
        modalWrapperRef.current.classList.remove(s.overflow);
      }

      // Анимация скрытия: перемещаем модальное окно за пределы экрана по оси Y
      gsap.to(modalRef.current, {
        y: '50px',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(modalWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (modalWrapperRef.current) {
            modalWrapperRef.current.style.display = 'none';
          }
          enableBodyScroll();
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        animateCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  useEffect(() => {
    return () => {
      enableBodyScroll();
    };
  }, []);

  if (!isOpen || !modalContent) return null;

  const contentWithCloseModal = isValidElement(modalContent.content)
    ? React.cloneElement(modalContent.content, {
      animateCloseModal,
    } as ModalContentProps)
    : modalContent.content;

  return (
    <div
      className={s.modalWrapper}
      onClick={animateCloseModal}
      ref={modalWrapperRef}
    >
      <div
        className={s.modal}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div className={s.header}>
          <span className={s.title}>{modalContent.title ? modalContent.title : "Модальное окно"}</span>
          <button
            onClick={animateCloseModal}
            className={s.close}
          >
            <Image src={"/img/icon/X.svg"} alt={"KLЁN — architectural bureau"} width={24} height={24} priority/>
          </button>
        </div>

        <div>{contentWithCloseModal}</div>
      </div>
    </div>
  );
};