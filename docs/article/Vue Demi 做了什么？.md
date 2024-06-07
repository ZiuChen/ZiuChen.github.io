# Vue Demi 做了什么？

在 Vue Demi 的主页有三行介绍 vue-demi 的策略：

> `<=2.6`: exports from vue + @vue/composition-api with plugin auto installing.
> 
> `2.7`: exports from vue (Composition API is built-in in Vue 2.7).
> 
> `>=3.0`: exports from vue, with polyfill of Vue 2's set and del API.

## 安装钩子

在执行 `npm install vue-demi` 后，会触发 postinstall 钩子：

```js
// scripts/postinstall.js
const { switchVersion, loadModule } = require('./utils')

const Vue = loadModule('vue')

if (!Vue || typeof Vue.version !== 'string') {
  console.warn('[vue-demi] Vue is not found. Please run "npm install vue" to install.')
}
else if (Vue.version.startsWith('2.7.')) {
  switchVersion(2.7)
}
else if (Vue.version.startsWith('2.')) {
  switchVersion(2)
}
else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
}
else {
  console.warn(`[vue-demi] Vue version v${Vue.version} is not supported.`)
}
```

通过判断 Vue 的版本来为 `switchVersion` 传入不同的参数：

```js
// scripts/utils.js
const fs = require('fs')
const path = require('path')

const dir = path.resolve(__dirname, '..', 'lib')

function loadModule(name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}

function copy(name, version, vue) {
  vue = vue || 'vue'
  const src = path.join(dir, `v${version}`, name)
  const dest = path.join(dir, name)
  let content = fs.readFileSync(src, 'utf-8')
  content = content.replace(/'vue'/g, `'${vue}'`)
  // unlink for pnpm, #92
  try {
    fs.unlinkSync(dest)
  } catch (error) { }
  fs.writeFileSync(dest, content, 'utf-8')
}

function updateVue2API() {
  const ignoreList = ['version', 'default']
  const VCA = loadModule('@vue/composition-api')
  if (!VCA) {
    console.warn('[vue-demi] Composition API plugin is not found. Please run "npm install @vue/composition-api" to install.')
    return
  }

  const exports = Object.keys(VCA).filter(i => !ignoreList.includes(i))

  const esmPath = path.join(dir, 'index.mjs')
  let content = fs.readFileSync(esmPath, 'utf-8')

  content = content.replace(
    /\/\*\*VCA-EXPORTS\*\*\/[\s\S]+\/\*\*VCA-EXPORTS\*\*\//m,
`/**VCA-EXPORTS**/
export { ${exports.join(', ')} } from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/`
    )

  fs.writeFileSync(esmPath, content, 'utf-8')
  
}

function switchVersion(version, vue) {
  copy('index.cjs', version, vue)
  copy('index.mjs', version, vue)
  copy('index.d.ts', version, vue)

  if (version === 2)
    updateVue2API()
}
```

而 `switchVersion` 本质上是在根据版本，将 `lib` 目录下针对不同版本的 patch 文件拷贝到 `node_modules/vue-demi/` 目录下供外部导入使用。

## 不同版本的 patch 文件在做什么？

```js
import { ref } from 'vue-demi';
```

针对 `<=2.6` `=2.7` `>=3` 这三种情况，当我们直接从 `vue-demi` 导入 Vue 的 API 时，Vue Demi 做了不同的操作：

- `<=2.6` 从 `vue` 和 `@vue/composition-api` 导出
- `=2.7` 从 `vue` 导出
  - 因为 `@vue/composition-api` 已内置于 `vue` 中并统一导出了
- `>=3` 从 `vue` 导出
  - 除此之外，`vue-demi` 还对两个 Vue2 版本的 API 进行了 polyfill

下面以不同版本的 `index.mjs` 为例解读细节：

