import React from 'react';
import YandexMap from "@/app/components/YandexMap/YandexMap";
import {notFound} from "next/navigation";
import {createMetadate} from "@/app/utils/seo";

async function getContactData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/contacts/`, {
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
//   const res = await getContactData();
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
  return createMetadate(getContactData)
}

export default async function Contact() {
  const res = await getContactData();

  if (!res || !res.object.contacts_block) {
    notFound();
    return null;
  }

  const contact_block = res?.object?.contacts_block

  return (
    <>
      <YandexMap info={contact_block}/>

      {/* Блок для поисковых роботов */}
      <div itemScope itemType="http://schema.org/Organization" className="sr-only">
        <span itemProp="name">{contact_block?.title_h2}</span>
        <div itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
          <span itemProp="streetAddress">{contact_block?.address}</span>
          <span itemProp="addressLocality">Москва, Россия</span>
        </div>
        <span itemProp="telephone">{contact_block?.phone}</span>
        <span itemProp="email">{contact_block?.email}</span>
      </div>
    </>
  );
}