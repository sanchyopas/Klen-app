import Link from "next/link";
import s from "./services.module.scss"
import LinkWithWrapper from "@/app/components/Link/Link";
import Title from "@/app/components/Title/page";

export default function Services() {

  const services = [
    {
      "name": "Разработка продукта",
      "image": "/img/image.jpg",
      "is_active": true
    },
    {
      "name": "Мастерпланы",
      "image": "/img/image.jpg",
      "is_active": false
    },
    {
      "name": "объемно-планировочные решения",
      "image": "/img/image.jpg",
      "is_active": false
    },
    {"name": "Фасадные решения", "image": "/img/image.jpg", "is_active": false},
    {"name": "благоустройство", "image": "/img/image.jpg", "is_active": false},
    {
      "name": "Интерьерные решения",
      "image": "/img/image.jpg",
      "is_active": false
    },
    {
      "name": "Финансовые показатели проекта",
      "image": "/img/image.jpg",
      "is_active": false
    }
  ]

  return (
    <section id={s.services}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">

            <Title title="Услуги"/>

            <div className={s.servicesList}>
              {services.map(service => (
                <div className={`${s.item} ${service.is_active === true ? "active" : ""}`} key={service.name}>
                  <img
                    src={service.image}
                    alt={service.name}
                  />
                  <h3 className={s.name}>{service.name}</h3>
                </div>
              ))}
            </div>
            <LinkWithWrapper dotReverce={false} isWrapper={true} name={"Все услуги"} link={"/services"} />
          </div>

          <div className="col-12 col-md-6">
            <div className={s.servicesImageList}>
              {services.map(service => (
                <div className={`${s.item} ${service.is_active === true ? "active" : ""}`} key={service.name}>
                  <img
                    src={service.image}
                    alt={service.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
