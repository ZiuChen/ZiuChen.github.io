# 服务端渲染(SSR)

- 邂逅SPA和SSR
- Node服务搭建
- Vue3 + SSR搭建
- SSR + Hydration 水合
- Vue SSR + Router
- Vue SSR + Pinia

## 邂逅SPA和SSR

我们使用Vue开发的网页一般都是单页面应用程序（SPA Single Page Application）

- SPA应用是在客户端呈现的，我们称这个渲染过程为CSR（Client Side Rendering）
- 常见的B端Web应用开发模式，**渲染工作在客户端进行，服务器压力较轻**，服务器直接返回未经加工的`.html`文件
- 所需要的资源（HTML CSS JS等），在一次请求中就加载完成，首屏时间更长，需要额外的首屏优化

与之相对的，就是服务端渲染（SSR Server Side Rendering）

- SSR并不是什么新鲜的概念，早期的JSP或PHP就已经体现了服务端渲染的原理
- 但是传统开发模式，代码耦合度较高，不容易维护

于是，同构SSR应运而生，我们称之为BFF（Backend for Frontend 服务于前端的后端）

- 前后端一体化，一套Vue / React代码在服务器上运行一遍，在到达浏览器又运行一遍。
- 前后端都参与到渲染中，并且首次渲染出的HTML相同

浏览器请求`.html`文件 => 服务端运行Vue / React代码并生成`.html` => 发送`.html`文件给浏览器 => 浏览器显示网页内容

=> 浏览器加载JS文件 => 绑定DOM事件 客户端渲染接管界面 => 再次跳转路由就是客户端渲染 无需请求后台

### SPA的优点与缺点

- SPA的优点
  - 只需要加载一次 更好的用户体验
    - 只有一个`.html`文件，页面切换不需要重新加载，所以比传统Web应用程序更快
  - 轻松构建功能丰富的Web应用程序
- SPA的缺点
  - SPA应用默认只返回一个空HTML文件，不利于SEO
  - 首屏加载资源过大，影响首屏渲染速度
  - 不利于复杂项目构建

### SEO优化

- 语义性HTML标记
  - 标题用 `h1`，一个页面只应当由一个 `h1` 标签，副标题用 `h2 - h6`
  - 不要过度使用 `h` 标签，多次使用不会增加SEO
  - 段落用 `p` 标签 列表用 `ul` 标签，且 `li` 只放在 `ul` 中
- 每个页面都需要包含标题+内部链接
  - 每个页面对应的title，同一个网站所有页面都有内链可以指向首页
- 保证链接可供抓取
  - `<a href="https://www.example.com" />`
  - `<a href="/relative/path/file" />`
- meta标签优化：设置description和keywords等
- 文本标记和img
  - 比如`<b>`和`<strong>`加粗文本的标签，爬虫会关注到该内容
  - `img`标签添加`alt`属性，图片加载失败时供爬虫读取`alt`内容
- robots.txt 文件，规定爬虫可以访问网址上的哪些页面
- sitemap.xml 站点地图，在站点地图列出所有网页，确保爬虫不会漏掉某些网页

## 服务端渲染 SSR

服务端渲染 SSR （Server Side Rendering）

- 页面是在服务端渲染的，用户每请求一个SSR页面，都会先在服务端渲染
- 服务端渲染完成后，返回给浏览器呈现，浏览器发现JS脚本，解析脚本，向服务器发起请求，之后网页就可以交互了
  - `app = createSSRApp(App)` `renderToString(app) => App String Html`
  - `client_bundle.js` 客户端通过脚本激活应用程序 让应用程序可以进行交互，这个过程叫水合（ Hydration）
- Vue Nuxt / React Next.js，SSR应用也称为同构应用（server_bundle.js & client_bundle.js）

### SSR的优点

- 更快的首屏渲染速度
  - 浏览器显示静态页面的内容要比JavaScript动态生成的内容快得多
  - 用户访问首页时立刻返回静态页面内容，而不需要等待浏览器先加载完整个SPA应用的JS代码
- 更好的SEO
  - 爬虫擅长爬取HTML页面，服务端直接返回一个静态的HTML给浏览器
  - 有利于爬虫快速爬取网页内容，并编入索引，有利于SEO
