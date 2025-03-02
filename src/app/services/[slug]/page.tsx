export async function generateStaticParams() {
  const films = await fetch('https://swapi.dev/api/films').then((res) => res.json())

  return films.result.map((film:any) => ({
    slug: film.slug,
  }))
}

export default function Project({params}:any) {
  return (
    <div>
      <h1>Project slug = {params.slug}</h1>
    </div>
  );
};

