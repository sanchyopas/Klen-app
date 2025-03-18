"use client";

import { create } from "zustand";

type ModalContent = {
  title?: string;
  content: React.ReactNode;
};

type ModalStore = {
  isOpen: boolean;
  modalContent: ModalContent | null;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}));