- SSR 应用程序在 Hydration 之后仍然可以保留Web应用程序的可交互性
  - 如：前端路由、响应式数据、虚拟DOM等

### SSR的缺点

- SSR 通过需要对服务器进行更多的API调用，在服务端渲染需要消耗更多的服务器资源，成本较高
- 100个人访问这个网站，服务器就要为每个人渲染100次
- 增加了一定的开发成本，开发者需要关心哪些代码是运行在服务端的，哪些则是运行在浏览器的
- SSR配置站点的缓存通常会比SPA站点要更复杂

### SSR 解决方案

- 传统方案：PHP JSP ...
- 从0开始，搭建SSR项目：Node+Webpack+Vue/React
- 选用现成的框架
  - React Next.js
  - Vue3 + Nuxt3 || Vue2 + Nuxt.js

## 静态网站生成 SSG

静态网页生成 SSG（Static Site Generate）

- SSG应用在构建阶段就确定了`.html`页面的内容
- 用户访问网站，服务器直接返回`.html`文件给客户端，相当于一个静态资源
- 优点
  - 直接返回静态的`html`文件，有利于SEO
  - 相比于SSR，不需要每次请求都由服务端处理，所以可以大幅减轻服务端压力，也可以将文件放到CDN上优化访问速度
  - 保留了SPA应用的特性，比如前端路由、响应式数据、虚拟DOM等
- 缺点
  - 如果网站的内容需要更新，那么需要重新构建与部署
  - 只能生成偏静态的页面，不利于与用户的交互，所有用户获取到的页面都是相同的
- 哪些应用场景：文档站、个人博客、新闻站点等

### SSR与SSG的优势

- 更短的首屏时间
  - 只需要请求一个HTML文件就能展示出页面
  - 虽然在服务端仍然需要调取相关接口，但是服务器-服务器之间的通信远比客户端快，有时甚至是同一台服务器的本地接口
  - 不再需要大量的js文件请求，这就使得SSR/SSG可以拥有更短的首屏时间

### 跨请求状态污染

- 在SPA中，整个生命周期只有一个App对象实例/一个Router对象实例/一个Store对象实例

  - 因为每个用户使用SPA时，各自的渲染进程都是在自己的浏览器上独立进行的，这是一种**单例模式**

- 然而在SSR的环境下，App模块通常只在

  服务器启动时

  初始化一次，同一个应用模块会在多个服务器请求之间被复用

  - 单例状态对象也会在多个请求之间被复用：
  - 某个用户对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一位正在请求的用户
  - 我们将这种情况称为：**跨请求状态污染**

- 为了避免这种跨请求状态污染，SSR的解决方案是：

  - 在每个请求中，为整个应用创建一个**全新的实例**，包括后面的Router和Store等实例
  - 带来的缺点就是：需要消耗更多的服务器资源

## Nuxt3 系统学习

- 邂逅Nuxt3
- Nuxt3 初体验
- Nuxt3 全局配置
- Nuxt3 内置组件
- Nuxt3 样式和资源
- Nuxt3 页面和导航
- Nuxt3 动态路由

### 认识Nuxt3

- 支持数据双向绑定和组件化：Vue.js
- 处理客户端导航：Vue Router
- 支持开发中热模块替换、生产环境代码打包：Webpack5 Vite
- 兼容旧版浏览器，支持ES6+语法转译：ESBuild
- 支持开发环境服务器，支持服务端渲染/API接口转发
- 使用`h3`实现部署**可移植性**（`h3`是一个极小的高性能http框架）
  - 如：支持在Serverless、Worker、Node.js环境中运行

### 搭建Nuxt3环境

使用命令行工具 `Nuxi` 初始化Nuxt：

- `npx nuxi init project-name`
- `pnpm dlx nuxi init project-name`
- `npm install -g nuxi && nuxi init project-name`

解读脚手架创建的初始化项目的`package.json`中的脚本：

```json
{
  "private": true,
  "scripts": {
    "build": "nuxt build",
    "dev": "nuxt dev",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "postinstall": "nuxt prepare"
  },
  "devDependencies": {
    "nuxt": "^3.2.0"
  }
}
```

