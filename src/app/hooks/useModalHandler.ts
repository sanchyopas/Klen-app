import React from "react";
import { useModal } from "@/app/components/Modal/ModalContext";
import FormProject from "@/app/components/FormProject/FormProject";
import FormTender from "@/app/components/FormTender/FormTender";

export const useModalHandlers = () => {
  const { openModal } = useModal();

  const handleOpenModalBid = () => {
    openModal({
      title: "Обсудить проект",
      content: React.createElement(FormProject),
    });
  };

  const handleOpenModalTender = () => {
    openModal({
      title: "Пригласить в тендер/конкурс",
      content: React.createElement(FormTender),
    });
  };

  return { handleOpenModalBid, handleOpenModalTender };
};
