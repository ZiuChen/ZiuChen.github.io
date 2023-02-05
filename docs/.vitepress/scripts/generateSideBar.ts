import fs from 'fs'
import path from 'path'

export default function generateSideBar() {
  const articles = fs.readdirSync(path.resolve(__dirname, '../../article'))

  const sidebar = articles.map((article) => {
    // 移除后缀 `.md`
    const title = article.replace(/\.md$/, '')
    return {
      text: title,
      link: `/article/${title}`
    }
  })

  return sidebar
}
