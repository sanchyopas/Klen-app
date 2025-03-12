import Title from "@/app/components/Title/Title";
import {DynamicBlock} from "@/app/components/DynamicBlock/DynamicBlock";
import React from "react";
import {notFound} from "next/navigation";


type Params = {
  slug: string;
}

async function getService(slug: string) {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/services/${slug}`, {
      cache: "no-store",
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

  const result = await getService(slug);

  if (!result || !result.object.seo) {
    return {
      title: "Not found"
    }
  }

  return {
    title: result.object.seo.title   || `Заголовок проекта с айди ${slug}`,
    description: result.object.seo.description  || `Описание проекта с айди ${slug}`,
  }
}
export default async function Service({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }
  return (
    <>
      <section>
        <div className="container">
          <Title title={service.object.main_screen.title} as="h1" />
        </div>
      </section>

      {
        service?.object?.BlocksList?.map((block: any, index: number) => {
          return <DynamicBlock block={block} key={index}/>
        })
      }
    </>
  );
};

