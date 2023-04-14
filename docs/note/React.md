# React

## 邂逅React

### React开发依赖

- `react` 包含React的核心代码
- `react-dom` 将React渲染到不同平台需要的核心代码
- `babel` 将JSX转换成React代码的工具

为什么要拆分成这么多的包？

- 不同的库各司其职，让库变得纯粹
- `react`包中包含了 React Web 和 React Native 共同拥有的**核心代码**
- `react-dom` 针对Web和Native完成的事情不同
  - Web端：`react-dom`会将JSX渲染成真实DOM，展示在浏览器中
  - Native端：`react-dom`会将JSX渲染成原生的控件（如Android中的Button，iOS中的UIButton）

### Babel与React的关系

Babel是什么？

- Babel又名Babel.js
- 是目前前端使用非常广泛的编译器、转换器（Compiler/Transformer）
- 提供对ES6语法的Polyfill，将ES6语法转为大多数浏览器都支持的ES5语法

二者之间的联系

- 默认情况下React开发可以不使用Babel
- 但是我们不可能使用React.createElement来编写代码
- 通过Babel，我们可以直接编写JSX（JavaScript XML），让Babel帮我们转化为React.createElement

### React初体验

我们通过CDN方式引入react、react-dom、babel这三个依赖

并且创建`#root`根节点，作为渲染React组件的容器，再新建一个script标签，键入以下内容

```html
<div id="root"></div>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin></script>
<script type="text/babel">
  ReactDOM.render(<div>Hello, React!</div>, document.querySelector('#root'))
</script>
```

这时，一个内容为`Hello, React!`的div标签就被渲染到页面上了

需要注意的是：`ReactDOM.render`这种写法适用于React18之前，在React18之后建议用下面的代码渲染根节点：

```tsx
const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<h1>Hello, React!</h1>)
```

### 第一个React程序

设想我们现在有这样一个需求：点击按钮使文本`Hello, World!`变为`Hello, React!`

我们很容易就能写出如下代码：

```tsx
const root = ReactDOM.createRoot(document.querySelector('#root'))
let msg = 'Hello, World!'

render() // initial render

function handleChangeClick() {
  msg = 'Hello, React!'
}

root.render(
  <div>
    <h1>{msg}</h1>
    <button onClick={handleChangeClick}>Change Text</button>
  </div>
)
```

在Vue中，如果我们对数据进行了修改，Vue的数据响应式会自动帮我们完成视图的更新

然而在React中，当我们修改了数据需要通知React，让React重新渲染视图。在这里，我们可以把渲染的过程封装为一个函数，方便我们重复调用，触发重新渲染

```tsx
const root = ReactDOM.createRoot(document.querySelector('#root'))
let msg = 'Hello, World!'

render() // initial render

function handleChangeClick() {
  msg = 'Hello, React!'
  render() // re-render
}

function render() {
  root.render(
    <div>
      <h1>{msg}</h1>
      <button onClick={handleChangeClick}>Change Text</button>
    </div>
  )
}
```

这个案例中，我们使用`{}`语法，将动态的JS语法嵌入到JSX代码中

### 组件化开发

React有两种组件：类组件与函数组件，React18+推荐使用函数组件+Hooks

#### 类组件

我们使用类组件来逐步重构上面的案例：

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: 'Hello, World!'
    }
  }
  render() {
    return <h2>{this.state.msg}</h2>
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

- 类组件必须实现render方法，render方法返回值为后续React渲染到页面的内容
- 组件内数据分为两类
  - 参与页面更新的数据
    - 当数据变化时，需要触发组件重新渲染
  - 不参与页面更新的数据
    - 数据不会变化，或变化后也不需要重新渲染视图

- 需要触发视图重新渲染的数据，我们将其成为：**参与数据流**
  - 定义在对象的`state`属性中
  - 可以通过在构造函数中通过 `this.state = { name: 'Ziu' }` 来定义状态
  - 当数据发生变化，可以调用 `this.setState` 来更新数据，通知React执行视图更新
  - update操作时，会重新调用render函数，使用最新的数据来渲染界面

:::success
需要注意的是，在constructor中我们调用了`super`，因为App类是继承自React.Component类，调用`super`即调用了其父类的构造函数，让我们的App组件可以继承一些内置属性/方法如`state setState render`
:::

至此我们完成了数据的迁移，下面我们来完成事件函数的迁移。

有了之前的介绍，我们很容易的可以写出下面的代码：

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: 'Hello, World!'
    }
  }
  changeText() {
    this.setState({
      msg: 'Hello, React!'
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.msg}</h2>
        <button onClick={this.changeText}>Change Text</button>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

我们可以写一个实例方法changeText来修改msg，然而此时changeText函数是不会正常工作的，我们在changeText中打log发现函数被正常触发了

为什么this.setState失效了？这和this的绑定有关：绑定的`changeText`在被调用时，向上找`this`找到的是`undefined`

举一个类似情况的例子：

```ts
const app = new App()
app.changeText() // this => app

const func = app.changeText
func() // this => undefined
```

在非严格模式下，直接调用func时的this指向的是window，严格模式下则为undefined

为了解决this绑定的问题，我们需要显式把函数调用绑定给当前组件，这时组件就可以正常工作了。

```tsx {17}
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      msg: 'Hello, World!'
    }
  }
  changeText() {
    this.setState({
      msg: 'Hello, React!'
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.msg}</h2>
        <button onClick={this.changeText.bind(this)}>Change Text</button>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

### 提前绑定this

在render函数中频繁通过`.bind`毕竟不太优雅，好在也有另一种方式：可以在constructor中提前对实例方法进行this绑定：

```tsx {7, 11}
...
constructor() {
  super()
  this.state = {
    msg: 'Hello, World!'
  }
  this.changeText = this.changeText.bind(this)
}
render() {
  ...
    <button onClick={this.changeText}>Change Text</button>
  ...
}
...
```
