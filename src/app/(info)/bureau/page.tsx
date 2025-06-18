import {createMetadate} from "@/app/utils/seo";
import {notFound} from "next/navigation";
import BuroClient from "@/app/(info)/bureau/BuroClient";

async function getBuroData() {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/bureau/`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      throw new Error(`Error ${res.status} - ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error getting contact data for ${error}`);
    return null;
  }
}

export async function generateMetadata() {
  return createMetadate(getBuroData)
}

export default async function Buro() {

  const res = await getBuroData();

  // console.log(res);

  if (!res || !res.object) {
    notFound();
    return null;
  }

  const main_screen = res?.object?.main_screen
  const about_bureau = res?.object?.about_bureau
  const team_block = res?.object?.team_block

  console.log(team_block)

  return <BuroClient main_screen={main_screen} about_bureau={about_bureau} team_block={team_block}/>
};