```js
// v3/index.mjs
import * as Vue from 'vue'

var isVue2 = false
var isVue3 = true
var Vue2 = undefined

function install() {}

// 兼容 Vue2 通过 Object.defineProperty 对数组 api 的处理
export function set(target, key, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  target[key] = val
  return val
}

export function del(target, key) {
  if (Array.isArray(target)) {
    target.splice(key, 1)
    return
  }
  delete target[key]
}

export * from 'vue'
export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
}
```

```js
// v2.7/index.mjs
import Vue from 'vue'
import { getCurrentInstance } from 'vue'

var isVue2 = true
var isVue3 = false
var Vue2 = Vue
var warn = Vue.util.warn

function install() {}

// createApp polyfill
export function createApp(rootComponent, rootProps) {
  var vm
  var provide = {}
  var app = {
    config: Vue.config,
    use: Vue.use.bind(Vue),
    mixin: Vue.mixin.bind(Vue),
    component: Vue.component.bind(Vue),
    provide: function (key, value) {
      provide[key] = value
      return this
    },
    directive: function (name, dir) {
      if (dir) {
        Vue.directive(name, dir)
        return app
      } else {
        return Vue.directive(name)
      }
    },
    mount: function (el, hydrating) {
      if (!vm) {
        vm = new Vue(Object.assign({ propsData: rootProps }, rootComponent, { provide: Object.assign(provide, rootComponent.provide) }))
        vm.$mount(el, hydrating)
        return vm
      } else {
        return vm
      }
    },
    unmount: function () {
      if (vm) {
        vm.$destroy()
        vm = undefined
      }
    },
  }
  return app
}

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
  warn
}

// Vue 3 components mock
function createMockComponent(name) {
  return {
    setup() {
      throw new Error('[vue-demi] ' + name + ' is not supported in Vue 2. It\'s provided to avoid compiler errors.')
    }
  }
}
export var Fragment = /*#__PURE__*/ createMockComponent('Fragment')
export var Transition = /*#__PURE__*/ createMockComponent('Transition')
export var TransitionGroup = /*#__PURE__*/ createMockComponent('TransitionGroup')
export var Teleport = /*#__PURE__*/ createMockComponent('Teleport')
export var Suspense = /*#__PURE__*/ createMockComponent('Suspense')
export var KeepAlive = /*#__PURE__*/ createMockComponent('KeepAlive')

export * from 'vue'

// Not implemented https://github.com/vuejs/core/pull/8111, falls back to getCurrentInstance()
export function hasInjectionContext() {
  return !!getCurrentInstance()
}
```

```js
// v2/index.mjs
import Vue from 'vue'
import VueCompositionAPI, { getCurrentInstance } from '@vue/composition-api/dist/vue-composition-api.mjs'

function install(_vue) {
  _vue = _vue || Vue
  if (_vue && !_vue['__composition_api_installed__'])
    _vue.use(VueCompositionAPI)
}

install(Vue)

var isVue2 = true
var isVue3 = false
var Vue2 = Vue
var version = Vue.version

// 统一 composition-api 导出出口
/**VCA-EXPORTS**/
export * from '@vue/composition-api/dist/vue-composition-api.mjs'
/**VCA-EXPORTS**/

export {
  Vue,
  Vue2,
  isVue2,
  isVue3,
  version,
  install,
}


// Vue 3 components mock
function createMockComponent(name) {
  return {
    setup() {
      throw new Error('[vue-demi] ' + name + ' is not supported in Vue 2. It\'s provided to avoid compiler errors.')
    }
  }
}
export var Fragment = /*#__PURE__*/ createMockComponent('Fragment')
export var Transition = /*#__PURE__*/ createMockComponent('Transition')
export var TransitionGroup = /*#__PURE__*/ createMockComponent('TransitionGroup')
export var Teleport = /*#__PURE__*/ createMockComponent('Teleport')
export var Suspense = /*#__PURE__*/ createMockComponent('Suspense')
export var KeepAlive = /*#__PURE__*/ createMockComponent('KeepAlive')

// Not implemented https://github.com/vuejs/core/pull/8111, falls back to getCurrentInstance()
export function hasInjectionContext() {
  return !!getCurrentInstance()
}
```
