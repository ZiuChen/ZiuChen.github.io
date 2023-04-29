# React Router

## 了解ReactRouter

三大框架都有各自的路由实现

- Angular ngRouter
- React ReactRouter
- Vue VueRouter

React Router在最近两年的版本更新较快，并且在最新的React Router6发生了较大的变化

- Web开发只需要安装`react-router-dom`
- `react-router`包含一些ReactNative的内容

```bash
npm i react-router-dom
```

从`react-router-dom`中导出`BrowserRouter` 或 `HashRouter`，二者分别对应history模式与哈希模式

将App用二者之一包裹，即可启用路由：

```tsx {5,10,12}
// index.js
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
)
```

路由的本质是路径与组件的映射关系（`path <==> component`）

ReactRouter不像VueRouter，它的路由映射关系是书写在组件中的：

下面的例子中使用到了几个**组件**：`Routes` `Route` `Navigate` `NavLink`

- `Routes` `Route`用来描述路径与组件的映射关系
  - 通过为`path`和`element`传入路径和相对应的组件，将其包裹在`Routes`内即可完成路由的描述
- `Navigate` 导航组件（在react-router5版本中是Redirect）
  - 可以帮我们完成重定向操作，将想要重定向的路径传递给组件的`to`属性
  - **当组件出现时，就会自动执行跳转**，属于功能性组件
  - 当访问根路径`/`时就会自动跳转到`/home`页
- `NavLink`用来实现路由的跳转
  - 特殊组件，其`className` `style`这些属性都可以传递一个函数
  - 可以从函数参数中解构出`isActive`属性来动态绑定样式（实际场景应用较少）

```tsx
// App.js
import React, { PureComponent } from 'react'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import NotFound from './views/NotFound'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>App</h1>
        <NavLink to="/home" className={({ isActive }) => (isActive ? 'link-active' : '')}>
          Home
        </NavLink>
        <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? 'red' : '' })}>
          About
        </NavLink>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    )
  }
}
```

另外，这里还有一个小技巧，在最末一个路由指定一个path为`*`的路由匹配规则，可以为路由匹配添加fallback策略，当未匹配到其之前的任何域名时，会展示NotFound页面

## 嵌套路由

嵌套路由可以通过在`Route`组件内部嵌套新的`Route`组件来实现

再通过`Outlet`组件来指定嵌套路由的占位元素（类似于VueRouter中的router-view）

我们在之前的例子的基础上，为Home页面添加两个子页面HomeRanking和HomeRecommand

同时，我们也应该为Home组件添加默认跳转，就像根路径默认重定向到Home组件那样，进入到Home组件后也应该默认重定向一个子页面中，这里我们仍然使用到了Navigate组件

::: code-group
```tsx [App.jsx ]
// App.jsx
import React, { PureComponent } from 'react'
import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from './views/Home'
import HomeRanking from './views/HomeRanking'
import HomeRecommand from './views/HomeRecommand'

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/home" element={<Home />}>
            <Route path="/home" element={<Navigate to="/home/ranking" />}></Route>
            <Route path="/home/ranking" element={<HomeRanking />}></Route>
            <Route path="/home/recommand" element={<HomeRecommand />}></Route>
          </Route>
        </Routes>
      </div>
    )
  }
}
```
```tsx [Home.jsx]
// Home.jsx
import React, { PureComponent } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <div>Home</div>
        <NavLink to="/home/ranking">Ranking</NavLink>
        <Outlet></Outlet>
      </div>
    )
  }
}
```
:::

## 编程式导航（高阶组件）

之前使用的ReactRouter提供的路由跳转的组件，无论是`Link`还是`NavLink`可定制化能力都比较差，无法实现“点击按钮后跳转路由”这样的需求，那么我们就需要通过编程式导航，使用JS来完成路由的跳转

ReactRouter提供了编程式导航的API：`useNavigate`

自ReactRouter6起，编程式导航的API不再支持ClassComponent，全面拥抱Hooks。

我们将在后续的学习中开启Hooks的写法，那么目前如何在类组件中也能使用Hooks呢？答案是高阶组件

封装一个高阶组件`withRouter`，经过高阶组件处理的类组件的props将会携带router对象，上面包含一些我们需要的属性和方法：

