# 前端工程化

## Node.js

- 什么是Node.JS Node的应用场景
- JS代码执行
- Node的输入和输出
- Node的全局对象

### 什么是Node.js

Node.js是一个基于**V8 JavaScript引擎**的**JavaScript运行时环境**

- V8可以嵌入到任何C++应用程序中，无论是Chrome还是Node.js，事实上都嵌入了V8引擎来执行JavaScript代码
- 在Chrome浏览器中，还需要解析、渲染HTML、CSS等相关渲染引擎，另外还需要支持浏览器操作的API、浏览器自己的事件循环
- 在Node.js中我们也需要进行一些额外操作：文件系统读写、网络IO、加密、压缩解压文件等

可以简单总结出Node.js和浏览器的区别

- Chrome浏览器

  - Blink负责解析HTML文档，遇到JavaScript标签时将内容交给V8引擎

  - > Blink 是 Google Chrome 浏览器的渲染引擎，V8 是 Blink 内置的 JavaScript 引擎

    - 预分析：检查语法错误但不生成AST树
    - 生成AST：语法分析、词法分析后，生成抽象语法树（AST）
      - AST 为每一行代码定义键值对。初始类型标识符定义 AST 属于一个程序，然后所有代码行将定义在主体内部，主体是一个对象数组。
    - 生成字节码：基线编译器（Ignition）将 AST 转换为字节码
    - 生成机器代码：优化编译器 (Turbofan) 将字节码转换为优化的机器代码。另外，在逐行执行字节码的过程中，**如果一段代码经常被执行，V8会直接将这段代码转换并保存为机器码**，下次执行不需要经过字节码，优化了执行速度

- Node.js

  - 只处理JavaScript代码 内部V8引擎负责JS代码的执行
  - JavaScript代码 -> V8 -> Node.js Bindings -> LibUV
  - LibUV是使用**C语言编写的库**，提供了**事件循环、文件系统读写、网络IO、线程池**等等内容

![The Node.js System](Front-end Engineering.assets/The Node.js System.jpeg)

### Node.js的应用场景

- 前端开发的库都是以node包形式管理的
- npm yarn pnpm成为前端开发使用最多的工具
- 使用Node.js作为Web服务器开发、中间件、代理服务器
- 借助Node.js完成前后端渲染的同构应用
- 编写脚本工具 构建项目 打包代码等
- Electron桌面应用程序

### Node.js的参数传递

#### `process.argv`

`process.argv`返回一个数组

- 在代码中通过`process.argv[2]`读取来自命令行的额外参数
- `process.argv[0]` `process.argv[1]`分别为`node.exe`的绝对路径和`目标文件`的绝对路径

```js
// sum.js
const x = process.argv[2]
const y = process.argv[3]
console.log(x + y)
```

```sh
# 通过命令行运行node执行脚本 并传入参数
node sum.js 5 10 # 15
```

#### console

- `console.log` 打印内容到stdout并加上换行符
- `console.clear` 清空当前stdout中的内容
- `console.trace` 打印字符串`Trace: `到stderr
  - 将堆栈跟踪打印到代码中的当前位置

#### REPL

在浏览器的控制台选项卡中，我们可以通过输入JS代码与之交互，在Node.js中同样提供了类似的功能

- REPL是Read-Eval-Print Loop的简称，翻译为：读取-求值-输出循环
- REPL是一个**简单的、交互式的编程环境**
- 在命令行窗口中输入`node`即可进入

### Node中的全局对象

在浏览器中，我们可以在JS代码中访问全局对象`window`，代表当前标签窗口

在Node.js中的全局对象名为`global`，在控制台输出`global`对象：

```sh
> global
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 2245.9675999991596,
      nodeStart: 1.7120999991893768,
      v8Start: 7.749699998646975,
      bootstrapComplete: 56.47019999846816,
      environment: 28.44789999909699,
      loopStart: 97.62589999847114,
      loopExit: -1,
      idleTime: 2070.0206
    },
    timeOrigin: 1675854922619.539
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
```

#### 常见的全局对象

- `Buffer`
- `clearImmediate`
- `clearInterval`
- `clearTimeout`
- `console`
  - 和控制台交互
- `process`
  - 提供了Node进程中相关的信息
  - Node的运行环境、系统环境变量、参数等
