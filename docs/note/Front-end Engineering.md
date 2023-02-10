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
  - `{ id: '...', exports: { ... }, loaded: true, ... }`
- 后续即使再次执行`require`导入模块，模块中的代码也不会重新执行（`module.loaded`属性）
  - 当从模块中取值时，会从已经加载的`exports`对象缓存上取值


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

### ESModule

- ES6 模块采用**编译时加载**，使得**编译时就能确定模块的依赖关系**，有助于**静态优化**
- CommonJS模块在运行时加载，且必须借助对象加载模块内容

#### `export`和`import`用法概览

ESModule借助`export`和`import`导入导出内容，需要注意的是导入导出的并不是对象

`export`定义的是当前模块导出的**接口**，`import`可以导入来自其他不同模块的**接口**

- `export default`可以设置默认导出对象
- `export { ... }`可以统一导出多个内容
- `export`和`import`都可以使用`as`关键字重命名导出/导入的接口
- `import * from 'xxx'` `export * from 'xxx'`批量导入/导出

::: code-group

```js [utils.js]
// utils.js
export function sum(a, b) {
  return a + b
}
export function sub(a, b) {
  return a - b
}
export default function log(...args) {
  console.log(...args)
}
export {
  name: 'Ziu',
  age: 18
}
export const ENV_VARIABLE = 'Hello, World!'
```

```js [index.js]
// index.js
import { sum, sub, name, age, ENV_VARIABLE } from './utils'
import log from './utils.js'

sum(1, 2) // 3
sub(2, 3) // -1
log(name, age, ENV_VARIABLE) // 'Ziu' 18 'Hello, World!'
```

:::

需要注意的是，在浏览器中要使用ESModule，需要为`<script>`标签添加`module`标记：

`<script src="index.js" type="module"></script>`

- 当浏览器解析到`type="module"`的JS代码后，会**分析模块中导入的ESModule模块**
- 每导入一个ESModule模块，**浏览器都会发起一个HTTP请求去加载它**
- 在本地运行时加载不同协议头的文件会遇到跨域问题，需要开启本地Web服务器

另外，**`export`与`import`必须位于模块的顶层**，如果位于作用域内会报错，因为这就**无法对代码进行静态分析优化了**

#### `export`详解

`export`有两种导出方式：

- 命名导出 `export const name = 'Ziu'` `export { v1, v2 } export * from 'xxx'`
  - 导出时需要指定名字
  - 导入时也需要知道对应的名字
- 默认导出 `export default AGE = 18`
  - 在从其他位置导入时需要为此默认导出指定新的名字
  - 给用户方便：不必阅读文档就可以加载模块

#### 值的动态绑定

- ESModule模块通过`export`语句输出的接口，与其对应的值是**动态绑定关系**，即通**过该接口，可以取到模块内部实时的值**
- CommonJS模块输出的是值的缓存，不存在动态更新

我们援引之前介绍CJS时的案例，**将后缀名改为`mjs`即可在Node中运行ESModule模块代码**

初始获得的`a`值为0，经过1s后，在`utils.mjs`中修改了a的值，这时导入`utils.mjs`模块的其他模块可以获取到`a`最新的值

::: code-group

```js [utils.mjs]
// utils.mjs
export let a = 0

// 1s后修改a值
setTimeout(() => {
  a = 1
}, 1000)
```

```js [index.mjs]
// index.mjs
import { a } from './utils.mjs'

console.log(a) // 0

setTimeout(() => {
  console.log(a) // 1
}, 1500)
```

:::

- 需要注意的是，导入的其他模块的变量是不允许被修改的，因为`index.mjs`导入的本质是一个接口
- 如果从其他模块导入的是一个对象，也不推荐修改导入内容的任何值，最好将其当做完全只读

拓展阅读：CommonJS与ESModule加载模块的异同

#### `import`详解

检查下述代码：

```js
foo()

import { foo } from 'foo'
```

- `import`命令具有提升效果，会提升到整个模块的顶部
- `import`的执行早于函数的调用，`import`命令是在编译阶段执行的，在代码运行之前
- 由于`import`是静态执行，所以不能使用表达式和变量（只有运行时才有值）

```js
import 'lodash'
import 'lodash'
```

- 如果仅仅导入了一个模块，那么该模块的代码会被执行，但是没有任何变量被导入
- 如果同一模块被导入多次，那么导入操作只会被执行一次

```js
import * from 'utils'
add(1, 2)

export * from 'utils'
```

- 可以通过`*`一次性导入模块中所有导出的变量、函数、类
- 也可以实现二者的复合操作：导入全部模块的同时导出全部模块

