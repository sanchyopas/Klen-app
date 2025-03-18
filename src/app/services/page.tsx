import { notFound } from "next/navigation";
import { ClientServices } from "@/app/pageClientComponents/ClientServices";

// Указываем, что страница должна быть динамической
export const dynamic = 'force-dynamic';

async function getServiceData() {
  try {
    const res = await fetch(`https://test-6600.fg.onl/api/services`, {
      next: { revalidate: 60 }, // Используем no-store для динамических данных
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

  if (!result || !result.object?.page?.seo) {
    return {
      title: "Not found",
    };
  }

  return {
    title: result.object.page.seo.title,
    description: result.object.page.seo.description,
  };
}

export default async function ServicesPage() {
  const result = await getServiceData();
  if (!result || !result.object.cases) {
    notFound();
    return null;
  }
  return <ClientServices cases={result.object.cases} />;
}