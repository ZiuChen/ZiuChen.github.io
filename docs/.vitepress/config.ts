import { defineConfig } from 'vitepress'
import { indexArticleSidebar } from './scripts/indexArticleSidebar'
import { projects, works, notes, JUEJIN } from './const'

export default defineConfig({
  title: 'ZiuChen',
  description: 'Unlimited Progress.',
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  markdown: {
    math: true,
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '我的项目',
        items: projects
      },
      {
        text: '开源作品',
        items: works
      },
      {
        text: '学习笔记',
        items: notes
      },
      {
        text: '个人介绍',
        link: '/self/'
      }
    ],
    sidebar: [
      {
        text: '我的项目',
        items: projects
      },
      {
        text: '开源作品',
        collapsed: true,
        items: works
      },
      {
        text: '文章归档',
        collapsed: true,
        items: [...indexArticleSidebar()]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZiuChen' },
      {
        icon: { svg: JUEJIN },
        link: 'https://juejin.cn/user/1887205216238477'
      }
    ],
    editLink: {
      pattern: 'https://github.com/ZiuChen/ZiuChen.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-PRESENT ZiuChen'
    },
    lastUpdatedText: 'Updated Date',
    search: {
      provider: 'algolia',
      options: {
        appId: 'LFZ2CPWWUG',
        apiKey: 'b4fd296ea5e467b3ac4a582160ff3122',
        indexName: 'ziuchenio'
      }
    }
  }
})
