"use client"
import s from "@/app/services/services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";
import Image from "next/image";

type Props = {
  projects: any[]
}

export const ClientProjects = ({projects}:Props) => {
  const elRef = useGsapFadeIn<HTMLDivElement>()
  console.log(projects);
  return (
    <>
      {
        projects?.map((item:any,i:number) => (
          <section ref={elRef} id={s.services} key={i}>
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
                      <Image
                        src={`https://test-6600.fg.onl${item.main_screen.image}`}
                        alt={item.main_screen.title}
                        width={670}
                        height={420}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      }
    </>
  )
}