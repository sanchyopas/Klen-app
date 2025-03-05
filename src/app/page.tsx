import Projects from "@/app/components/Projects/Projects";
import IndexScreen from "@/app/components/IndexScreen/IndexScreen";
import Buro from "@/app/components/Buro/Buro";
import Services from "@/app/components/Services/Services";
import Slider from "@/app/components/Slider/Slider";
import React from "react";



export default function Home() {

  const projects = [
    {
      "link": "pr1",
      "image": "/img/image-1.jpg",
      "title": "brodsky"
    },
    {
      "link": "pr2",
      "image": "/img/image-2.jpg",
      "title": "интерьер МОП"
    },
    {
      "link": "pr3",
      "image": "/img/image-3.jpg",
      "title": "реновация облика фасадов"
    },
    {
      "link": "pr4",
      "image": "/img/image-4.jpg",
      "title": "жилой интерьер"
    },
    {
      "link": "pr5",
      "image": "/img/image-5.jpg",
      "title": "концепция фасадных решений ЖК 'Порто-Ново'"
    },
    {
      "link": "pr6",
      "image": "/img/image-6.jpg",
      "title": "концепция благоустройства ЖК Снегири"
    },
  ]


  return (
    <>
      <IndexScreen/>
      <Projects title={"Проекты"} link={"/projects"} projects={projects} is_pc={true} />
      <Slider slides={projects} title={<h2>Проекты</h2>} is_boolet={false} name_btn={"все проекты"} link_btn={"/projects"} is_mobile={true}/>
      <Buro />
      <Services />
    </>
  );
}
