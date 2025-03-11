// 'use client';

import Link from "next/link";
import s from "./button.module.scss"
// import {useEffect, useState} from "react";
// import {useRouter} from "next/navigation";


type ButtonProps = {
  dotReverce: boolean;
  isWrapper: boolean;
  className?: string;
  name?: string;
  onClick?: any;
}
export default function ButtonWithWrapper({className, dotReverce, isWrapper, name, onClick}: ButtonProps) {
  return (
    <>
      {isWrapper ? (
        <div className={ className ? `${className} ${s.buttonWrapper}` : s.buttonWrapper}>
          <button onClick={onClick} className={`${s.button} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</button>
          {/*<div className={ isActive? `${s.transataonEffect} ${s.active}` : s.transataonEffect}></div>*/}
        </div>
      ) : (
        <>
          <button onClick={onClick} className={`${s.button} ${dotReverce ? s.dotReverce : s.dot}`} >{name}</button>
          {/*<div className={ isActive? `${s.transataonEffect} ${s.active}` : s.transataonEffect}></div>*/}
        </>
      )}
    </>)
}