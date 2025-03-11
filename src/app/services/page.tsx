import {notFound} from "next/navigation";
import {ClientServices} from "@/app/pageComponents/ClientServices";

async function getServiceData() {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/services`, {
      cache: "no-store",
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
  const result = await getServiceData();

  if (!result || !result.object?.page) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result.object.page.SEO_TITLE,
    description: result.object.page.SEO_DESCR,
  };
}

export default async function ServicesPage () {
  const result = await getServiceData();
  if (!result || !result.object.cases) {
    notFound();
    return null;
  }
  return <ClientServices cases={result.object.cases}/>
};