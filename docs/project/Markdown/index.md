---
title: 超级Markdown
navbar: false
sidebar: false
aside: false
---

<script setup>
  import url from './assets/logo.webp'
  import img1 from './assets/img1.webp'
  import img2 from './assets/img2.webp'
  import img3 from './assets/img3.webp'
  const titleInfo = {
    subTitle: '✨ 强大的Markdown编辑器',
    logo: url,
    linkList: [
      { content: '🕶️ 在线体验', target: 'https://ziuchen.github.io/SuperMarkdown' },
      { content: '👨🏻‍💻 开源地址', target: 'https://github.com/ZiuChen/SuperMarkdown' },
      { content: '🚀 快捷键一览', target: './shortcut/' },
      { content: '🚚 更新日志', target: './log/' },
    ]
  }
  const imgSliders = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
  ]
</script>

<Title v-bind="titleInfo" />

<br />

<ImgSlider :imgSliderList="imgSliders" />

## 🔰 开始使用

- 由ByteMD强力驱动，功能丰富、性能强劲
- 支持GFM扩展语法、脚注、Gemoji、KaTeX数学公式、Mermaid图表
- 支持通过Frontmatter设置多种主题、代码高亮样式
- 支持多级目录，目录支持无限嵌套
- 支持通过粘贴/拖拽的方式批量上传图片、支持截取屏幕截图
- 支持Markdown文件的批量导入、批量导出
- 支持插件多开，同时编辑/参考多个文章
- 支持实时同步预览、自动保存

