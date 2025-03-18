import React from "react";
import FormProject from "@/app/components/FormProject/FormProject";
import FormTender from "@/app/components/FormTender/FormTender";
import {useModalStore} from "@/app/components/Modal/modalStore";

export const useModalHandlers = () => {
  const { openModal } = useModalStore();

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