::: code-group
```tsx [withRouter.js]
// withRouter.js
import { useNavigate } from 'react-router-dom'

export function withRouter(WrapperComponent) {
  return (props) => {
    const navigate = useNavigate()
    const router = { navigate }
    return <WrapperComponent {...props} router={router} />
  }
}
```
```tsx [Home.jsx]
// Home.jsx
import React, { PureComponent } from 'react'
import { Outlet } from 'react-router-dom'
import { withRouter } from '../hoc/withRouter'

export default withRouter(
  class Home extends PureComponent {
    render() {
      return (
        <div>
          <div>Home</div>
          <button onClick={() => this.props.router.navigate('/home/ranking')}>Ranking</button>
          <button onClick={() => this.props.router.navigate('/home/recommand')}>Recommand</button>
          <Outlet></Outlet>
        </div>
      )
    }
  }
)
```
:::

我们使用`withRouter`高阶组件对Home组件进行了增强，可以通过编程式导航来实现二级路由跳转

这里只是展示了编程式导航的用法和高阶组件的能力，目前还是尽可能使用Hooks写法编写新项目

## 动态路由（路由传参）

传递参数由两种方式：

- 动态路由的方式
- 查询字符串传递参数

动态路由是指：路由中的**路径**信息并不会固定

- 比如匹配规则为`/detail/:id`时，`/detail/123` `detail/888`都会被匹配上，并将`123/888`作为id参数传递
- 其中`/detail/:id`这个匹配规则被称为动态路由

动态路由常见于嵌套路由跳转，比如：从歌曲列表页面点击后跳转到歌曲详情页，可以通过路由传递歌曲的ID，访问到不同歌曲的详情页

我们在之前的HomeRanking榜单中加入列表和点击跳转功能，并编写一个新的组件Detail来接收来自路由的参数

同样地，`react-router-dom`为我们提供了从路由获取参数的API：`useParams`，它是一个Hooks，我们将它应用到之前编写的高级组件`withRouter`中

- 在使用了`withRouter`的组件中，就可以通过`this.props.router.params.xxx`获取到当前路由中传递的参数
- 使用动态匹配路由时，传递给Route组件的`path`属性为`:xxx`，这里是`/detail/:id`

::: code-group
```tsx [withRouter.js]
// withRouter.js
import { useNavigate, useParams } from 'react-router-dom'

export function withRouter(WrapperComponent) {
  return (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const router = { navigate, params }
    return <WrapperComponent {...props} router={router} />
  }
}
```
```tsx [HomeRanking.jsx]
// HomeRanking.jsx
import React, { PureComponent } from 'react'
import { withRouter } from '../hoc/withRouter'

export default withRouter(
  class HomeRanking extends PureComponent {
    render() {
      const list = Array.from(Array(10), (x, i) => ({
        id: ++i,
        name: `Music ${i}`
      }))
      return (
        <div>
          <div>HomeRanking</div>
          <ul>
            {list.map((item, index) => (
              <li key={index} onClick={() => this.props.router.navigate(`/detail/${item.id}`)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }
)
```
```tsx [Detail.jsx]
// Detail.jsx
import React, { PureComponent } from 'react'
import { withRouter } from '../hoc/withRouter'

export default withRouter(
  class Detail extends PureComponent {
    render() {
      return (
        <div>
          <div>Detail</div>
          Current Music ID: {this.props.router.params.id}
        </div>
      )
    }
  }
)
```
:::

## 查询字符串的参数

之前传递的是路径参数，那么查询字符串参数应该如何获取？

可以通过`useLocation`这个Hooks拿到当前地址详细信息：

```tsx
const location = useLocation()
location.search // ?name=ziu&age=18
```

需要自行完成数据的解析，不太方便

还有一个Hooks：`useSearchParams`，可以在获取到查询字符串信息的同时帮我们解析成`URLSearchParams`对象

要从`URLSearchParams`类型的对象中取值，需要通过标准方法`get`

```tsx
const [ searchParams, setSearchParams ] = useSearchParams()
searchParams.get('name') // 'ziu'
searchParams.get('age') // 18
```

当然，我们在实际使用中也可以通过`Object.fromEntries`将它转为普通对象，这样我们使用`useSearchParams`来对之前编写的高阶组件`withRouter`做一次增强：

