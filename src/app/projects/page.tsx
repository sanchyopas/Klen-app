import Projects from "@/app/components/Projects/Projects";

export default function ProjectsPage () {

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
      <Projects projects={projects}/>
    </>
  );
};
