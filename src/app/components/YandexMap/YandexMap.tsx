"use client";
import s from "./map.module.scss";
import React, {useEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import ButtonWithWrapper from "@/app/components/Button/Button";
import {useModalHandlers} from "@/app/hooks/useModalHandler";
import {useModalStore} from "@/app/components/Modal/modalStore";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    ymaps?: any;
  }
}

type Props = {
  phone: string;
  title_h2: string;
  email: string;
  address: string;
  hours: string;
  coords: string;
  tg: string;
};

type InfoProps = {
  info: Props;
};

export default function YandexMap({info}: InfoProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const listItemsRef = useRef<HTMLDivElement[]>([]);
  const buttonsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let map: any;

    const loadMap = () => {
      if (!window.ymaps) return;

      window.ymaps.ready(() => {
        map = new window.ymaps.Map(mapContainer.current, {
          center: [55.755135, 37.561625],
          zoom: 14,
          controls: [],
          scaleble: false,
        });

        const isTouch = window.matchMedia && window.matchMedia("(pointer:coarse)").matches;

        if (isTouch) {
          map.behaviors.disable("drag");
          map.behaviors.disable("multiTouch");
          map.behaviors.disable("scrollZoom");
        }

        map.behaviors.disable("scrollZoom");
        map.behaviors.disable("dblClickZoom");
        map.behaviors.disable("multiTouch");
        map.controls.remove("zoomControl");

        const placemark = new window.ymaps.Placemark(
          [55.755135, 37.561625],
          {
            hintContent: "Офис KLЁN",
            balloonContent: "Офис KLЁN",
          },
          {
            iconLayout: "default#image",
            iconImageHref: "/img/icon/Pin.png",
            iconImageSize: [40, 40],
            iconImageOffset: [-20, -20],
          }
        );

        map.geoObjects.add(placemark);
      });
    };

    if (!window.ymaps) {
      const script = document.createElement("script");
      script.src =
        "https://api-maps.yandex.ru/2.1/?apikey=8a32baae-0de4-4b36-b6db-ca41be50c172&lang=ru_RU";
      script.async = true;
      script.onload = loadMap;
      document.body.appendChild(script);
    } else {
      loadMap();
    }

    return () => {
      if (map) map.destroy();
    };
  }, []);

  useEffect(() => {
    const isTo = window.matchMedia("(max-width: 768px").matches;
    if (isTo) return;
    gsap.set([contactInfoRef.current, titleRef.current, listItemsRef.current, buttonsRef.current], {opacity: 0});

    const tl = gsap.timeline({
      defaults: {duration: 1, ease: "power3.out"},
      scrollTrigger: {
        trigger: mapContainer.current,
        start: "top 80%",
      },
    });

    tl.fromTo(contactInfoRef.current, {opacity: 0, y: 50}, {opacity: 1, y: 0}, "+=0.5")
      .fromTo(titleRef.current, {opacity: 0, y: 20}, {opacity: 1, y: 0}, "-=0.2")
      .fromTo(listItemsRef.current, {opacity: 0, y: 20}, {opacity: 1, y: 0, stagger: 0.2}, "-=0.6")
      .fromTo(buttonsRef.current, {opacity: 0, y: 20}, {opacity: 1, y: 0, stagger: 0.2}, "-=0.6");
  }, []);

  const {handleOpenModalBid, handleOpenModalTender} = useModalHandlers();

  const {openModal} = useModalStore();

  return (
    <div className={s.map}>
      <div className="container">
        <div className={s["map__inner"]}>
          <div ref={mapContainer} className={s["map-container"]}></div>
          <div ref={contactInfoRef} className={s["contact-info"]}>
            <div className={s["contact-info__body"]}>
              <h2 ref={titleRef}>{info?.title_h2}</h2>
              <div className={s["contact-info__list"]}>

                <div
                  key={0}
                  ref={(el) => {
                    if (el) listItemsRef.current[0] = el;
                  }}
                  className={s["contact-info__list-item"]}
                >
                  <div className={s["contact-info__list-icon"]}>
                    <img src={"/img/icon/tg.svg"} alt={"KLЁN — architectural bureau telegram"}/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href={`tel:${info?.phone}`}>
                      {info?.phone}
                    </a>
                    {info?.hours && <p className={s["contact-info__list-sublink"]}>{info?.hours}</p>}
                  </div>
                </div>
                <div
                  key={1}
                  ref={(el) => {
                    if (el) listItemsRef.current[1] = el;
                  }}
                  className={s["contact-info__list-item"]}
                >
                  <div className={s["contact-info__list-icon"]}>
                    <img src={"/img/icon/mail.svg"} alt={"KLЁN — architectural bureau telegram"}/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href={`mailto:${info?.email}`} target="_blank">
                      {info?.email}
                    </a>
                  </div>
                </div>
                <div
                  key={2}
                  ref={(el) => {
                    if (el) listItemsRef.current[2] = el;
                  }}
                  className={s["contact-info__list-item"]}
                >
                  <div className={s["contact-info__list-icon"]}>
                    <img src={"/img/icon/location.svg"} alt={"KLЁN — architectural bureau telegram"}/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <p className={s["contact-info__list-address"]}>
                      {info?.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className={s["contact-info__actions"]}>
                {[
                  {
                    refIndex: 0,
                    onClick: handleOpenModalBid,
                    name: "Отправить заявку",
                  },
                  {
                    refIndex: 1,
                    onClick: handleOpenModalTender,
                    name: "Пригласить в тендер",
                  },
                ].map(({refIndex, onClick, name}) => (
                  <div
                    key={refIndex}
                    ref={(el) => {
                      if (el) buttonsRef.current[refIndex] = el;
                    }}
                  >
                    <ButtonWithWrapper
                      onClick={onClick}
                      className=""
                      dotReverce={false}
                      isWrapper={false}
                      name={name}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
