---
title: 超级剪贴板
navbar: false
sidebar: false
aside: false
---

<script setup>
  import url from './assets/logo.webp'
  import img1 from './assets/img_1.webp'
  import img2 from './assets/img_2.webp'
  import img3 from './assets/img_3.webp'
  import img4 from './assets/img_4.webp'
  import img5 from './assets/img_5.webp'
  const titleInfo = {
    subTitle: '✨ 更强大的剪贴板管理工具。',
    logo: url,
    linkList: [
      { content: '⭐ 开源代码', target: 'https://github.com/ZiuChen/ClipboardManager' },
      { content: '🚀 使用指南', target: './guide/' },
      { content: '🌎 疑难解答', target: './statement/' },
      { content: '🚚 更新日志', target: './log/' },
    ]
  }
  const imgSliders = [
    { src: img1 },
    { src: img2 },
    { src: img3 },
    { src: img4 },
    { src: img5 },
  ]
</script>

<Title v-bind="titleInfo" />

<br />

<ImgSlider :imgSliderList="imgSliders" />

## 🔰 开始使用

**首次安装需要设置“跟随主程序同时启动”**

- ✅ 监听剪贴板并持续将新内容更新到本地磁盘 数据加密保存在本地
- ✅ 支持置顶、收藏、编辑、转存、多选、WebDAV同步、局域网共享等强大功能
- ✅ 强大的工具栏，支持自定义快捷动作，定制自己的工作流
- ✅ 优雅的界面动效与交互 高度自定义的配置选项 深色模式模式适配

## 📚 安装方式

- 官方插件市场安装
- 离线插件安装：[百度网盘](https://pan.baidu.com/s/14GJIXWDU2F4jsqDDq73aFg?pwd=Ziuc)

[Github](https://github.com/ZiuChen)
