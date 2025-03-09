"use client";

import s from "./services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type SlideType = {
  name: string;
  image: string;
  is_active: boolean;
};

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    { name: "Разработка продукта", image: "/img/image.jpg", is_active: true },
    { name: "Мастерпланы", image: "/img/image-1.jpg", is_active: false },
    { name: "Объемно-планировочные решения", image: "/img/image-2.jpg", is_active: false },
    { name: "Фасадные решения", image: "/img/image-3.jpg", is_active: false },
    { name: "Благоустройство", image: "/img/image-4.jpg", is_active: false },
    { name: "Интерьерные решения", image: "/img/image-5.jpg", is_active: false },
    { name: "Финансовые показатели проекта", image: "/img/image-6.jpg", is_active: false },
  ];

  const handleImageChange = (index: number) => {
    if (index === activeIndex) return;

    const oldImage = document.querySelector(`.${s.activeImage}`) as HTMLImageElement | null;
    const newImage = document.createElement("img");

    newImage.src = slides[index].image;
    newImage.alt = slides[index].name;
    newImage.className = s.animatedImage;
    newImage.style.opacity = "0";
    newImage.style.transform = "scale(1.2)";

    if (imageContainerRef.current) {
      imageContainerRef.current.appendChild(newImage);

      if (oldImage) {
        gsap.to(oldImage, {
          opacity: 0,
          scale: 1.2,
          duration: 0,
          ease: "power3.out",
          onComplete: () => {
            if (oldImage.parentNode) {
              oldImage.remove();
            }
          },
        });
      }

      gsap.to(newImage, {
        opacity: 1,
        scale: 1,
        duration: 0,
        ease: "power3.out",
      });
    }

    setActiveIndex(index);
  };

  return (
    <section id={s.services}>
      <div className="container">
        <Title title={"Услуги"} as={"h2"} className={s.title} />
        <div className={`row ${s.row}`}>
          <div className={`col-12 col-lg-6 ${s.wrapper}`}>
            <div className={s.servicesList}>
              {slides.map((slide, index) => (
                <div
                  className={`${s.item} ${activeIndex === index ? s.active : ""}`}
                  key={index}
                  onMouseEnter={() => handleImageChange(index)}
                >
                  <h3 className={s.name}>{slide.name}</h3>
                </div>
              ))}
            </div>
            <LinkWithWrapper
              dotReverce={false}
              className={s.linkWrapper}
              isWrapper={true}
              name={"Все услуги"}
              link={"/services"}
            />
          </div>

          <div className="col-12 col-lg-6">
            <div className={s.imageContainer} ref={imageContainerRef}>
              <img
                src={slides[activeIndex].image}
                alt={slides[activeIndex].name}
                title={slides[activeIndex].name}
                className={`${s.animatedImage} ${s.activeImage}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