- `build` 构建正式版本，将被输出到`.output`文件夹
- `dev` 开发环境
- `generate` 打包正式版本项目，但是会预渲染每个路由（`nuxt build --prerender`）
- `preview` 对打包项目启动本地预览服务器
- `postinstall` 该脚本为NPM的生命周期函数，将在`npm install`后执行

针对`postinstall`中执行的`nuxi prepare`脚本，官方文档有如下解释：

> The `prepare` command creates a `.nuxt` directory in your application and generates types. This can be useful in a CI environment or as a `postinstall` command in your `package.json`.

执行该脚本后，将在项目根目录创建`.nuxt`文件夹

- 这个文件夹将作为默认构建输出的文件夹
- 其中的文件都以`.d.ts`结尾，是Nuxt的TS类型声明

### 配置 Configuration

- 通过 `nuxt.config.ts` 文件，对Nuxt进行自定义配置
- `runtimeConfig` 运行时配置 即定义**环境变量**
  - 直接定义在 `runtimeConfig` 中的值，仅在服务端可以访问到
    - 定义在``runtimeConfig.public``中的变量，在客户端和服务端中都能读取到
    - 也可以将环境变量定义在`.env`文件中，优先级`.env > runtimeConfig`
      - 以`NUXT_`开头的会作为私有环境变量读取到运行时
      - 以``NUXT_PUBLIC_``开头的会作为公共变量读取到运行时
  - `appConfig` 应用配置，定义在**构建时**确定的公共变量，如 theme
    - 配置会和app.config.ts合并，优先级``app.config.ts > appConfig``
  - `app` app的配置
  - `head` 给每个页面设置head信息，也支持useHead配置和内置组件
    - 在这个配置中定义的标签，会注入到所有页面的head标签中
    - 也可以在某些页面动态插入head标签内容 使用``useHead``函数
    - 或者在template中使用Nuxt的内置组件``Head``
  - `ssr` 指定应用渲染模式
    - 默认值为true 即采用SSR方式渲染应用
    - 如果指定了``ssr: false`` 则会采用SPA的方式渲染应用，即客户端渲染
  - `router` 配置路由相关的信息，比如在客户端渲染可以配置hash路由
    - 需要注意的是：SSR并不支持哈希路由
    - ``router: { options: { hashMode: false } }``
  - `alias` 路径别名
    - 默认已经为我们配置好了一些别名，详情可以参阅文档
  - `modules` 配置Nuxt扩展的模块，比如``@pinia/nuxt`` ``@nuxt/image``
  - `routeRules` 定义路由规则，可以更改路由的渲染模式或分配基于路由缓存策略
  - `builder` 指定使用Vite还是Webpack来构建应用，默认是Vite，如切换为Webpack还需要安装额外依赖

#### runtimeConfig 与 appConfig

- `runtimeConfig`: 定义**环境变量**，比如：**运行时**需要指定的私有/公共的token等
- `appConfig`: 定义**公共变量**，比如：**构建时**确定的公共token、网站配置等

针对他们的比较，官方文档提供了一个表格可以参阅：

| Feature                   | runtimeConfig | app.config |
| ------------------------- | ------------- | ---------- |
| Client Side               | Hydrated      | Bundled    |
| Environment Variables     | ✅ Yes         | ❌ No       |
| Reactive                  | ✅ Yes         | ✅ Yes      |
| Types support             | ✅ Partial     | ✅ Yes      |
| Configuration per Request | ❌ No          | ✅ Yes      |
| Hot Module Replacement    | ❌ No          | ✅ Yes      |
| Non primitive JS types    | ❌ No          | ✅ Yes      |

