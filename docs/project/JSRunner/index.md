---
title: 超级JavaScript
navbar: false
sidebar: false
aside: false
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
      { content: '👨🏻‍💻 开源地址', target: 'https://github.com/ZiuChen/JSRunner' },
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

- ✅ 运行JavaScript代码 快速验证代码逻辑
- ✅ 支持切换NodeJS/浏览器操作环境
- ✅ `Ctrl/Command+R` 快速运行代码
- ✅ `Ctrl/Command+Q` 清除控制台
- ✅ `Ctrl/Command+N` 创建新的代码片段
- ✅ `Ctrl/Command+E` 切换锁定状态
- ✅ `Ctrl/Command+Shift+P` 调用命令面板
- ✅ `Ctrl/Command+Shift+L` 列出所有历史记录
- ✅ 支持回溯代码历史 支持保存/编辑代码运行历史
- ✅ 支持手动触发代码执行/实时运行代码
- ✅ 支持顶层await 适配深色模式

