import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, watch } from 'vue'
import { inBrowser, useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

import Title from '../components/Title.vue'
import ImgSlider from '../components/ImgSlider.vue'

import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // 使用默认主题的增强应用程序功能
    DefaultTheme.enhanceApp(ctx)

    // 注册组件
    const { app } = ctx
    app.component('Title', Title)
    app.component('ImgSlider', ImgSlider)
  },
  setup() {
    const route = useRoute()
    watch(
      () => route.path,
      () => {
        nextTick(() =>
          inBrowser ? mediumZoom('.main img', { background: 'var(--vp-c-bg)' }) : null
        )
      },
      { immediate: true }
    )
  }
}
