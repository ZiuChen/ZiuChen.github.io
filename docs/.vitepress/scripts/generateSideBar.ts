import fs from 'fs'
import path from 'path'

export default function generateSideBar() {
  const articles = fs.readdirSync(path.resolve(__dirname, '../../article'))

  // 排除掉资源文件夹
  const folders = ['assets']

  const sidebar = articles
    .filter((article) => !folders.includes(article))
    .map((article) => {
      // 移除后缀 `.md`
      const title = article.replace(/\.md$/, '')
      return {
        text: title,
        link: `/article/${title}`
      }
    })

  return sidebar
}
