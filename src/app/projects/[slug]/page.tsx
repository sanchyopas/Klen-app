import Slider from "@/app/components/Slider/Slider";

export default function Project() {

  const slides = [
    {
      "image": "/img/image.jpg",
    },
    {
      "image": "/img/image-1.jpg",
    },
    {
      "image": "/img/image-2.jpg",
    },
    {"image": "/img/image-3.jpg",},
    {"image": "/img/image-4.jpg"},
    {
      "image": "/img/image-5.jpg"
    },
    {
      "image": "/img/image-6.jpg"
    }
  ]

  return (
    <>
    <Slider slides={slides} is_boolet={true} />
    </>

  );
}