import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick, watchEffect } from 'vue'
import { useRouter } from 'vitepress'
import mediumZoom from 'medium-zoom'
import Title from '../components/Title.vue'
import './index.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx
    app.component('Title', Title)
  },
  setup() {
    const router = useRouter()
    watchEffect(() => {
      // 将router.route.path作为依赖收集 首次访问即添加监听
      const path = router.route.path
      nextTick(() => mediumZoom('.main img', { background: 'var(--vp-c-bg)' }))
    })
  }
}
