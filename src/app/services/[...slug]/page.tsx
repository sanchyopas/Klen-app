import Title from "@/app/components/Title/Title";
import {DynamicBlock} from "@/app/components/DynamicBlock/DynamicBlock";
import React from "react";
import {notFound} from "next/navigation";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import {createMetadate} from "@/app/utils/seo";


type Params = {
  slug: string | string[];
}

// У части услуг в MODx включён флаг «ресурс — папка», из-за чего их uri
// хранится со слэшем на конце. Бэкендовый /api/services/[...slug] сравнивает
// путь с uri буквально и на таких ресурсах всегда отдаёт 404, хотя ресурс
// существует и опубликован (проверено: /api/services/{id} для них работает).
// Резолвим id по дереву /api/services и переспрашиваем по нему — обходим
// баг бэкенда, не трогая сам бэкенд.
async function resolveServiceIdByPath(apiUrl: string, segments: string[]) {
  const res = await fetch(`${apiUrl}/api/services`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  const topLevel = data?.object?.cases;

  if (!Array.isArray(topLevel) || segments.length === 0) {
    return null;
  }

  const [firstSlug, ...restSlugs] = segments;
  const category = topLevel.find((item: any) => item.alias === firstSlug);

  if (!category) {
    return null;
  }

  if (restSlugs.length === 0) {
    return category.id ?? null;
  }

  const lastSlug = restSlugs[restSlugs.length - 1];
  const child = (category.subservice ?? []).find((item: any) => item.alias === lastSlug);

  return child?.id ?? null;
}

async function getService(slug: string | string[]) {

  const segments = typeof slug !== "string" ? slug : [slug];
  const slugUrl = segments.join('/');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${API_URL}/api/services/${slugUrl}`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      return res.json();
    }

    if (res.status !== 404) {
      throw new Error(`Ошибка загрузки данных: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error("Ошибка получения данных проекта:", error);
    return null;
  }

  try {
    const id = await resolveServiceIdByPath(API_URL as string, segments);

    if (!id) {
      return null;
    }

    const byIdRes = await fetch(`${API_URL}/api/services/${id}`, {
      next: { revalidate: 60 },
    });

    if (!byIdRes.ok) {
      return null;
    }

    return byIdRes.json();
  } catch (error) {
    console.error("Ошибка получения данных проекта (fallback по id):", error);
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

