export async function createMetadate(data: () => Promise<any>) {
  const result = await data();

  if (!result || !result.object?.seo) {
    return {
      title: "Not found",
    };
  }

  const seo = result.object?.seo;

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
      url: "https://abklen.com/",
      siteName: "Klen",
      images: [
        {
          url: `https://test-6600.fg.onl/upload_resources/${seo?.og_image}`,
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