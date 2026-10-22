import { promises as fs } from 'fs'
import path from 'path'
import axios from 'axios'

export default async function handler(req, res) {
  // 1. Проверка метода
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // 2. Очистка файлового кэша
    const cacheDirs = [
      path.join(process.cwd(), '.next/cache'),
      path.join(process.cwd(), 'node_modules/.cache'),
    ]

    await Promise.all(
      cacheDirs.map(dir =>
        fs.rm(dir, { recursive: true, force: true })
          .catch(e => console.error(`Error cleaning ${dir}:`, e))
      )
    )

    // 3. Получение ссылок из sitemap.xml и ревалидация
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const sitemapUrl = `${API_URL}/sitemap.xml`

    let urlsToRevalidate = []

    try {
      // Получаем содержимое sitemap.xml
      const response = await axios.get(sitemapUrl)
      const sitemapContent = response.data

      // Парсим URL из sitemap (простая реализация)
      const urlRegex = /<loc>(.*?)<\/loc>/g
      let match
      while ((match = urlRegex.exec(sitemapContent)) !== null) {
        const url = match[1]
        // Извлекаем путь (удаляем домен)
        const path = new URL(url).pathname
        urlsToRevalidate.push(path)
      }

      console.log('Found URLs to revalidate:', urlsToRevalidate)
    } catch (sitemapError) {
      console.error('Error fetching or parsing sitemap:', sitemapError)
      // Если не удалось получить sitemap, используем дефолтные URL
      urlsToRevalidate = [
        '/',
        '/projects',
        '/projects/[slug]',
        '/services',
        '/services/[slug]',
        '/contacts',
        '/privacy',
        '/buro'
      ]
    }

    // Ревалидируем все найденные URL
    await Promise.all(
      urlsToRevalidate.map(path =>
        res.revalidate(path).catch(e =>
          console.error(`Error revalidating ${path}:`, e)
        )
      )
    )

    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      revalidatedUrls: urlsToRevalidate
    })

  } catch (error) {
    console.error('Cache purge error:', error)
    return res.status(500).json({ error: 'Cache purge failed' })
  }
}