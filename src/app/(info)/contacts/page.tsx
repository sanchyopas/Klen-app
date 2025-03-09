import React from 'react';
import YandexMap from "@/app/components/YandexMap/YandexMap";

export async function generateMetadata() {
  return {
    title: "Контакты • KLËN — architectural bureau",
  };
}

export default function Contact() {
  return (
    <>
      <YandexMap />
    </>
  );
};

;