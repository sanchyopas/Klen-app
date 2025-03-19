import {MetadataRoute} from "next";
// import {getServiceData} from "@/app/services/page";
// import {getData} from "@/app/projects/page";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {

  // Тут надо сделать проверки на ошибки в try/catch завернуть что ли.

  const baseUrl = "https://test-6600.fg.onl";

  // const services = await getServiceData();
  // const projects = await getData();

  const urls = [
    {url: `${baseUrl}/`, lastModified: new Date().toISOString()},
    {url: `${baseUrl}/contacts`, lastModified: new Date().toISOString()},
    {url: `${baseUrl}/privacy`, lastModified: new Date().toISOString()},
    {url: `${baseUrl}/projects`, lastModified: new Date().toISOString()},
    {url: `${baseUrl}/services`, lastModified: new Date().toISOString()},
    // ...projects?.cases?.map((project: { alias: string, lastModified: string }) => ({
    //   url: `${baseUrl}/projects/${project.alias}`, lastModified: new Date().toISOString()
    // })),
    // ...services?.object?.cases?.map((project: { alias: string, lastModified: string }) => ({
    //   url: `${baseUrl}/projects/${project.alias}`, lastModified: new Date().toISOString()
    // }))
  ]

  return urls;
}