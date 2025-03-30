import { notFound } from "next/navigation";
import { ClientServices } from "@/app/pageClientComponents/ClientServices";
import {createMetadate} from "@/app/utils/seo";

async function getServiceData() {
  try {
    const res = await fetch(`https://test-9900.fg.onl/api/services`, {
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
  return <ClientServices cases={result.object.cases} />;
}