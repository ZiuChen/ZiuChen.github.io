import DefaultTheme from 'vitepress/theme'
import Title from '../components/Title.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    const { app } = ctx
    app.component('Title', Title)
  }
}
