interface Props {
  params: {
    slug: string;
    title: string;
  }
}

export default function Project({params}: Props) {
  return (
    <h1>Проект {params.slug}</h1>
  );
}