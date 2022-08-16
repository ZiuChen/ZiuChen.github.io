module.exports = {
  title: 'ZiuChen',
  description: 'Unlimited Progress.',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  plugins: [
    '@vuepress/medium-zoom',
    '@vuepress/active-header-links',
    '@vuepress/plugin-back-to-top',
    '@vuepress/last-updated',
    {
      transformer: (timestamp) => {
        const d = new Date(timestamp)
        return d.toLocaleDateString() + d.toLocaleTimeString()
      }
    }
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: '开源作品',
        link: '/works/'
      },
      {
        text: '个人介绍',
        link: '/self/',
        items: [
          {
            text: '关于我',
            link: '/self/'
          },
          {
            text: '更多信息',
            items: [
              {
                text: '技术栈',
                link: '/self/#技术栈'
              },
              {
                text: '获得奖项',
                link: '/self/#获得奖项'
              },
              {
                text: '相关链接',
                link: '/self/#相关链接'
              }
            ]
          }
        ]
      }
    ],
    displayAllHeaders: true,
    logo: '/logo.png',
    repo: 'ZiuChen/ZiuChen.github.io',
    editLinks: true,
    docsBranch: 'main',
    docsDir: 'docs',
    lastUpdated: 'Last Updated'
  }
}
