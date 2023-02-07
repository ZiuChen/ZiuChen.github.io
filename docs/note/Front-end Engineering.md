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
