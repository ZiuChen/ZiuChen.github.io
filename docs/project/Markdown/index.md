---
title: 超级Markdown
navbar: false
---

<script setup>
  import url from './assets/logo.png'
  import img1 from './assets/1.png'
  const titleInfo = {
    subTitle: '✨ 强大的Markdown编辑器',
    logo: url,
    linkList: [
      { content: '🚀 快捷键一览', target: './shortcut/' },
    ]
  }
  const imgSliders = [
    { src: img1 },
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
- 支持实时同步预览、自动保存

