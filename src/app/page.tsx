import Projects from "@/app/components/Projects/Projects";
import IndexScreen from "@/app/components/IndexScreen/IndexScreen";
import Buro from "@/app/components/Buro/Buro";
import Services from "@/app/components/Services/Services";
import Slider from "@/app/components/Slider/Slider";
import React from "react";
import { notFound } from "next/navigation";
import ServiceMobile from "@/app/components/ServicesMobile/ServicesMobile";
import ProjectsMobile from "@/app/components/ProjectsMobile/ProjectsMobile";
import {createMetadate} from "@/app/utils/seo";
import { ClientServices } from "@/app/pageClientComponents/ClientServices";

async function getData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/main`, {
      next: { revalidate: 60 }, // Регенерировать страницу каждые 60 секунд
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// Категории услуг с подуслугами — для аккордеона, как в разделе «Услуги»
async function getServices() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/services`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const cases = data?.object?.cases;

    if (!Array.isArray(cases)) return null;

    return {
      // Массив не отсортирован по дереву MODx — сортируем по order
      cases: [...cases].sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)),
      defaultImage: data?.object?.default_image ?? null,
    };
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function generateMetadata() {
  return createMetadate(getData)
}

export default async function Home() {
  const [result, services] = await Promise.all([getData(), getServices()]);

  if (!result || !result.object) {
    notFound();
    return null;
  }

  const projects = result.object.projects || {};
  const projectsList = projects.list || [];
  const hasProjects = projectsList.length > 0;

  return (
    <>
      <IndexScreen mainData={result.object.main_screen} />
      {hasProjects && (
        <>
          <Projects
            title={projects.title_h2 || "Проекты"}
            link={projects.button_link || "#"}
            btn_name={projects.button_name || "Подробнее"}
            projects={projectsList}
            is_pc={true}
          />
          <ProjectsMobile
            slides={projectsList}
            title={projects.title_h2 || "Проекты"}
            is_boolet={false}
            name_btn={projects.button_name || "Подробнее"}
            link_btn={projects.button_link || "#"}
            is_mobile={true}
          />
        </>
      )}
      {services?.cases.length ? (
        <ClientServices
          cases={services.cases}
          defaultImage={services.defaultImage}
          title={result.object.services?.title_h2 || "услуги"}
          button_name={result.object.services?.button_name}
          button_link={result.object.services?.button_link}
        />
      ) : (
        // Если список услуг не загрузился — старый блок
        <>
          <Services
            slides={result.object.services.list}
            title={result.object.services.title_h2}
            button_link={result.object.services.button_link}
            button_name={result.object.services.button_name}
            is_pc={true}
          />
          <ServiceMobile
            is_mobile={true}
            is_boolet={false}
            slides={result.object.services.list}
            title={result.object.services.title_h2}
            link_btn={result.object.services.button_link}
            name_btn={result.object.services.button_name}
          />
        </>
      )}
    </>
  );
}