#### `import()`函数

通过`import`命令导入的模块是静态的，会被提升到模块顶部，并不支持条件导入

ES2020引入了`import()`函数，可以通过`import()`函数实现条件导入，动态加载ESModule模块

```js
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
    .catch(err => {
    main.textContent = err.message;
  })
```

- 返回值是一个Promise对象，可以通过`await`同步地操作它
- `import()`函数可以在模块外的JS脚本中使用，用于**在运行时加载外部模块**，类似于`require()`
- 区别于`require()`，`import()`是异步加载模块

通过`.then`函数处理导入的模块时，行为和`import`是相同的：

- 如果有默认导出对象，则`.then`入参为默认导出对象
- 可以通过解构直接取到模块中导出的变量或函数：`.then(({ add, sub }) => { ... })`

**应用场景**

按需加载：按钮点击后才加载相关的JS文件

```js
btn.addEventListener('click', () => {
  import('./dialogBox.js')
    .then(dialogBox => {
      dialogBox.open()
    })
    .catch(err => console.log(err))
})
```

条件加载：根据主题色加载不同JS文件

```js
if(darkMode) {
  import('dark.js').then(() => ...)
} else {
  import('light.js').then(() => ...)
}
```

传入动态值

```js
let moduleName = () => ['Home', 'History', 'User'][0]
import(`./${moduleName()}.js`)
```

#### `import.meta`

ES2020引入了`import.meta`，它仅能在模块内部使用，包含一些模块自身的信息，即模块元信息

- `import.meta.url` 返回当前模块的URL路径
  - 浏览器加载ESModule都是通过HTTP发起请求
    - 例如当前模块为`fetchData.js`，要在模块内引入一个名为`data.json`的数据：
    - `import( new URL('data.json', import.meta.url) )`
  - Node.js环境下，该值都是`file://`协议的链接
- `import.meta.scriptElement`
  - 浏览器特有的属性
  - 返回加载模块的`<script>`标签，相当于`document.currentScript`

规范中并未规定`import.meta`中包含哪些属性，一般包括上面两个属性

### 深入理解模块加载

#### ESModule的解析过程

ESModule的解析过程可以分为三个阶段：

- 构建 `Construction`
  - 根据地址查找JS文件，并发起HTTP请求下载，将其解析为模块记录 `Module Record`
- 实例化 `Instatiation`
  - 对模块记录进行实例化，并为其分配内存空间
  - 解析ESModule模块的**导入和导出**语句，将模块指向对应的内存地址
  - 例如`export const name = 'Ziu'`，会将变量`name`添加到模块环境记录中 `Module Enviroment Record`
- 运行 `Evaluation`
  - 运行代码，计算值，并且将值填充到内存地址中
  - 将导入导出的**值**赋给对应的变量`name = 'Ziu'`