[runtimeconfig-vs-appconfig](https://nuxt.com/docs/getting-started/configuration#runtimeconfig-vs-appconfig)

#### 区分Client和Server环境

Nuxt为我们扩展了Node的process对象，并为我们在浏览器环境提供了process对象：

- Nuxt会在服务端的process对象中注入属性`dev` `server` `client`以供使用
- 也会在浏览器网页中注入process对象，包含上述的三个属性
- 也可以手动判断`typeof window === 'object'`检查是服务器环境/浏览器环境

### 页面与组件 View and Component

Nuxt会自动为我们：注册组件、注册页面路由，*约定>配置*

- 位于`pages/`下的页面都会被注册路由
  - 路由使用内置组件NuxtPage占位，相当于router-view
  - 相对应的，可以使用NuxtLink执行跳转，相当于router-link
  - 因为底层是vue-router，所以动态路由、嵌套路由都是支持的
- 位于`components/`下的组件都会被自动全局注册

#### Nuxt3 内置组件

Nuxt3 框架提供了一些内置的组件，常用的如下：

- SEO组件：Html Body Head Title Meta Style Link NoScript Base
  - 这些组件的作用是，向页面中不同部分插入标签，在SSR的过程中渲染出来并返回给客户端
  - 这样爬虫就会在同步获取页面数据时获取到这些标签
- NuxtPage：是Nuxt自带的页面占位组件
  - 需要显示位于目录中的顶级或嵌套页面`pages/`
  - **是对 router-view 的封装**
- ClientOnly：该组件包裹的内容只会在客户端渲染
  - 其中内容不会出现在服务端返回的`.html`文件中
  - 会在客户端通过JS脚本动态渲染出来
    - 类似于Vue3新增的内置组件Suspence
    - 可以为其传入具名插槽#fallback展示组件被渲染前的加载中状态
- ServerOnly：该组件包裹的内容只会在服务端渲染

### 创建页面

文件目录即路由，，可以手动创建 也可以通过命令行快速创建页面

- `npx nuxi pages category/index`: 创建`pages/category/index.vue`
- `npx nuxi pages home/index`: 创建`pages/home/index.vue`
- `npx nuxi pages detail/[id]`: 创建`pages/detail/[id].vue` 动态路由

- 页面路由
  - 页面水合之后，页面导航会通过前端路由来实现，可以防止整页刷新
  - 当然，手动输入URL之后，点击刷新浏览器也可以导航，但这会导致整页刷新

#### 路由中间件

Nuxt提供了一个可定制的路由中间件，用来**监听路由的导航**，包括：局部和全局监听
- 匿名中间件
  - **在页面中**，通过`definePageMeta`定义
  - 可以监听局部路由，当注册多个中间件时，会按照注册顺序执行
  - 首次访问会在双端执行，后续都**只会在客户端执行**
- 命名路由中间件
  - 在`middleware`目录下定义，会自动加载中间件
  - 首次访问会在双端执行，后续都**只会在客户端执行**
- 全局路由中间件
  - 在`middleware`目录中，需要带`.global`后缀的文件，每次路由更改会自动运行
  - 与前两者不同，**每次页面切换，双端都会执行全局中间件**

#### 路由验证 Validate

Nuxt支持对每个页面路由进行验证，可以通过`definePageMeta`中的`validate`数学对路由进行验证
- validate属性接收一个回调函数，回调函数以`route`作为参数
  - 此回调返回一个布尔值，来决定是否放行路由
    - `false` 拦截路由 默认重定向到404页面
    - `true` 放行路由 正常跳转
  - 返回一个对象
    - `{ statusCode: 401 }` 返回自定义的 401 页面 验证失败
- 可以自定义错误页面
  - 在项目根目录 新建`error.vue`

### 页面布局 Layout

Layout布局是页面的包装器，可以将多个页面共性的东西抽取到Layout布局中

例如：每个页面的页眉和页脚，这些具有共性的组件，我们可以写到一个Layout布局中

本质上是Vue3的`<slot>`组件
- 默认布局，创建`layouts/default.vue`
  - 然后在`app.vue`中通过内置组件`<NuxtLayout>`使用
- 自定义布局
  - 创建`layouts/custom-layout.vue`
  - 然后在`app.vue`中，为`<NuxtLayout>`传入`name`属性（具名插槽）

### 渲染模式

浏览器和服务器都可以解释JavaScript代码，都可以将Vue.js组件呈现为HTML元素，此过程称为渲染
- 在客户端渲染组件为HTML元素的过程，称为客户端渲染
- 在服务端完成这个此操作的过程，称为服务端渲染

而Nuxt3支持多种渲染模式
- 之前在配置文件中提到的`ssr`选项，可以选择以SSR模式渲染，还是CSR方式渲染
- 混合渲染模式（SSR | CSR | SSG | SWR）：需要在 `routeRules` 根据每个路由动态配置渲染模式
