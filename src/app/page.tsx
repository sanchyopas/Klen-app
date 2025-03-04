import Projects from "@/app/components/Projects/Projects";
import IndexScreen from "@/app/components/IndexScreen/IndexScreen";
import Buro from "@/app/components/Buro/Buro";
import Services from "@/app/components/Services/Services";

export default function Home() {

  const projects = [
    {
      "link": "pr1",
      "image": "image-1.jpg",
      "title": "brodsky"
    },
    {
      "link": "pr2",
      "image": "image-2.jpg",
      "title": "интерьер МОП"
    },
    {
      "link": "pr3",
      "image": "image-3.jpg",
      "title": "реновация облика фасадов"
    },
    {
      "link": "pr4",
      "image": "image-4.jpg",
      "title": "жилой интерьер"
    },
    {
      "link": "pr5",
      "image": "image-5.jpg",
      "title": "концепция фасадных решений ЖК 'Порто-Ново'"
    },
    {
      "link": "pr6",
      "image": "image-6.jpg",
      "title": "концепция благоустройства ЖК Снегири"
    },
  ]

  return (
    <>
      <IndexScreen/>
      <Projects title={"Проекты"} link={"/projects"} projects={projects} />
      <Buro />
      <Services />
    </>
  );
}
