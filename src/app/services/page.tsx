import Title from "../components/Title/Title";
import s from "./services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import Slider from "@/app/components/Slider/Slider";
import MiniSlider from "@/app/components/MiniSlider/MiniSlider";
import Link from "next/link";
import {notFound} from "next/navigation";

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
  return (
    <>
      {
        result?.object?.cases.map((item:any,i:number)=> (
          <section id={s.services} key={i}>
            <div className={s.two_columns_content}>

              <div className="container">
                <div className={`${s.row} row`}>
                  <div className="col-12 col-md-6">
                    <div className={s.text}>
                      <h3>{item.main_screen.title}</h3>
                      <p>{item.main_screen.preview_text}</p>
                      <div className={s.linkList}>
                        {
                          item.subservice.map((item: any, i:number)=>(
                            <LinkWithWrapper
                              key={i}
                              className={s.linkWrapper}
                              link={`/services/${item.id}`}
                              dotReverce={false}
                              isWrapper={false}
                              name={item.pagetitle}
                            />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={s.img}>
                      <img src={`https://test-6600.fg.onl${item.main_screen.image}`} alt={item.main_screen.title}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      }
    </>
  );
};