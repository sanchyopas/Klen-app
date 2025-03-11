"use client";
import s from "./projects.module.scss";

export default function Loading() {
  return (
    <section>
      <div className={"container"}>
        <div className={`${s.list}`}>
          <div className={`${s.skeleton}`}>
            <div className={s.imageSkeleton}></div>
            <div className={s.textSkeleton}></div>
          </div>
          <div className={`${s.skeleton}`}>
            <div className={s.imageSkeleton}></div>
            <div className={s.textSkeleton}></div>
          </div>
          <div className={`${s.skeleton}`}>
            <div className={s.imageSkeleton}></div>
            <div className={s.textSkeleton}></div>
          </div>
          <div className={`${s.skeleton}`}>
            <div className={s.imageSkeleton}></div>
            <div className={s.textSkeleton}></div>
          </div>
        </div>
      </div>
    </section>
  );
}