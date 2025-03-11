"use client";

import s from "./services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

type Slide = {
  main_screen_title: string;
  order?: 1
  id?: number
  main_screen: {image: string}
}

type Props = {
  slides: Slide[]
  title?: string
  button_name?: string
  button_link?:string
  button_icon?: string
  is_pc: boolean
}

export default function Services({slides, title, button_name, button_link, is_pc}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);


  const handleImageChange = (index: number) => {
    if (index === activeIndex) return;

    const oldImage = document.querySelector(`.${s.activeImage}`) as HTMLImageElement | null;
    const newImage = document.createElement("img");
    newImage.src = `https://test-6600.fg.onl${slides[index].main_screen.image}`;
    newImage.alt = slides[index].main_screen_title;
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
        <Title title={"услуги"} as={"h2"} className={s.title} />
        <div className={`row ${s.row}`}>
          <div className={`col-12 col-lg-6 ${s.wrapper}`}>
            <div className={s.servicesList}>
              {slides.map((slide: any, index: number) => (
                <div
                  className={`${s.item} ${activeIndex === index ? s.active : ""}`}
                  key={index}
                  onMouseEnter={() => handleImageChange(index)}
                >
                  <h3 className={s.name}>{slide.main_screen_title}</h3>
                </div>
              ))}
            </div>
            <LinkWithWrapper
              dotReverce={false}
              className={s.linkWrapper}
              isWrapper={true}
              name={button_name}
              link={button_link}
            />
          </div>

          <div className="col-12 col-lg-6">
            <div className={s.imageContainer} ref={imageContainerRef}>
              <img
                src={`https://test-6600.fg.onl${slides[activeIndex].main_screen.image}`}
                alt={slides[activeIndex].main_screen_title}
                title={slides[activeIndex].main_screen_title}
                className={`${s.animatedImage} ${s.activeImage}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
