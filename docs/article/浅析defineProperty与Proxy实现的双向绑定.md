# 浅析defineProperty与Proxy实现的双向绑定

> 文章内容总结自Vue官网 [深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96)

## 🔰 Vue2的响应式原理

![image.png](https://v2.cn.vuejs.org/images/data.png)

> 当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的 property，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些 property 全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#%E5%AE%9A%E4%B9%89_getters_%E4%B8%8E_setters)。
> 
> 每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

Vue2的响应式原理，利用的是 `Object.defineProperty()` 的 `setter` 属性：

`defineProperty()` 方法用于**精确**定义一个对象的属性，能够指定属性的各种特征，其中的 `set` 属性能够为对象指定一个 `setter` 函数，每次该属性的值发生修改，就会调用此函数。

> 更多可以配置的属性请参看：[什么是对象的数据属性描述符？存储属性描述符？](https://juejin.cn/post/7088335075061792782)

这也是Vue2实现响应式数据、数据双向绑定的原理。

可以使用此方法实现一个简单的数据双向绑定的Demo：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f241135dbeb04e829fe6897c2e418aa2~tplv-k3u1fbpfcp-watermark.image?)

* 输入框内的内容改变，`.vBox` 展示的文本会随之改变。
* 点击按钮修改 `vm.text`，输入框内的值和 `.vBox` 的文本都会发生改变。

```html
  <body>
    <input type="text" id="input" />
    <button onclick="vm.text='Hello, World.'">Modify vm.text</button>
    <div class="vBox"></div>
    <script>
      // 定义响应式数据
      let vm = {}
      Object.defineProperty(vm, "text", {
        set: (value) => {
          // 对象属性值被修改时，setter函数被自动触发
          document.querySelector("#input").value = value
          document.querySelector(".vBox").innerHTML = value
        },
      })
      // 监听输入行为
      document.querySelector("#input").addEventListener("input", (e) => {
        vm.text = e.target.value
      })
    </script>
  </body>
```

通过 `defineProperty` 实现的响应式，**不能检测**数组和对象的变化：

**对于对象：**

Vue 无法检测 property 的添加或移除。

var vm = new Vue({ data:{ a:1 } }) // `vm.a` 是响应式的 vm.b = 2 // `vm.b` 是非响应式的

**对于数组：**

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

## 🔰 Vue3的响应式原理
