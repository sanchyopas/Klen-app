import Projects from "@/app/components/Projects/Projects";
import IndexScreen from "@/app/components/IndexScreen/IndexScreen";
import Buro from "@/app/components/Buro/Buro";
import Services from "@/app/components/Services/Services";
import Slider from "@/app/components/Slider/Slider";
import React from "react";
import { notFound } from "next/navigation";
import ServiceMobile from "@/app/components/ServicesMobile/ServicesMobile";
import ProjectsMobile from "@/app/components/ProjectsMobile/ProjectsMobile";

async function getData() {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/main`, {
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

export async function generateMetadata() {
  const result = await getData();

  if (!result || !result.object?.seo) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result.object.seo.title,
    description: result.object.seo.description,
  };
}

export default async function Home() {
  const result = await getData();

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
  );
}