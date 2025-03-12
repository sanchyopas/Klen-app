"use client";
import LinkWithWrapper from "@/app/components/Link/Link";
import s from "./breadcrumbs.module.scss";
import Link from "next/link";

interface BreadcrumbItem {
  link: string;
  name: string;
}

interface BreadcrumbsProps {
  pathNames: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathNames }) => {
  return (
    <ul className={s.breadcrumbs}>
      {pathNames.map((pathName, index) => {
        const isLast = index === pathNames.length - 1;
        const isMoreItems = pathNames.length > 1;

        return (
          <li key={pathName.link} className={`${s.breadcrumbItem} ${isLast ? s.active : ""}`}>
            { isMoreItems ?
              !isLast ? (
                <LinkWithWrapper
                  isWrapper={false}
                  className={s.breadcrumbLink}
                  link={pathName.link}
                  name={pathName.name}
                  dotReverce={false}
                />
              ) : (
                <Link href={pathName.link}>
                  <span className={s.current}>{pathName.name}</span>
                </Link>
              )
            :
              <LinkWithWrapper
                isWrapper={false}
                className={s.breadcrumbLink}
                link={pathName.link}
                name={pathName.name}
                dotReverce={false}
              />
            }
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
