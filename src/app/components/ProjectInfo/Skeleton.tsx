"use client";
import React from "react";
import s from "./skeleton.module.scss";

const Skeleton = () => {
  return (
    <div className={s.skeletonContainer}>
      <div className={s.skeleton}></div>
      <div className={s.skeleton}></div>
      <div className={s.skeleton}></div>
    </div>
  );
};

export default Skeleton;