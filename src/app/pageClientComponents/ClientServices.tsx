"use client"
import s from "@/app/services/services.module.scss";
import LinkWithWrapper from "@/app/components/Link/Link";
import {useGsapFadeIn} from "@/app/hooks/AnimationHooks/useGsapFadeIn";
import Image from "next/image";

type Props = {
  cases: any[]
}

export const ClientServices = ({cases}:Props) => {
  const elRef = useGsapFadeIn<HTMLDivElement>()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      {
        cases?.map((item:any,i:number) => (
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
                          item.subservice.map((itemLink: any, i: number) => (
                            item.alias == itemLink.alias ?
                              <LinkWithWrapper
                                key={i}
                                className={s.linkWrapper}
                                link={`/services/${itemLink.alias}`}
                                dotReverce={false}
                                isWrapper={false}
                                name={itemLink.pagetitle}
                              />
                            :
                              <LinkWithWrapper
                                key={i}
                                className={s.linkWrapper}
                                link={`/services/${item.alias}/${itemLink.alias}`}
                                dotReverce={false}
                                isWrapper={false}
                                name={itemLink.pagetitle}
                              />
                          ))
                        }
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className={s.img}>
                      {!!item.main_screen.image &&
                        <Image
                          src={`${API_URL}${item.main_screen.image}`}
                          alt={item.main_screen.title}
                          width={670}
                          height={420}
                        />
                      }
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