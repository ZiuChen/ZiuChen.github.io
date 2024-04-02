import fs from 'fs'
import path from 'path'

/**
 * 生成文章侧边栏
 */
export function indexArticleSidebar() {
  const articles = fs.readdirSync(path.resolve(__dirname, '../../article'))

  return articles
    .filter((article) => article.endsWith('.md'))
    .map((article) => ({
      text: article.replace(/\.md$/, ''),
      link: `/article/${article}`
    }))
}
