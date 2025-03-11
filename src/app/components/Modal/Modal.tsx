import { useEffect, useRef } from 'react'; // Добавлен useRef
import { useModal } from './ModalContext';
import s from "./modal.module.scss"; // Импорт стилей
import Image from "next/image";
import gsap from 'gsap'; // Импортируем GSAP
import React, { isValidElement } from 'react'; // Импортируем isValidElement для проверки типа

// Определяем тип пропсов для modalContent.content
type ModalContentProps = {
  animateCloseModal?: () => void; // Добавляем animateCloseModal как опциональный пропс
};

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();
  const modalRef = useRef<HTMLDivElement>(null); // Ref для модального окна
  const modalWrapperRef = useRef<HTMLDivElement>(null); // Ref для обертки модального окна

  // Функция для вычисления ширины скроллбара
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

  // Отключение скролла для body с добавлением padding
  const disableBodyScroll = () => {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Добавляем padding равный ширине скроллбара
  };

  // Включение скролла для body с удалением padding
  const enableBodyScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0'; // Убираем padding
  };

  // Анимация появления модального окна
  useEffect(() => {
    if (isOpen && modalRef.current && modalWrapperRef.current) {
      // Отключаем скролл для body при открытии модального окна
      disableBodyScroll();

      // Устанавливаем начальное состояние перед анимацией
      gsap.set(modalRef.current, { scale: 1.5, opacity: 0 });
      gsap.set(modalWrapperRef.current, { opacity: 0 });

      // Показываем обертку перед анимацией
      modalWrapperRef.current.style.display = 'flex';

      // Анимация появления
      gsap.to(modalWrapperRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(modalRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        delay: 0.1, // Небольшая задержка для плавного появления
        onComplete: () => {
          // Добавляем класс overflow после завершения анимации
          if (modalWrapperRef.current) {
            modalWrapperRef.current.classList.add(s.overflow);
          }
        },
      });
    }
  }, [isOpen]);

  // Функция для анимации скрытия модального окна
  const animateCloseModal = () => {
    if (modalRef.current && modalWrapperRef.current) {
      // Убираем класс overflow перед анимацией скрытия
      if (modalWrapperRef.current) {
        modalWrapperRef.current.classList.remove(s.overflow);
      }

      // Анимация скрытия
      gsap.to(modalRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });

      gsap.to(modalWrapperRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          // После завершения анимации скрываем обертку и вызываем closeModal
          if (modalWrapperRef.current) {
            modalWrapperRef.current.style.display = 'none';
          }
          // Включаем скролл для body при закрытии модального окна
          enableBodyScroll();
          closeModal();
        },
      });
    }
  };

  // Закрытие модального окна по нажатию на Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        animateCloseModal(); // Анимированное закрытие
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      // Включаем скролл для body при размонтировании компонента
      enableBodyScroll();
    };
  }, []);

  if (!isOpen || !modalContent) return null;

  // Проверяем, является ли modalContent.content ReactElement
  const contentWithCloseModal = isValidElement(modalContent.content)
    ? React.cloneElement(modalContent.content, {
      animateCloseModal, // Передаем функцию как пропс
    } as ModalContentProps) // Указываем тип пропсов
    : modalContent.content; // Если это не ReactElement, возвращаем как есть

  return (
    <div
      className={s.modalWrapper}
      onClick={animateCloseModal} // Анимированное закрытие при клике на обертку
      ref={modalWrapperRef} // Ref для обертки
    >
      <div
        className={s.modal}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef} // Ref для модального окна
      >
        <div className={s.header}>
          <span className={s.title}>{modalContent.title ? modalContent.title : "Модальное окно"}</span>
          <button
            onClick={animateCloseModal} // Анимированное закрытие при клике на кнопку
            className={s.close}
          >
            <Image src={"/img/icon/X.svg"} alt={"KLЁN — architectural bureau"} width={24} height={24} priority/>
          </button>
        </div>

        <div>{contentWithCloseModal}</div> {/* Используем клонированный элемент или оригинальный контент */}
      </div>
    </div>
  );
};