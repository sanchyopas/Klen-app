import Projects from "@/app/components/Projects/Projects";

export default function ProjectsPage () {

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

    {
      "link": "pr7",
      "image": "image-3.jpg",
      "title": "реновация облика фасадов"
    },
    {
      "link": "pr8",
      "image": "image-4.jpg",
      "title": "жилой интерьер"
    },
    {
      "link": "pr9",
      "image": "image-5.jpg",
      "title": "концепция фасадных решений ЖК 'Порто-Ново'"
    },
    {
      "link": "pr10",
      "image": "image-6.jpg",
      "title": "концепция благоустройства ЖК Снегири"
    },
    {
      "link": "pr11",
      "image": "image-4.jpg",
      "title": "жилой интерьер"
    },
    {
      "link": "pr12",
      "image": "image-5.jpg",
      "title": "концепция фасадных решений ЖК 'Порто-Ново'"
    },
    {
      "link": "pr13",
      "image": "image-6.jpg",
      "title": "концепция благоустройства ЖК Снегири"
    },
  ]

  return (
    <>
      <Projects projects={projects}/>
    </>
  );
};
