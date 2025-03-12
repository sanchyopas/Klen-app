"use client";
import { useLoading } from "@/app/components/Preloader/PreloaderWrapper";
import s from "./project.module.scss";

export default function Loading() {

  return (
    <section>
      <div className="container">
        <div className={s.breadcrumbSkeleton}>
          <div className={s.skeleton} style={{ width: "100px", height: "16px" }}></div>
          <div className={s.skeleton} style={{ width: "80px", height: "16px" }}></div>
          <div className={s.skeleton} style={{ width: "150px", height: "16px" }}></div>
        </div>

        <div className={s.skeleton} style={{ width: "60%", height: "48px", marginBottom: "20px" }}></div>

        <div className={s.descriptionSkeleton}>
          <div className={s.skeleton} style={{ width: "40%", height: "20px" }}></div>
          <div className={s.skeleton} style={{ width: "30%", height: "20px" }}></div>
          <div className={s.skeleton} style={{ width: "50%", height: "20px" }}></div>
          <div className={s.skeleton} style={{ width: "45%", height: "20px" }}></div>
        </div>

        <div className={s.imageSkeleton}></div>
      </div>
    </section>
  );
}
