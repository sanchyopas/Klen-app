import { promises as fs } from 'fs'
import path from 'path'

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

    // 3. Ревалидация для Pages Router
    await res.revalidate('/')
    await res.revalidate('/projects')
    await res.revalidate('/projects/[slug]')
    await res.revalidate('/services')
    await res.revalidate('/services/[slug]')
    await res.revalidate('/contacts')
    await res.revalidate('/privacy')
    await res.revalidate('/buro')

    return res.json({
      success: true,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Cache purge error:', error)
    return res.status(500).json({ error: 'Cache purge failed' })
  }
}