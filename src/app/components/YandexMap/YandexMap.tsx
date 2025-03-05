"use client";
import s from "./map.module.scss";
import {useEffect, useRef} from "react";
import LinkWithWrapper from "@/app/components/Link/Link";

declare global {
  interface Window {
    ymaps?: any;
  }
}

export default function YandexMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);

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
            iconImageOffset: [-20, -20]
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

  return (
    <div className={s.map}>
      <div className="container">
        <div className={s["map__inner"]}>
          <div className={s["contact-info"]}>
            <div className={s["contact-info__body"]}>
              <h2>KLЁN — architectural bureau</h2>
              <div className={s["contact-info__list"]}>
                <div className={s["contact-info__list-item"]}>
                  <div className={s["contact-info__list-icon"]}>
                    <img src="/img/icon/tg.svg" alt="Klen telegramm"/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href="tel:+7 (926) 761-74-33">+7 (926) 761-74-33</a>
                    <p>пн–пт 09:00–18:00</p>
                  </div>
                </div>
                <div className={s["contact-info__list-item"]}>
                  <div className={s["contact-info__list-icon"]}>
                    <img src="/img/icon/mail.svg" alt="Klen email"/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href="mailto:info@abklen.com">info@abklen.com</a>
                  </div>
                </div>
                <div className={s["contact-info__list-item"]}>
                  <div className={s["contact-info__list-icon"]}>
                    <img src="/img/icon/location.svg" alt="Klen местоположение"/>
                  </div>
                  <div className={s["contact-info__list-text"]}>
                    <a href="#">123022, Москва, ул. Рочдельская, 15, стр.23</a>
                  </div>
                </div>
              </div>
              <div className={s["contact-info__actions"]}>
                <LinkWithWrapper dotReverce={false} isWrapper={false} name={"отправить заявку"} link={"#"}/>
                <LinkWithWrapper dotReverce={false} isWrapper={false} name={"пригласить в тендер"} link={"#"}/>
              </div>
            </div>
          </div>
          <div
            ref={mapContainer}
            className={s["map-container"]}
          ></div>
        </div>
      </div>
    </div>
  );
};