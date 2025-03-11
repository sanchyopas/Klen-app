"use client"
import s from "./services.module.scss";
import {useEffect, useState} from "react";

export default function Loading() {
  return (
    <>
      <section className={s.servicesLoading}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className={`col-12 col-md-6 ${s.info}`}>
              <div className={s.skeletonText} />
              <div className={s.skeletonText} />
              <div className={s.skeletonButton} />
            </div>
            <div className="col-12 col-md-6">
              <div className={s.skeletonImage} />
            </div>
          </div>
        </div>
      </section>
      <section className={s.servicesLoading}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className={`col-12 col-md-6 ${s.info}`}>
              <div className={s.skeletonText} />
              <div className={s.skeletonText} />
              <div className={s.skeletonButton} />
            </div>
            <div className="col-12 col-md-6">
              <div className={s.skeletonImage} />
            </div>
          </div>
        </div>
      </section>
      <section className={s.servicesLoading}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className={`col-12 col-md-6 ${s.info}`}>
              <div className={s.skeletonText} />
              <div className={s.skeletonText} />
              <div className={s.skeletonButton} />
            </div>
            <div className="col-12 col-md-6">
              <div className={s.skeletonImage} />
            </div>
          </div>
        </div>
      </section>
      <section className={s.servicesLoading}>
        <div className="container">
          <div className={`${s.row} row`}>
            <div className={`col-12 col-md-6 ${s.info}`}>
              <div className={s.skeletonText} />
              <div className={s.skeletonText} />
              <div className={s.skeletonButton} />
            </div>
            <div className="col-12 col-md-6">
              <div className={s.skeletonImage} />
            </div>
          </div>
        </div>
      </section>
    </>

  );
}
