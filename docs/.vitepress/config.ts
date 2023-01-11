import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'ZiuChen',
  description: 'Unlimited Progress.',
  ignoreDeadLinks: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '我的项目',
        items: [
          { text: '超级剪贴板', link: '/project/ClipboardManager/' },
          { text: '超级分词', link: '/project/SmartWordBreak/' }
        ]
      },
      {
        text: '开源作品',
        items: [
          { text: '个人作品', link: '/works/opensource' },
          { text: '社区贡献', link: '/works/contribution' }
        ]
      },
      {
        text: '学习笔记',
        items: [
          { text: 'JavaScript基础', link: '/note/JavaScript' },
          { text: 'CSS基础', link: '/note/CSS' },
          { text: 'JavaScript进阶', link: '/note/JavaScriptEnhanced' }
        ]
      },
      {
        text: '个人介绍',
        link: '/self/'
      }
    ],
    sidebar: [
      {
        text: '我的项目',
        collapsible: true,
        items: [
          { text: '超级剪贴板', link: '/project/ClipboardManager/' },
          { text: '超级分词', link: '/project/SmartWordBreak/' }
        ]
      },
      {
        text: '开源作品',
        collapsible: true,
        items: [
          { text: '个人作品', link: '/works/opensource' },
          { text: '社区贡献', link: '/works/contribution' }
        ]
      },
      {
        text: '学习笔记',
        collapsible: true,
        items: [
          { text: 'JavaScript基础', link: '/note/JavaScript' },
          { text: 'CSS基础', link: '/note/CSS' },
          { text: 'JavaScript进阶', link: '/note/JavaScriptEnhanced' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://ziuchen.github.io/' }],
    editLink: {
      pattern: 'https://github.com/ZiuChen/ZiuChen.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Ziu Chen'
    },
    lastUpdatedText: 'Updated Date'
  }
})
