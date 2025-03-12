"use client"
import s from "./services.module.scss";

export default function Loading1() {
  return (
    <>
      <section className={s.servicesLoading}>
        <div className="container">
          <p>Загрузка....</p>
        </div>
      </section>
    </>

  );
}
