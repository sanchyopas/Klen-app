import s from './privacy.module.scss';
import SmallTextSection from "@/app/components/SmallTextSection/SmallTextSection";
import Title from "@/app/components/Title/Title";
import {notFound} from "next/navigation";
import YandexMap from "@/app/components/YandexMap/YandexMap";
import React from "react";
import {createMetadate} from "@/app/utils/seo";

async function getPolicyData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/api/policy/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      throw new Error(`Error ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error getting contact data for ${error}`);
    return null;
  }
}

// export async function generateMetadata() {
//   const res = await getPolicyData();
//
//   if (!res || !res.object?.seo) {
//     return {
//       title: "Not found"
//     };
//   }
//
//   return {
//     title: res.object?.seo?.title,
//     description: res.object?.seo?.description,
//   };
// }

export async function generateMetadata() {
  return createMetadate(getPolicyData)
}

export default async function Privacy() {
  const res = await getPolicyData();

  if (!res || !res.object.policy_text) {
    notFound();
    return null;
  }

  return (
    <>
      <div className={s.policy}>
        <SmallTextSection title={'<h1>Политика конфиденциальности</h1>'} text={res.object.policy_text}/>
      </div>
    </>
  );
}
