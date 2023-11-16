import { App } from 'vue'
import Title from '../components/Title.vue'
import ImgSlider from '../components/ImgSlider.vue'

/**
 * 批量完成自定义组件的注册
 */
export function customComponents(app: App) {
  const cpns = [Title, ImgSlider]

  for (const c of cpns) {
    app.component(c.__name, c)
  }
}
