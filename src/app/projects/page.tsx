import ProjectsPageClient from "@/app/projects/ProjectsPageClient";
import { notFound } from "next/navigation";
import {createMetadate} from "@/app/utils/seo";

async function getData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/cases`, {
      next: { revalidate: 60 }, // Регенерировать страницу каждые 60 секунд
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function generateMetadata() {
  return createMetadate(getData)
}

export default async function ProjectsPage() {
  const result = await getData();

  if (!result || !result.object.cases) {
    notFound();
    return null;
  }

  const projects = result.object.cases;

  const filtersData = {
    types: result.object?.filter_projects || [],
    years: result.object?.filter_period || [],
  };

  return <ProjectsPageClient projects={projects} filtersData={filtersData} />;
}