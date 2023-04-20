---
title: 超级JavaScript
navbar: false
---

<script setup>
  import url from './assets/logo.png'
  import img1 from './assets/img1.png'
  import img2 from './assets/img2.png'
  import img3 from './assets/img3.png'
  import img4 from './assets/img4.png'
  const titleInfo = {
    subTitle: '✨ JavaScript运行器 支持多种运行环境 快速验证代码逻辑',
    logo: url,
    linkList: [
      { content: '🕶️ 在线体验', target: 'https://ziuchen.github.io/JSRunner' },
      { content: '🚚 更新日志', target: './log/' },
    ]
  }
  const imgSliders = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src: img4 },
  ]
</script>

<Title v-bind="titleInfo" />

<br />

<ImgSlider :imgSliderList="imgSliders" />

## 🔰 开始使用

- 运行JavaScript代码 快速验证代码逻辑
- 支持切换NodeJS/浏览器运行环境
- `Ctrl/Command+R` 快速运行代码
- 支持代码回溯 实时记录代码运行历史
- 支持手动触发代码运行/实时运行代码
- 适配深色模式
