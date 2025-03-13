import React from 'react';
import YandexMap from "@/app/components/YandexMap/YandexMap";
import {notFound} from "next/navigation";

export async function getContactData(){
  try{
    const res = await fetch("https://test-6600.fg.onl/api/contacts/", {
      cache: "force-cache",
    });

    if(!res.ok){
      if(res.status === 404) {
        return null;
      }

      throw new Error(`Error ${res.status} - ${res.statusText}`);
    }

    return res.json();

  }catch(error){
    console.error(`Error getting contact data for ${error}`);
    return null;
  }
}

export async function generateMetadata() {
  const res = await getContactData();

  if(!res || !res.object?.seo){
    return {
      title: "Not found"
    }
  }

  return {
    title: res.object?.seo?.title,
    description: res.object?.seo?.description,
  }
}

export default async function Contact() {
  const res = await getContactData();

  if(!res || !res.object.contacts_block){
    notFound();
    return null;
  }

  return (
    <>
      <YandexMap info={res?.object?.contacts_block} />
    </>
  );
};
