import Title from "@/app/components/Title/Title";
import {DynamicBlock} from "@/app/components/DynamicBlock/DynamicBlock";
import React from "react";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import {createMetadate} from "@/app/utils/seo";


type Params = {
  slug: string | string[];
}

async function getService(slug: string | string[]) {

  const slugUrl = typeof slug !== "string" ? slug.join('/') : slug;

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/services/${slugUrl}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Ошибка загрузки данных: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Ошибка получения данных проекта:", error);
    return null;
  }
}

export async function generateMetadata(props: { params: Promise<Params> }) {
  const params = await props.params
  const {slug} = params;

  return createMetadate(getService, slug)
}

// export async function generateMetadata(props: { params: Promise<Params> }) {
//   const params = await props.params
//   const {slug} = params;
//
//   const result = await getService(slug);
//
//   if (!result || !result.object.seo) {
//     return {
//       title: "Not found"
//     }
//   }
//
//   return {
//     title: result.object.seo.title   || `Заголовок проекта с айди ${slug}`,
//     description: result.object.seo.description  || `Описание проекта с айди ${slug}`,
//   }
// }

export default async function Service({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }


  const pathNames = [
    { link: '/services', name: 'услуги' },
  ];

  return (
    <>
      <div>
        <div className="container">
          <Breadcrumbs pathNames={pathNames}/>
          <Title title={service?.object?.main_screen?.title} as="h1" />
        </div>
      </div>

      {
        service?.object?.BlocksList?.map((block: any, index: number) => {
          return <DynamicBlock block={block} key={index}/>
        })
      }
    </>
  );
};

