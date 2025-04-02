"use client";

import s from "./Slider.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Thumbs, EffectCreative} from "swiper/modules";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/effect-creative';
import {NavigationOptions} from "swiper/types";
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/Title";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

type SliderProps = {
  is_mobile?: boolean;
  slide_contian?: boolean;
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
  main_screen: any;
  image: any;
};

export default function Slider({
                                 is_mobile,
                                 slide_contian,
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
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;
    setIsMounted(true);

    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        {opacity: 0, y: 50},
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
    <>
      <div
        ref={sliderRef}
        className={`${s.slider} ${is_mobile ? s.mb : ""}  ${slide_contian ? s.slideContain : ""} ${!!class_name && class_name}`}
      >
        <div className="container">
          {!!title && <Title title={title} as={title_as} />}

          <Swiper
            speed={500}
            loop={true} // Основной слайдер зациклен
            grabCursor={true}
            effect={'creative'}
            creativeEffect={{
              prev: {
                translate: [0, 0, -400],
                opacity: 0,
              },
              next: {
                translate: ['100%', 0, 0],
                opacity: 1,
              },
            }}
            modules={[Pagination, Navigation, Thumbs, EffectCreative]}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            navigation={{
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            onInit={(swiper) => {
              if (!swiper.params.navigation) return;
              const navigation = swiper.params.navigation as NavigationOptions;
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;

              swiper.navigation?.init();
              swiper.navigation?.update();
            }}
            onSlideChange={(swiper) => {
              setActiveThumbIndex(swiper.realIndex);
            }}
          >
            {slides.map((item: Slide, i: number) => (
              <SwiperSlide className={s.slider__slide} key={i}>
                {
                  item.hasOwnProperty("main_screen") ?
                    <Image src={`${API_URL}${item.main_screen.image}`} alt="" width={1360} height={720} />
                    :
                    <Image src={`${API_URL}${item.image}`} alt="" width={1360} height={720} />
                }
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={s["slider__actions"]}>
            {is_boolet ? (
              <div className={s.thumbsContainer}>
                <Swiper
                  modules={[Thumbs]}
                  onSwiper={setThumbsSwiper}
                  slidesPerView={slides.length} // Всегда показываем все миниатюры
                  watchSlidesProgress={true}
                  className={s.thumbsSlider}
                  noSwiping={true} // Отключаем свайп для миниатюр
                  noSwipingClass={s.thumbSlide} // Указываем класс для элементов, на которых не работает свайп
                >
                  {slides.map((item: Slide, i: number) => (
                    <SwiperSlide
                      key={i}
                      className={`${s.thumbSlide} ${activeThumbIndex === i ? s.active : ""}`}
                      onClick={() => thumbsSwiper?.slideTo(i)}
                    >
                      {i + 1}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <LinkWithWrapper dotReverce={false} isWrapper={false} name={name_btn} link={link_btn}/>
            )}

            <div className={s["slider__navigations"]}>
              <button ref={prevRef} className={s["slider__prev"]}>
                <img src="/img/icon/arrow_left.svg" alt=""/>
              </button>
              <button ref={nextRef} className={s["slider__next"]}>
                <img src="/img/icon/arrow_right.svg" alt=""/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}