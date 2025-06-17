import s from './cookies.module.scss';
import SmallTextSection from "@/app/components/SmallTextSection/SmallTextSection";
import {notFound} from "next/navigation";
import React from "react";
import {createMetadate} from "@/app/utils/seo";

async function getCookiesData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${API_URL}/api/cookies`, {
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

export async function generateMetadata() {
  return createMetadate(getCookiesData)
}

export default async function Personal() {
  const res = await getCookiesData();

  if (!res || !res.object.cookie_text) {
    notFound();
    return null;
  }

  return (
    <>
      <div className={s.policy}>
        <SmallTextSection title={'<h1>' + res.object.cookie_title + '</h1>'} text={res.object.cookie_text}/>
      </div>
    </>
  );
}
