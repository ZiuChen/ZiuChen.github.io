import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { refresh } from './refresh'
import { customComponents } from './customComponents'
import Layout from './Layout.vue'
import './index.css'

const theme: Theme = {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)

    const { app } = ctx
    app.use(refresh).use(customComponents)
  }
}

export default theme
