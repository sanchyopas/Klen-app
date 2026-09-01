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
      {pathNames.map((pathName) => (
        <li key={pathName.link} className={s.breadcrumbItem}>
          <LinkWithWrapper
            isWrapper={false}
            className={s.breadcrumbLink}
            link={pathName.link}
            name={pathName.name}
            dotReverce={false}
          />
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumbs;
