import { defineConfig } from 'vitepress'
import generateSideBar from './scripts/generateSideBar'

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
          { text: '超级Markdown', link: '/project/Markdown/' },
          { text: '超级JavaScript', link: '/project/JSRunner/' },
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
          { text: 'JavaScript进阶', link: '/note/JavaScriptEnhanced' },
          { text: '前端工程化', link: '/note/Front-end Engineering' },
          { text: '服务端渲染', link: '/note/SSR' }
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
          { text: '超级Markdown', link: '/project/Markdown/' },
          { text: '超级JavaScript', link: '/project/JSRunner/' },
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
        text: '文章归档',
        collapsible: true,
        items: [...generateSideBar()]
      },
      {
        text: '学习笔记',
        collapsible: true,
        items: [
          { text: 'JavaScript基础', link: '/note/JavaScript' },
          { text: 'CSS基础', link: '/note/CSS' },
          { text: 'JavaScript进阶', link: '/note/JavaScriptEnhanced' },
          { text: '前端工程化', link: '/note/Front-end Engineering' },
          { text: '服务端渲染', link: '/note/SSR' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZiuChen' },
      {
        icon: {
          svg: '<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" fill="#1E80FF"/></svg>'
        },
        link: 'https://juejin.cn/user/1887205216238477'
      }
    ],
    editLink: {
      pattern: 'https://github.com/ZiuChen/ZiuChen.github.io/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Ziu Chen'
    },
    lastUpdatedText: 'Updated Date',
    algolia: {
      apiKey: 'b4fd296ea5e467b3ac4a582160ff3122',
      indexName: 'ziuchenio',
      appId: 'LFZ2CPWWUG'
    }
  }
})
