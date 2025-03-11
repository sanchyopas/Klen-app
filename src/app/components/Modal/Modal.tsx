import { useEffect } from 'react';
import { useModal } from './ModalContext';
import s from "./modal.module.scss";
import Image from "next/image";

export const Modal = () => {
  const { isOpen, modalContent, closeModal } = useModal();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  if (!isOpen || !modalContent) return null;

  return (
    <div
      className={s.modalWrapper}
      onClick={closeModal}
    >
      <div
        className={s.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.header}>
          <span className={s.title}>{modalContent.title ? modalContent.title : "Модальное окно"}</span>
          <button
            onClick={closeModal}
            className={s.close}
          >
            <Image src={"/img/icon/X.svg"} alt={"KLЁN — architectural bureau"} width={24} height={24}/>
          </button>
        </div>

        <div>{modalContent.content}</div>
      </div>
    </div>
  );
};