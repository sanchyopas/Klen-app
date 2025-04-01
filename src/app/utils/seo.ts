export async function createMetadate(data: any, dataParam?: string): Promise<any> {
  const result = !!dataParam ? await data(dataParam) : await data();

  if (!result || !result.object?.seo) {
    return {
      title: "Not found",
    };
  }

  const seo = result.object?.seo;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return {
    title: seo?.title,
    description: seo?.description,
    // Добавляет вот такой мета тег <meta name="format-detection" content="telephone=no">
    other: {
      "format-detection": "telephone=no",
    },
    robots: {
      index: seo?.index_type === null, // Разрешить индексацию страницы
      follow: true, // Разрешить следование по ссылкам на странице
    },
    openGraph: {
      title: seo?.og_title,
      description: seo?.og_description,
      url: "https://abklen.ru/",
      siteName: "Klen",
      images: [
        {
          url: `${API_URL}${seo?.og_image}`,
          width: 1200,
          height: 630,
          alt: seo?.og_image_alt,
        },
      ],
      type: seo?.og_type,
      locale: "ru_RU",
    },
  };
}