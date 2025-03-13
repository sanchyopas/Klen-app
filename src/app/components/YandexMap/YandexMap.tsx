"use client";
import s from "./map.module.scss";
import React, { useEffect, useRef } from "react";
import LinkWithWrapper from "@/app/components/Link/Link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ButtonWithWrapper from "@/app/components/Button/Button";
import {useModalHandlers} from "@/app/hooks/useModalHandler";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    ymaps?: any;
  }
}

type Props = {
  phone: string,
  title_h2: string,
  email: string,
  address: string,
  hours: string,
  coords: string,
  tg: string,
}

type InfoProps = {
  info: Props;
}

export default function YandexMap({info}:InfoProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const contactInfoRef = useRef<HTMLDivElement | null>(null);
  const listItemsRef = useRef<HTMLDivElement[]>([]);

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

        const layer = window.ymaps.layer.storage.get("map#custom");

        if (!layer) {
          window.ymaps.layer.storage.add("map#custom", function () {
            return new window.ymaps.Layer(
              "https://core-renderer-tiles.maps.yandex.net/tiles?l=map&x=%x&y=%y&z=%z&scale=1&lang=ru_RU"
            );
          });

          window.ymaps.mapType.storage.add(
            "custom#grey",
            new window.ymaps.MapType("Серая карта", ["map#custom"])
          );
        }

        map.setType("custom#grey");

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



    gsap.fromTo(
      mapContainer.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapContainer.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      contactInfoRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      listItemsRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        delay: 0.8,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  gsap.fromTo(
    ".contact-info__actions",
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 1.4,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-info__actions",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    }
  );


  const { handleOpenModalBid, handleOpenModalTender } = useModalHandlers();

  return (
    <div className={s.map}>
      <div className="container">
        <div className={s["map__inner"]}>
          <div ref={contactInfoRef} className={s["contact-info"]}>
            <div className={s["contact-info__body"]}>
              <h2>KLЁN — architectural bureau</h2>
              <div className={s["contact-info__list"]}>
                  <div
                    ref={(el) => {
                      if (el) listItemsRef.current[0] = el;
                    }}
                    className={s["contact-info__list-item"]}
                  >
                    <div className={s["contact-info__list-icon"]}>
                      <img src={"/img/icon/tg.svg"} alt={"KLЁN — architectural bureau telegram"} />
                    </div>
                    <div className={s["contact-info__list-text"]}>
                      <a href={info?.tg} target={"_blank"}>{info?.phone}</a>
                      <p>{info?.hours}</p>
                    </div>
                  </div>
                <div
                  ref={(el) => {
                    if (el) listItemsRef.current[1] = el;
                  }}
                  className={s["contact-info__list-item"]}
                >
                  <div className={s["contact-info__list-icon"]}>
                    <img src={"/img/icon/mail.svg"} alt={"KLЁN — architectural bureau email"} />
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href={`mailto:${info?.email}`} target={"_blank"}>{info?.email}</a>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) listItemsRef.current[2] = el;
                  }}
                  className={s["contact-info__list-item"]}
                >
                  <div className={s["contact-info__list-icon"]}>
                    <img src={"/img/icon/location.svg"} alt={"KLЁN — architectural bureau address"} />
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <p>{info?.address}</p>
                  </div>
                </div>
              </div>
              <div className={s["contact-info__actions"]}>
                <ButtonWithWrapper onClick={handleOpenModalBid} className="" dotReverce={false} isWrapper={false} name={"Отправить заявку"} />
                <ButtonWithWrapper onClick={handleOpenModalTender} className="" dotReverce={false} isWrapper={false} name={"Пригласить в тендер"} />
              </div>
            </div>
          </div>
          <div ref={mapContainer} className={s["map-container"]}></div>
        </div>
      </div>
    </div>
  );
}
