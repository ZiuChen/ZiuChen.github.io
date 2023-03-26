---
title: 超级Markdown
navbar: false
---

<script setup>
  import url from './assets/logo.png'
  const titleInfo = {
    subTitle: '✨ 强大的Markdown编辑器',
    logo: url,
    linkList: [
      { content: '🚀 快捷键一览', target: './shortcut/' },
    ]
  }
</script>

<Title v-bind="titleInfo" />

## 🔰 开始使用

- 由ByteMD强力驱动，功能丰富、性能强劲
- 支持GFM扩展语法、脚注、Gemoji、KaTeX数学公式、Mermaid图表
- 支持通过Frontmatter设置多种主题、代码高亮样式
- 支持实时同步预览、自动保存、导出HTML、导出PDF、导出Word、导出Markdown
- 支持图片上传、图片粘贴、图片拖拽

