"use client";

import s from "./ServicesMobile.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules"; // Добавлен модуль Thumbs
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs"; // Импорт стилей для миниатюр
import { NavigationOptions } from "swiper/types";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type SliderProps = {
  is_mobile?: boolean;
  slides: any;
  is_boolet?: boolean;
  name_btn?: string;
  link_btn?: string;
  title?: string;
  title_as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  class_name?: string;
};

type Slide = {
  alias: string;
  main_screen_title: any;
  main_screen: any;
  image: any;
};

export default function ServiceMobile({
                                        is_mobile,
                                        slides,
                                        is_boolet,
                                        name_btn,
                                        link_btn,
                                        title,
                                        title_as,
                                        class_name,
                                      }: SliderProps) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const paginationRef = useRef(null);
  const sliderRef = useRef(null);

  const [isMounted, setIsMounted] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null); // Состояние для миниатюр
  const [activeThumbIndex, setActiveThumbIndex] = useState(0); // Состояние для активного слайда

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;
    setIsMounted(true);

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div
      ref={sliderRef}
      className={`${s.slider} ${is_mobile ? s.mb : ""} ${!!class_name && class_name}`}
    >
      <div className="container">
        {!!title && <Title title={title} is_mobile={false} />}

        {/* Основной слайдер */}
        <Swiper
          modules={[Pagination, Navigation, Thumbs]} // Добавлен модуль Thumbs
          pagination={{
            el: paginationRef.current,
            clickable: true,
          }}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          thumbs={{ swiper: thumbsSwiper }} // Связь с миниатюрами
          onInit={(swiper) => {
            if (!swiper.params.navigation) return;
            const navigation = swiper.params.navigation as NavigationOptions;
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;

            swiper.navigation?.init();
            swiper.navigation?.update();
          }}
          onSlideChange={(swiper) => {
            // Обновляем индекс активного слайда
            setActiveThumbIndex(swiper.activeIndex);
          }}
        >
          {slides.map((item: Slide, i: number) => (
            <SwiperSlide className={s.slider__slide} key={i}>
              <Link
                href={`/services/${item.alias}`}
                className={""}
                prefetch={true}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {!!item.main_screen.image || !!item.image ? (
                  item.hasOwnProperty("main_screen") ? (
                    <img
                      src={`${API_URL}${item.main_screen.image}`}
                      alt=""
                    />
                  ) : (
                    <img
                      src={`${API_URL}${item.image}`}
                      alt=""
                    />
                  )
                ) : null}
                <span>{item.main_screen_title}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s["slider__actions"]}>
          {!is_boolet && (
            <LinkWithWrapper dotReverce={false} isWrapper={false} name={name_btn} link={link_btn} />
          )}

          {/* Слайдер миниатюр */}
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper} // Устанавливаем Swiper для миниатюр
            slidesPerView={slides.length} // Отображаем все слайды
            freeMode={true} // Свободный режим для прокрутки миниатюр
            watchSlidesProgress={true} // Следим за прогрессом слайдов
            className={s.thumbsSlider} // Добавляем класс для стилизации
          >
            {slides.map((item: Slide, i: number) => (
              <SwiperSlide
                key={i}
                className={`${s.thumbSlide} ${activeThumbIndex === i ? s.active : ""}`} // Добавляем кастомный класс для активного слайда
              >
                {i + 1} {/* Отображаем порядковый номер слайда */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}