```tsx {8,9}
// withRouter.js
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export function withRouter(WrapperComponent) {
  return (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [searchParams] = useSearchParams()
    const query = Object.fromEntries(searchParams)
    const router = { navigate, params, query }
    return <WrapperComponent {...props} router={router} />
  }
}
```

::: tip
需要注意的是，这里的`useSearchParams`是一个Hooks的常见形态

它返回一个数组，数组的首位为值，数组的次位为改变值的方法

与对象解构不同的是，数组结构是对位解构：保证位置一致则值一致，命名随意

而对象解构恰恰相反，不必保证位置，而需要保证命名一致
:::

## 路由的配置方式

至此为止，路由的配置是耦合在`App.jsx`中的，我们可以将Routes这部分代码抽离出单独的组件，也可以通过配置的方式来完成路由映射关系的编写

- 在ReactRouter5版本中，我们可以将路由的映射规则写为JS对象，需要引入第三方库`react-router-config`
- 在ReactRouter6版本中，允许我们将其写为配置文件，不需要安装其他内容

6版本为我们提供了一个API：`useRoutes`，将我们编写的配置文件传入此函数，可以将其转化为之前编写的组件结构，本质上也是一种语法糖

需要注意的是，Hooks只能在函数式组件中使用，这里我们将App组件改用FunctionComponent书写了

::: code-group
```tsx [index.js]
// router/index.js
import { Navigate } from 'react-router-dom'
import Home from '../views/Home'
import HomeRanking from '../views/HomeRanking'
import HomeRecommand from '../views/HomeRecommand'
import About from '../views/About'
import Detail from '../views/Detail'
import NotFound from '../views/NotFound'

export const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Navigate to="/home/ranking" />
      },
      {
        path: 'ranking',
        element: <HomeRanking />
      },
      {
        path: 'recommand',
        element: <HomeRecommand />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/detail/:id',
    element: <Detail />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
```
```tsx [App.jsx]
import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import { routes } from './router'

export default function App() {
  return (
    <div>
      <h1>App</h1>
      <NavLink to="/home" className={({ isActive }) => (isActive ? 'link-active' : '')}>
        Home
      </NavLink>
      <NavLink to="/about" style={({ isActive }) => ({ color: isActive ? 'red' : '' })}>
        About
      </NavLink>
      {useRoutes(routes)}
    </div>
  )
}
```
:::

## 懒加载

针对某些场景的首屏优化，我们可以根据路由对代码进行分包，只有需要访问到某些页面时才从服务器请求对应的JS代码块

可以使用`React.lazy(() => import( ... ))`对某些代码进行懒加载

结合之前使用到的配置式路由映射规则，我们使用懒加载对代码进行分包

```tsx {6,7,18,24}
// router/index.js
import { lazy } from 'react'
// import HomeRecommand from '../views/HomeRecommand'
// import About from '../views/About'

const HomeRecommand = lazy(() => import('../views/HomeRecommand'))
const About = lazy(() => import('../views/About'))

export const routes = [
  ...
  {
    path: '/home',
    element: <Home />,
    children: [
      ...
      {
        path: 'recommand',
        element: <HomeRecommand />
      }
    ]
  },
  {
    path: '/about',
    element: <About />
  },
  ...
]
```

这时在终端执行`pnpm build`可以发现，构建产物为我们执行了分包，`About`和`HomeRecommand`这两个次级页面被打进了两个单独的包中

> 在Vue中默认为我们完成了代码分包，第三方包的代码都被打包到了`vendors`中，业务代码放到了单独的JS文件中

> 只有当我们访问到这些页面时，才会发起网络请求，请求这些次级页面的JS代码

然而如果你在react-app的构建产物`index.html`开启本地预览服务器，会发现切换到对应页面后项目会crash（本地开发也会crash）

```bash
# 使用 serve 开启本地预览服务器
pnpm add serve -g
serve -s build # 将 build 作为根目录
```

这是因为React默认没有为异步组件做额外处理，我们需要使用`Suspense`组件来额外处理懒加载的组件

```tsx
// index.js
import React, { StrictMode, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<h2>Loading...</h2>}>
        <App />
      </Suspense>
    </HashRouter>
  </StrictMode>
)
```

当根组件内部有组件处于异步加载状态时，都会在页面上展示`Loading...`而不是崩溃掉
