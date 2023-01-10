declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

interface LinkItem {
  content: string
  target: string
}

type LinkList = LinkItem[]