- `queueMicrotask(callback)`
- `setImmediate(callback, [, ...args])`
- `setInterval(callback, delay[, ...args])`
- `setTimeout(callback, delay[, ...args])`
- `TextDecoder`
- `TextEncoder`
- `URL`
- `URLSearchParams`
- `WebAssembly`

#### 特殊的全局对象

`__dirname` `__filename` `exports` `module` `require()`

- 这些变量看起来是全局的，其实并不是（它们仅存在于模块范围内），只是每个模块中都有
- 它们在命令行交互中是不可使用的
- `__dirname` 当前模块的目录名
- `__filename` 当前模块的文件名
- `exports` `module` `require()`将在模块章节中讲解

#### `global`对象

`global`是一个全局对象

- 在Node.js环境下，之前的 `process` `console` `setTimeout`等都有被放入到`global`中
- 而在浏览器中，这些全局API是被放到`window`对象上的

这无异于增加了开发者的心智负担，所以在最新的ECMA标准中出现了`globalThis`，指向全局对象

- 在浏览器中的`globalThis`指向`window`对象
- 在Node.js中的`globalThis`指向`global`对象

两个全局对象的区别：在浏览器中通过`var`定义的变量会被放到`window`对象上，而Node.js不会

## 模块化开发

- 认识模块化开发
- CommonJS和Node
- require函数解析
- AMD和CMD（已经被时代淘汰 了解即可）
- ESModule用法详解
- ESModule运行原理

### 模块化的初衷

- 将大的程序拆分成一个个小的易于维护的代码
- 每个模块负责程序中的一部分逻辑，拥有**自己的作用域**、**定义变量名时不会发生冲突**
- 模块可以暴露**变量、函数、对象**等导出
- 模块可以导入其他模块的**变量、函数、对象**

```js
// moduleA.js
const moduleA = (function(){
  const name = "Ziu"
  const age = 18
  const run = () => {
    console.log(name + age + 'is running.')
  }
  return {
    name,
    age,
    run
  }
})()

// moduleB.js
console.log(moduleA.name) // 在其他模块中调用
```

### CommonJS

CommonJS是一种**规范**，当初命名为ServerJS，旨在浏览器以外的地方使用，后为体现其广泛性，改名为CommonJS，简称CJS

**规范 是用来指导 实现的**

- `Node` 是CommonJS在服务端的代表**实现**
- `Browserify` 是CommonJS在浏览器中的一种**实现** （正在被淘汰）
- `WebPack` 打包工具具备支持CommonJS的支持和转换

所以，Node.js对CommonJS进行了支持和实现，让JavaScript在Node上运行时可以实现模块化开发

- 每个`.js`文件都是一个单独的模块
- 每个模块中都包含变量`exports` `module.exports` `require`

::: code-group

```js [env.js]
// env.js
exports.name = 'Ziu'
exports.age = 18
```

```js [utils.js]
// utils.js
module.exports = {
  sum: function(x, y) {
    return x + y
  }
}
```

```js [index.js]
// index.js
const utils = require('utils.js')
utils.sum(1, 2) // 3

const { sum } = require('utils.js')
sum(1, 2) // 3

const { name, age } = require('env.js')
console.log(name, age) // Ziu 18
```

:::

#### `exports`的本质

`exports`和`require`在Node中的本质

- `exports`是一个对象，我们可以在这个对象中添加很多属性，添加的属性则会被导出
  - 在没有向该对象添加任何属性之前，它是一个空对象
- 当通过`require`导入时：`const env = require('env.js')`
  - `env`这个变量等于`env.js`中的`exports`对象
  - 本质上是`env`是`exports`对象的引用赋值

::: code-group

```js [utils.js]
// utils.js
exports.a = 0

// 1s后修改a值
setTimeout(() => {
  exports.a = 1
}, 1000)

// 2s后检查a值
setTimeout(() => {
  console.log(exports.a) // 2
}, 2000)
```

```js [index.js]
// index.js
const utils = require('./utils')

console.log(utils.a) // 0

setTimeout(() => {
  console.log(utils.a) // 1
  utils.a = 2 // 反过来修改a值
}, 1500)
```

:::

在上述代码中，`utils`对象中的属性`a`在一秒后被赋值为`1`，因此在index.js中输出`utils.a`得到了两次不同的结果

