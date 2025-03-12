"use client";
import LinkWithWrapper from "@/app/components/Link/Link";
import s from "./breadcrumbs.module.scss";

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

        return (
          <li key={pathName.link} className={`${s.breadcrumbItem} ${isLast ? s.active : ""}`}>
            {!isLast ? (
              <LinkWithWrapper
                isWrapper={false}
                className={s.breadcrumbLink}
                link={pathName.link}
                name={pathName.name}
                dotReverce={false}
              />
            ) : (
              <span className={s.current}>{pathName.name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
