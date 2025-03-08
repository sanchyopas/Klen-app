"use client"
import s from "./services.module.scss"
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

type SlideType = {
  name: string
  image: string
  is_active: boolean
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const slides = [
    {
      "name": "Разработка продукта",
      "image": "/img/image.jpg",
      "is_active": true
    },
    {
      "name": "Мастерпланы",
      "image": "/img/image-1.jpg",
      "is_active": false
    },
    {
      "name": "объемно-планировочные решения",
      "image": "/img/image-2.jpg",
      "is_active": false
    },
    {"name": "Фасадные решения", "image": "/img/image-3.jpg", "is_active": false},
    {"name": "благоустройство", "image": "/img/image-4.jpg", "is_active": false},
    {
      "name": "Интерьерные решения",
      "image": "/img/image-5.jpg",
      "is_active": false
    },
    {
      "name": "Финансовые показатели проекта",
      "image": "/img/image-6.jpg",
      "is_active": false
    }
  ]

  const titleClickHandler = (index: number) => {
    setActiveIndex(index);
    if(swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  }

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
                  onClick={() => titleClickHandler(index)}
                >
                  <h3 className={s.name} >{slide.name}</h3>
                </div>
              ))}
            </div>
            <LinkWithWrapper dotReverce={false} className={s.linkWrapper} isWrapper={true} name={"Все услуги"} link={"/services"}/>
          </div>

          <div className="col-12 col-lg-6">
            <Swiper
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className={s.servicesImageList}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              autoHeight={true}
            >
              {slides.map((slide:SlideType, index:number) => (
                <SwiperSlide
                  className={`${s.item}`}
                  key={index}
                >
                  <img
                    src={slide.image}
                    alt={slide.name}
                    title={slide.name}
                  />
                  <p className={s.name}>{slide.name}</p>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>

  );
};
