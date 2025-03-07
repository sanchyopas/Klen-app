import {DynamicBlock} from "@/app/components/DynamicBlock/DynamicBlock";
import Title from "@/app/components/Title/Title";

async function getProject(id: number) {
  const res = await fetch(`https://dev.modx.fresco.bz/api/cases/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Ошибка загрузки данных");
  }

  return res.json();
}

export default async function ProjectPage({ params }: { params: { id: number } }) {
  const project = await getProject(Number(params.id));

  return (
    <>
      <>
        <div className="container"><Title title={project.object.main_screen.title} as={"h1"}/></div>
      </>

      {
        project.object.BlocksList.map((block:any, index:number)=> {
          return <DynamicBlock block={block} key={index} />
        })
      }
    </>
  );
}