反过来，在index.js中修改导入的`utils.a`的值后，修改结果也会反映在`exports.a`上，输出的值为`2`

实际开发中不要修改导入模块中的变量，改变原模块中变量的值并不规范

#### `module.exports`

在Node.js中，真正常用的导出方式是`module.exports`

- `module.exports`本质上就是`exports`对象（同一个内存地址）
- 可以直接给`exports`对象赋值，将需要导出的内容统一导出
- 给`module.exports`重新赋值，即改变了`exports`对象的指向，**后续的修改不再影响原模块中的变量**

```js
const name = 'Ziu'
const run = () => console.log(name + 'is running.')

module.exports = {
  name,
  run
}
```

#### 二者的区别

既然如此，为什么还要存在`exports`这个概念呢？

- 在CommonJS中是没有`module.exports`的概念的
- 为了实现模块的导出，Node.js使用的是`Module`类，每一个模块都是`Module`的实例，也就是`module`
- 所以在Node.js中真正用于导出的并不是`exports`，而是`module.exports`
- `module`对象中的`exports`属性是`exports`对象的一个引用
  - `module.exports === exports === utils`

如果`module.exports`不再引用`exports`对象了，修改`exports`对象也就没有意义了

::: code-group

```js [utils.js]
// utils.js
module.exports = {
  name: 'Ziu'
}
exports.age = 18
```

```js [index.js]
// index.js
const utils = require('utils.js')
console.log(utils.name) // Ziu
console.log(utils.age) // undefined
```

:::

当使用`module.exports = { ... }`后，模块中原有的`exports`不再被导入识别，导入的内容将变为`module.exports`指定的对象内容

#### `require`的本质

`require`是一个函数，可以帮助我们导入一个文件（模块）中导出的对象

- 为什么可以省略掉`.js`后缀，直接使用`require('./utils')`
- 为什么可以省略掉`index.js`，直接使用`require('./tools')`导入`tools/index.js`

这涉及到`require`在匹配路径后的查找规则：

分为三种情况：**内置模块、自定义路径、包名**

- 导入Node.js内置的模块，如`const path = require('path')`
  - 直接返回该内置模块 并停止后续的查找
- 根据路径导入自定义的模块，如`const utils = require('./{filename}')`
  - 按照路径寻找该模块`./` `../` `/`
  - 如果指定了后缀名，则按照后缀名查找
  - 如果未指定后缀名，则：
    1. 直接查找该文件
    2. 查找`{filename}.js`文件
    3. 查找`{filename}.json`文件
    4. 查找`{filename}.node`文件
  - 如果按照上述方式没找到文件，则**将`{filename}`作为路径继续查找**
  - 查找目录下的`index`文件 `{filename}/index`
    1. 查找`{filename}/index.js`文件
    2. ··· ···
  - 没找到：报错`Cannot find module 'xxx'`
- 包名，如`const lodash = require('lodash')`
  - 到项目根目录的`node_modules`中查找
  - `node_modules/{package_name}/index.js`
  - 当前项目目录的`node_modules`找不到则继续向上查找，直到查找到根目录的`node_modules`


#### 模块的加载过程

- 模块在被第一次引入时，模块中的JS代码会被运行一次
  - 代码执行顺序与`require`的位置相关
- 模块如果被多次引入，会被缓存，最终只加载一次
  - 这是因为每个模块对象`module`上都有一个属性`loaded`
  - `loaded === false`表示该模块尚未被加载
  - 第二次被`require`引入时会检查该属性是否为`true`
- 如果有循环引用，加载顺序如何？
  - 数据结构：图结构（graph）遍历时有深度优先搜索（DFS）、广度优先搜索（BFS）两种算法
  - Node采用的是深度优先算法

#### CommonJS的缺点

- 加载模块是同步加载的
  - 只有等到对应的模块加载完毕，当前模块中的内容才能被执行
  - 当然，在服务器中加载JS文件都是本地文件，加载速度非常快，不会受影响
- 但是在浏览器中使用CommonJS
  - 需要先从服务器下载JS文件，后加载运行
  - 阻塞JS执行 阻塞页面加载
- 在WebPack中使用CommonJS
  - CommonJS会被WebPack解析
  - 将CommonJS代码转化为bundle 浏览器可以直接运行