![ESModule解析过程](https://hacks.mozilla.org/files/2018/03/07_3_phases.png)

文章推荐：[ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

#### MJS和CJS的区别

- **CommonJS模块输出的是值的拷贝，而ESModule模块输出的是值的引用**
  - CJS导出的变量，其值如果在模块内发生变化，外部导入是不会同步更新的，除非导出的是一个取值函数
  - MJS导出变量，外部模块每次访问时都会得到该变量最新的值，即使变量在模块内被修改了
- **CommonJS模块是运行时加载，而ESModule是编译时输出接口**
  - CJS是**通过对象实现**的导入导出，它**在运行时才被确定依赖关系**和其值
  - MJS则是**通过静态定义**，在代码运行之前的**静态解析阶段即可确定模块的导入导出内容**
- **CommonJS模块的`require()`是同步加载模块，而ESModule模块的`import`命令是异步加载模块**
  - `import`命令拥有一个独立的模块依赖的解析阶段

#### CJS中的循环加载

设想有以下两文件 `a.js`与`b.js`：

::: code-group

```js [a.js]
// a.js
exports.done = false
const b = require('./b.js')
console.log('在 a.js 之中，b.done = %j', b.done)
exports.done = true
console.log('a.js 执行完毕')
```

```js [b.js]
// b.js
exports.done = false
const a = require('./a.js')
console.log('在 b.js 之中，a.done = %j', a.done)
exports.done = true
console.log('b.js 执行完毕')
```

```js [main.js]
// main.js
const a = require('./a')
const b = require('./b')
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done)
```

:::

执行脚本`main.js`，先执行`a.js`：

- 第一行 导出`done`值为`false`
- 第二行 `a.js`的代码暂停执行 进入`b.js`并等待其执行完毕

在`b.js`中：

- 第一行 导出`done`值为`false`
- 第二行 执行`a.js` 从`a.js`模块中取`exports`对象
- **取到其缓存值为`false`（`a.js`执行已经执行的部分）**
- 随后`b.js`继续向下执行 执行完毕后 将执行权交还给`a.js`

回到`a.js`中：

- 继续向后执行 直到代码执行完毕

最终输出：

```sh
在 b.js 之中，a.done = false
b.js 执行完毕
在 a.js 之中，b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

总结：

- CJS的模块导出是输出值的拷贝，而不是引用，值的变化不是动态的，而是会被缓存的
- 循环加载时，CJS模块导出的值是当前已经执行部分代码产生的结果的值，而不是模块代码完全执行完后的最终值

#### MJS中的循环加载

ESModule的导入和导出与CommonJS有本质不同：

::: code-group

```js [a.mjs]
// a.mjs
import { bar } from './b.mjs'
console.log('a.mjs')
console.log(bar)
export let foo = 'foo'
```

```js [b.mjs]
// b.mjs
import { foo } from './a.mjs'
console.log('b.mjs')
console.log(foo)
export let bar = 'bar'
```

:::

执行`a.mjs`后发现报错了：`ReferenceError: Cannot access 'foo' before initialization`，变量`foo`未定义

- MJS模块在代码执行前会进行静态分析
- 分析`a.mjs`的依赖关系时，发现其依赖了`b.mjs`
- 于是加载`b.mjs`并解析它的依赖关系
- 解析`b.mjs`的过程中，发现它又依赖了`a.mjs`
- 这时引擎不会再去加载`a.mjs` 而是认为`a.mjs`这个模块的`Module Record`已经存在了
- 继续向下执行，执行到`console.log(foo)`时发现`foo`未定义 抛出错误

要实现预期效果，可以将`foo`与`bar`改写为取值函数，这时执行就不会报错了：

::: code-group

```js [a.mjs]
// a.mjs
import { bar } from './b.mjs'
console.log('a.mjs')
console.log(bar())
export function foo() {
  return 'foo'
}
```

```js [b.mjs]
// b.mjs
import { foo } from './a.mjs'
console.log('b.mjs')
console.log(foo())
export function bar() {
  return 'bar'
}
```

:::

这是因为函数`function`具有提升作用，在`a.mjs`中执行`import { bar } from './b.mjs'`之前，`foo`就有定义了。

因此在进入`b.mjs`执行`console.log(foo())`时可以取到`foo`，代码可以顺利执行

另：如果将`foo`定义为函数表达式`export const foo = () => 'foo'`，由于没有变量提升，代码仍然会报错

#### 内部变量差异

ESModule和CommonJS另一个重要区别就是：

ESModule模块是在浏览器与服务端通用的，之前在解读CommonJS时介绍了它拥有的一些内部变量（模块变量）：

- `arguments`
- `require`
- `module`
- `exports`
- `__filename`
- `_dirname`

这些变量在ESModule模块中都是不存在的，且顶层的`this`不再指向当前模块，而是`undefined`

### 拓展内容

#### 在Node.js中使用ESModule

在Node.js中，普通的`.js`文件会被默认解析为CommonJS，要使用ESModule有两种方式：

- 所有ESModule的后缀名都使用`.mjs`并且不可省略
  - 这样引擎在解析到`.mjs`结尾的文件时，将按照ESModule的规则解析其导入导出关系
- 将`package.json`中的`type`字段修改为`module`
  - 此时项目中所有`.js`文件都将被作为ESModule模块解析
  - 要在此项目中使用CommonJS，则需要将后缀名修改为`.cjs`

#### 解读`package.json`中的字段

- `main`字段

  - 指定一个npm包的`main`字段为一个JS模块
  - 当我们从其他位置通过`import { something } from 'es-module-package'`导入时
  - Node.js将从`main`字段指定的模块查找导出内容

- `exports`字段

  - `exports`字段优先级高于`main`字段，它具有多种用法：
  - 子目录别名
    - 假设如是定义`exports`字段：`exports: { "./submodule": "./src/submodule.js" }`
    - 当执行`import submodule from 'es-module-package/submodule'`时，会按照以下路径查找模块：
    - `./node_modules/es-module-package/src/submodule.js`
  - `main`的别名
  - 条件加载

参考：[package.json 的 exports 字段](https://es6.ruanyifeng.com/#docs/module-loader#package-json-%E7%9A%84-exports-%E5%AD%97%E6%AE%B5)
