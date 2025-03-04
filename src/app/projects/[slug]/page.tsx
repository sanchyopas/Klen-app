import Slider from "@/app/components/Slider/Slider";

interface Props {
  params: {
    slug: string;
    title: string;
  }
}

export default function Project({params}: Props) {
  return (
    <>
    <Slider/>
    </>

  );
}