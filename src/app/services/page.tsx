import { notFound } from "next/navigation";
import { ClientServices } from "@/app/pageClientComponents/ClientServices";
import {createMetadate} from "@/app/utils/seo";

async function getServiceData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/services`, {
      next: { revalidate: 60 },
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
  return createMetadate(getServiceData)
}

export default async function ServicesPage() {
  const result = await getServiceData();
  if (!result || !result.object.cases) {
    notFound();
    return null;
  }

  // API отдаёт order (позицию в дереве MODx), но сам массив им не отсортирован
  const cases = [...result.object.cases].sort(
    (a: any, b: any) => (a.order ?? 0) - (b.order ?? 0)
  );

  return <ClientServices cases={cases} />;
}