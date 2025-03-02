import Projects from "@/app/components/Projects/page";
import IndexScreen from "@/app/components/IndexScreen/page";
import Buro from "@/app/components/Buro/page";
import Services from "@/app/components/Services/page";

export default function Home() {
  return (
    <>
      <IndexScreen/>
      <Projects />
      <Buro />
      <Services />
    </>
  );
}
