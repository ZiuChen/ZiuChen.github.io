# 深入Vue3源码，看看Vue.use后究竟发生了什么？

## 从全局注册组件库入手

如果我们自定义了几个自定义组件，当我们想在`.vue`文件中使用它们时，需要手动`import`导入组件并在`component`中注册：

```html
<script>
import CustomInput from '@/component/CustomInput.vue'

export default {
  component: {
    CustomInput
  }
}
</script>
```

通过`Vue.use`将`ElementPlus`全局注册后，所有的组件都可以在`.vue`的`<template>`标签中直接使用，不需要再导入、注册。

```js
import ElementPlus from 'element-plus'
Vue.use(ElementPlus)
```

这个过程里`Vue.use`究竟为我们做了哪些事？

假设我此时有两个自定义组件`ZiuInput`与`ZiuButton`位于`@/module/ZiuUI/component`目录下，我希望能通过`Vue.use`达到像`ElementPlus`那样免导入注册就能直接使用的效果。

于是我在`ZiuUI`目录下创建了`index.js`，并在其中编写以下代码：

```js
// @/module/ZiuUI/index.js

import ZiuInput from './component/ziu-input.vue'
import ZiuButton from './component/ziu-button.vue'

const components = [ ZiuInput, ZiuButton ]

const ZiuUI = {
  install(Vue) {
    // 注册组件
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}

export default ZiuUI
```

当我们将`ZiuUI`这个对象传给`Vue.use()`时，`Vue`会自动调用其中的`install`方法，并将`Vue`实例传入其中，那么我们就可以在`install`方法中实现组件的全局注册。

```js
// @/main.js

import Vue from 'vue'
import App from './App'
import ZiuUI from './module/ZiuUI'

Vue.use(ZiuUI) // 将ZiuUI传入Vue.use()
...
```

## 深入源码

下载Vue3的源码阅读，我们可以发现`use`相关的代码：

```ts
  use(plugin: Plugin, ...options: any[]) {
    // 组件已经被安装了 若是开发环境 则抛出警告
    if (installedPlugins.has(plugin)) {
      __DEV__ && warn(`Plugin has already been applied to target app.`)
    }
    // 组件未安装 且install方法为函数 那么执行安装 并调用install方法
    // installedPlugins是一个Set 用于记录已经安装的组件
    else if (plugin && isFunction(plugin.install)) {
      installedPlugins.add(plugin)
      plugin.install(app, ...options)
    }
    // 传入Vue.use本身就是一个函数 那么执行这个函数
    else if (isFunction(plugin)) {
      installedPlugins.add(plugin)
      plugin(app, ...options)
    }
    // 如果当前为开发环境 且Vue.use未传参 则抛出警告
    else if (__DEV__) {
      warn(
        `A plugin must either be a function or an object with an "install" ` +
          `function.`
      )
    }
    // 执行结束 返回App本身便于链式调用
    return app
  }
```

## 手动引入&注册组件

有时候，我们不希望全局注册一个组件库，导致整个项目体积变得巨大，而是希望能只引入某些用到的组件，但是又不想用到一个组件就需要手动的导入、注册。

除了使用组件库提供的自动导入插件，我们还可以手动实现一个“半自动导入组件”的功能。

编写一个`register-element.ts`文件，将所有我们项目中需要用到的组件都在此文件中引入并注册。

```ts
// register-element.ts

declare function require(moduleName: string): void
import type { App } from 'vue'

import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-loading.css'
import {
  ElButton,
  ElTabs,
  ElTabPane
} from 'element-plus'

const components = [
  ElButton,
  ElTabs,
  ElTabPane
]

export default function registerElement(app: App): void {
  components.forEach((c) => {
    const name = transferCamel(c.name)
    // 引入组件样式 将驼峰改为-分隔命名
    require(`element-plus/theme-chalk/${name}.css`)
    // 注册组件
    app.component(name, c)
  })
}

function transferCamel(camel: string): string {
  return camel
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1)
}
```

阅读完源码我们发现，如果为`Vue.use()`传入的是一个函数，那么Vue会将app实例传入并调用这个函数。因此，我们只需要在`main.ts`中在`App`实例上链式调用`.use`方法，并将`registerElement`函数传入，那么Vue会自动将`app`实例传入并调用这个方法：

```ts
// main.ts

import { createApp } from 'vue'
import App from './App.vue'
import registerElement from './global/register-element.ts'

const app = createApp(App).use(registerElement)
app.mount('#app')
```

当有新的需要使用的组件时，只需要到`register-element.ts`文件中引入一次即可。

## 参考阅读

[Vue文档: App.use](https://vuejs.org/api/application.html#app-use)

[Vue文档: Plugins](https://vuejs.org/guide/reusability/plugins.html)
