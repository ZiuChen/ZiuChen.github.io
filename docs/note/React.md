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

我们可以写一个实例方法changeText来修改msg，然而，此时我们点击按钮后发现，案例不能正常工作。

如果在changeText中打log，会发现函数被正常触发了，但是状态没有更新

为什么this.setState失效了？这和this的绑定有关：绑定的`changeText`在被调用时，向上找`this`找到的是全局的`this`即`undefined`

这种情况有点类似于下面的例子：

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

```tsx {7,11}
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

### 列表渲染

可以通过循环，将数组渲染到视图中

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movieList: [
        'The Shawshank Redemption',
        'The Godfather',
        'The Godfather: Part II',
        'The Dark Knight'
      ]
    }
  }

  render() {
    return (
      <ul>
        {this.state.movieList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

需要注意的是，这里绑定的key的功能类似于Vue中的特殊属性key，它用来帮助React对列表渲染进行更高效的更新。

### 计数器案例

结合之前的知识，可以实现一个简单的计数器

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.addCount = this.addCount.bind(this)
    this.subCount = this.subCount.bind(this)
  }

  addCount() {
    this.setState({
      count: this.state.count + 1
    })
  }

  subCount() {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    const { count } = this.state

    return (
      <div>
        <h1>Count: {count}</h1>
        <button onClick={this.addCount}>Add</button>
        <button onClick={this.subCount}>Sub</button>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

## 认识JSX语法

- 认识JSX语法
- JSX基本使用
- JSX事件绑定
- JSX条件渲染
- JSX列表渲染
- JSX的原理与本质

是因为我们给script标签添加了`type="text/babel"`属性，浏览器不会对这个script进行解析，当babel被加载完成后，babel会在页面中寻找`type="text/babel"`的script标签进行转义，转义后的代码才会被浏览器执行

- JSX: JavaScript Extension / JavaScript XML
- All in JS
- 不同于Vue的模板语法 不需要专门学习模板语法中的指令(v-for/v-if/v-bind)

### JSX的使用

#### 书写JSX的规范与注意事项

- JSX的顶层只能有一个根元素 元素必须包裹在单独的闭合标签中
  - 后续会接触到Fragment标签 Vue3也是将元素包裹在了Fragments标签中
- 为了方便阅读 通常在JSX外层包裹一个小括号`()`方便阅读

#### JSX的注释

在JSX中编写注释，需要以`{/* ... */}`的形式，在`.jsx/.tsx`文件中，通过快捷键就可以快捷的生成注释内容

本质上是通过花括号语法`{}`嵌入了一段JavaScript表达式，在表达式中书写注释

```tsx{4}
...
return (
  <div>
    {/* Some Comment... */}
    <h1>Count: {count}</h1>
    <button onClick={this.addCount}>Add</button>
    <button onClick={this.subCount}>Sub</button>
  </div>
)
...
```

#### JSX嵌入变量作为子元素

可以通过花括号语法将变量内容嵌入到JSX语法中：

```tsx
const message = 'Hello, React!'
const arr = ['abc', 'cba', 'nba']

return (
  <div>
    <h1>{ message }</h1>
    <div>{ arr }</div>
  </div>
)
```

- 变量类型为number string array类型时，可以直接展示
- 变量类型为null undefined boolean类型时，内容为空
  - 如果希望可以展示null/undefined/boolean类型，需要通过`.toString()`方法将其转为字符串
  - 空字符串拼接、String构造函数等方式
- Object对象类型不能作为子元素 (Objects are not valid as a React child)

下例中，只有number类型会被正常展示，而其余变量则不会展示在视图中

```tsx
render() {
  const number = 123
  const n = null
  const u = undefined
  const b = true

  return (
    <div>
      <div>
        Number: {number}
      </div>
      <div>
        Null: {n}
      </div>
      <div>
        Undefined: {u}
      </div>
      <div>
        Boolean: {b}
      </div>
    </div>
  )
}
```

将对象类型变量嵌入到JSX语法中，React会抛出错误：

```tsx {6}
...
render() {
  const obj = { name: 'Ziu' }
  return (
    <div>
      { obj }
    </div>
  )
}
...
```

#### JSX的属性绑定

- 在Vue中我们通过`v-bind`绑定属性
- 在React中如何绑定元素属性？
- `title` `src` `href` `class` 内联`style`等

下例中，我们通过花括号语法对元素的属性进行了动态绑定，点击按钮可以切换className状态

同时，动态绑定的内联样式也会发生改变，通过花括号语法动态绑定style属性

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isActive: false,
      title: 'Description'
    }
    this.changeActive = this.changeActive.bind(this)
  }

  changeActive() {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const { isActive, title } = this.state
    const classList = ['title', isActive ? 'active' : '']

    return (
      <div>
        <div
          className={classList.join(' ')}
          title={title}
          style={{ color: isActive ? 'red' : 'blue' }}
        >
          Hello, React!
        </div>
        <button onClick={this.changeActive}>Change Active</button>
      </div>
    )
  }
}
```

当我们通过脚手架创建项目时，可以使用第三方库来帮我们完成className的绑定

- `classnames`库 `pnpm add classnames`
- 提供了多种创建className的语法

### JSX事件绑定

先前的例子中，我们已经通过`onClick`给按钮绑定过事件处理函数了，其中涉及了this绑定

回顾一下this的四种绑定规则：

1. 默认绑定 独立执行 foo() this => undefined
2. 隐式绑定 被一个对象执行 obj.foo() this => obj
3. 显式绑定 call/bind/apply foo.call('aaa') this => String('aaa')
4. new绑定 new Foo() 创建一个新对象，并且赋值给this

除了之前通过`function + bind`绑定事件处理函数的方式，还可以通过箭头函数来帮我们完成处理

箭头函数的内部使用this时会自动向上层作用域查找this 实际开发中这种方式并不常用 

```tsx {2}
...
changeActive = () => {
  this.setState({
    isActive: !this.state.isActive
  })
}
...
```

相比之下更推荐使用的，是下面这种方式：

```tsx {2}
...
<button onClick={() => this.changeActive()}>Change Active</button>
...
```

这样书写有几种好处：

- 给事件处理函数传递参数更方便
- 书写更方便 不必主动考虑this绑定问题

它的原理是，我们对外暴露的本质上是一个箭头函数，当调用箭头函数时，本质上是执行`this.changeActive`，这是 一种隐式绑定，找到的this为当前组件实例

### 事件绑定参数传递

- Event参数传递
- 额外参数传递

事件回调函数的第一个默认参数就是Event对象，这个Event对象是经过React包装后的，但是原生的属性都包含在内，React对其进行了一些扩展
 
```tsx {13}
...
changeActive(ev) {
  console.log('Event', ev)
}

render() {
  return (
    <div>
      {/* event将作为默认入参传递给changeActive */}
      <button onClick={this.changeActive}>Change Active</button>

      {/* 通过箭头函数绑定事件监听回调函数时 需要手动透传一下event */}
      <button onClick={(ev) => this.changeActive(ev)}>Change Active</button>
    </div>
  )
}
...
```

当我们需要传递额外的参数时，通过箭头函数传递也更容易：

```tsx {13}
changeActive(ev, name, age) {
  console.log('Event', ev)
  console.log('Name', name)
  console.log('Age', age)
}

render() {
  return (
    <div>
      {/* NOT Recommand */}
      <button onClick={this.changeActive.bind(this, 'Ziu', 18)}>Change Active</button>
      {/* Recommand */}
      <button onClick={(ev) => this.changeActive(ev, 'Ziu', 18)}>Change Active</button>
    </div>
  )
}
```

需要注意，当通过`.bind`传递额外参数时，最后一个参数才是默认传递的Event对象，这会导致非预期行为

```sh
> Event 'Ziu'
> Name 18
> Age {Event}
```

### JSX事件绑定案例

创建一个Tab栏，选中哪个选项，哪个选项被激活切换为红色，同一时间仅有一个激活项目

结合之前学习的内容，很容易就可以写出下述 代码：

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      activeIndex: 0,
      tabList: ['Home', 'Recommend', 'Hot', 'User']
    }
  }

  changeActive(index) {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { activeIndex, tabList } = this.state

    return (
      <div>
        <div className="tabs">
          {tabList.map((item, index) => (
            <button
              className={'tab ' + index === activeIndex ? 'active' : ''}
              style={{
                color: index === activeIndex ? 'red' : 'black'
              }}
              key={index}
              onClick={() => this.changeActive(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

### 条件渲染

控制元素按照某种条件渲染，以加载状态为例

列表未加载出来时，展示`加载中`，加载完毕则渲染完整内容：

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoading: true
    }
  }

  changeLoading() {
    this.setState({
      isLoading: !this.state.isLoading
    })
  }

  render() {
    const { isLoading } = this.state

    return (
      <div>
        {isLoading ? (
          <div className="loading"> Loading ... </div>
        ) : (
          <div className="list">Some Content</div>
        )}
        <button onClick={() => this.changeLoading()}>Toggle Loading</button>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

常用的条件渲染方式

- `if/else/else-if`
  - 适合判断逻辑较复杂的情况 将条件渲染抽离出来
- 三元运算符 `?:`
  - 适合判断逻辑简单的情况
- 逻辑与运算符 `&&`
  - 如果条件成立则渲染某个组件，否则什么内容都不渲染
- 可选链 `user?.info?.name`

下例中通过逻辑与运算符`&&`决定`VIP`标签是否展示在视图中 

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isVip: false
    }
  }

  changeVip() {
    this.setState({
      isVip: !this.state.isVip
    })
  }

  render() {
    const { isVip } = this.state

    return (
      <div>
        <div class="user">
          <span>username: Ziu</span>
          {isVip && <span className="vip-banner"> VIP </span>}
        </div>

        <button onClick={() => this.changeVip()}>Toggle Vip</button>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

#### 在React中简单写一个"v-show"

`v-show`是Vue提供的语法糖，不同于`v-if`，它只切换元素的`display`属性。

下面我们在React中简单复现一个`v-show`的效果：

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isShow: true
    }
  }

  changeShow() {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  render() {
    const { isShow } = this.state

    return (
      <div>
        <div style={{ display: isShow ? '' : 'none' }}>Target Element</div>
        <button onClick={() => this.changeShow()}>Toggle Show</button>
      </div>
    )
  }
}
```

实际使用中，将其封装为hooks来调用更具通用性，也更方便管理

### 列表渲染中的高阶函数

- `filter`函数 过滤器
- `slice`函数 分页
- `sorc`函数 排序
- ...

```tsx
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      stuList: [
        { name: 'Ziu', age: 18, score: 88 },
        { name: 'Kobe', age: 19, score: 59 },
        { name: 'Why', age: 20, score: 61 },
        { name: 'James', age: 21, score: 99 }
      ]
    }
  }

  render() {
    const { stuList } = this.state

    // 及格的学生
    const passStuList = stuList.filter((item) => item.score >= 60)

    // 分数最高的两个学生
    const top2StuList = stuList.sort((a, b) => b.score - a.score).slice(0, 2)

    return (
      <div>
        <div className="list">
          {stuList.map(({ name, age, score }) => (
            <div className="item" key={name}>
              <span className="name">{name}</span>
              <span className="age">{age}</span>
              <span className="score">{score}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

### JSX的本质

#### JSX的转换过程

假设我们有下面的JSX代码：

```tsx
class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    const page = (
      <div className="page">
        <div className="header">Header</div>
        <div className="content">
          Content
          <div className="banner">Banner</div>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
        <div className="footer">Footer</div>
      </div>
    )
    console.log(page)
    return <div>{page}</div>
  }
}
```

通过JSX语法描述出来的template会经过Babel转化，转化为JavaScript树的数据结构

在控制台中我们可以看到，子节点都存放进了父节点的`props.children`中

#### 虚拟DOM树

JSX仅仅是`React.createElement(component, props, ...children)`的语法糖

所有的JSX语法都会被Babel转化为这样的命令式语法

.createElement函数的参数

- type
  - 当前ReactElement的类型
  - 如果是标签元素，值为字符串如：`"div"`
  - 如果是组件元素，那么值为组件的名称
- config
  - 所有JSX中绑定的属性都在config中以键值对的形式存储
  - 例如`className` => `class`

我们借助Babel官网的Playground来检查一下JSX语法的转化

```js
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const page = /*#__PURE__*/_jsxs("div", {
  className: "page",
  children: [/*#__PURE__*/_jsx("div", {
    className: "header",
    children: "Header"
  }), /*#__PURE__*/_jsxs("div", {
    className: "content",
    children: ["Content", /*#__PURE__*/_jsx("div", {
      className: "banner",
      children: "Banner"
    }), /*#__PURE__*/_jsxs("ul", {
      children: [/*#__PURE__*/_jsx("li", {
        children: "Item 1"
      }), /*#__PURE__*/_jsx("li", {
        children: "Item 2"
      }), /*#__PURE__*/_jsx("li", {
        children: "Item 3"
      }), /*#__PURE__*/_jsx("li", {
        children: "Item 4"
      }), /*#__PURE__*/_jsx("li", {
        children: "Item 5"
      })]
    })]
  }), /*#__PURE__*/_jsx("div", {
    className: "footer",
    children: "Footer"
  })]
});
console.log(page);
```

这时经过Babel转义后的纯JS函数，这段函数可以在浏览器中直接运行

如果移除了相关JSX代码，并将他们都替换为`React.createElement`函数调用，那么得到的代码也可以直接在浏览器中运行。Babel帮助我们完成了转化，提高了开发效率，相比于通过调用`React.createElement`来描述视图，通过JSX编写的代码更加容易维护

这些代码最终形成的就是虚拟DOM树，React可以将虚拟DOM渲染到页面上，形成真实DOM

虚拟DOM允许React可以通过diff算法，高效地对真实DOM树进行更新

### 声明式编程

- 虚拟DOM帮我们从命令式编程转到了声明式编程的模式
- 对虚拟DOM作何处理，如何渲染是由React决定的，由于做了一层抽象，那么同样可以将虚拟DOM渲染成原生组件（React Native）

### 购物车案例

下面写一个经典的购物车案例

```tsx
function formatPrice(price) {
  return `$ ${price.toFixed(2)}`
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [
        { name: 'book1', author: 'author1', price: 100, count: 0 },
        { name: 'book2', author: 'author2', price: 200, count: 0 },
        { name: 'book3', author: 'author3', price: 300, count: 0 },
        { name: 'book4', author: 'author4', price: 400, count: 0 }
      ]
    }
  }

  changeCount(index, count) {
    this.setState((state) => {
      const books = [...state.books]
      books[index].count += count
      return { books }
    })
  }

  removeItem(index) {
    this.setState((state) => {
      const books = [...state.books]
      books.splice(index, 1)
      return { books }
    })
  }

  getTotal() {
    const { books } = this.state
    return books.reduce((acc, { price, count }) => acc + price * count, 0)
  }

  renderBookCart() {
    const { books } = this.state
    const total = this.getTotal()
    return (
      <div className="shopping-cart">
        <h1>Shopping Cart</h1>
        <div className="books">
          {books.map(({ name, author, price, count }, index) => (
            <div className="book" key={name}>
              <span className="idx">{index + 1}</span>
              <span className="name">{name}</span>
              <span className="author">{author}</span>
              <span className="price">{formatPrice(price)}</span>
              <span className="counter">
                <button onClick={() => this.changeCount(index, -1)} disabled={count <= 0}>
                  -
                </button>
                <span className="counter-number">{count}</span>
                <button onClick={() => this.changeCount(index, 1)}>+</button>
              </span>
              <button onClick={() => this.removeItem(index)}>Delete</button>
            </div>
          ))}
        </div>
        <div className="total">
          <span>Total: {formatPrice(total)}</span>
        </div>
      </div>
    )
  }

  renderEmptyTip() {
    return <div className="empty">Shopping Cart is Empty</div>
  }

  render() {
    const isEmpty = this.state.books.length === 0

    return !isEmpty ? this.renderBookCart() : this.renderEmptyTip()
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
```

## React项目开发

- 认识脚手架工具
- create-react-app
- 创建React项目
- Webpack的配置

### React脚手架

类似于Vue提供的 `pnpm create vite` 创建一个模板，React也可以通过 `create-react-app` 来初始化一个空的React模板

```sh
pnpm add create-react-app -g # 全局安装create-react-app
create-react-app react-app # 创建一个名为react-app的React项目
# 删除node_modules package-lock.json
cd react-app
pnpm i # 使用pnpm重新安装依赖
```

```tsx
// index.js
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)

// App.jsx
import { Component } from 'react'

export default class App extends Component {
  render() {
    return <div>Hello, React!</div>
  }
}
```

### React组件化开发

- React组件生命周期
- React组件间通信
- React组件插槽
- React非父子的通信
- setState使用详解

组件化是React的核心思想之一，组件化是一个抽象的过程，将大的应用程序抽象为多个小的组件，最终形成组件树

分而治之，让代码更容易组织和管理

React组件相对于Vue更加灵活多样，按照不同的方式可以分为多种组件

- 根据组件定义方式，可以分为：函数组件(Functional Component)与类组件(Class Component)
- 根据组件内部是否有状态需要维护，可以分为：无状态组件(Stateless Component)和有状态组件(Stateful Component)
- 根据组件的不同职责，可以分为：展示型组件(Presentational Component)和容器型组件(Container Component)

除此之外，还有异步组件、高阶组件等...

### 类组件

- 类组件的定义有以下要求：
  - 组件的名称必须为大写（无论是类组件还是函数组件）
  - 类组件需要继承自React.Component
  - 类组件内必须实现render函数
- 通过class关键字定义一个组件
  - constructor是可选的，通常需要在constructor中初始化一些数据
  - this.state中维护的数据就是组件内部的数据
  - **render方法是class组件中唯一必须实现的方法**

#### render函数

- render函数在组件第一次渲染时被调用
- 当`this.props`或`this.state`发生变化时被调用
 
被调用时组件内会检查`this.props`和`this.state`是否发生变化，并且返回下面的返回值之一：

- React元素
  - 通常通过JSX创建
  - 例如`<div />`会被React渲染为DOM节点，而`<SomeComponent />`会被React渲染为自定义组件
  - 无论是`<div />`还是`<SomeComponent />`，他们都为React元素
- 数组或Fragments组件
  - 允许通过render方法同时返回多个元素
- 字符串或数字
  - 元素会被渲染
- boolean/null/undefined类型
  - 元素不会被渲染

### 函数组件

函数组件不需要继承自任何父类，函数的返回值相当于render函数的返回值，表示组件要渲染的内容

修改前文中编写的`App.jsx`即可：

```tsx
// App.jsx
export default function App() {
  return <div>Hello, React!</div>
}
```

- 函数组件是使用function定义的函数，函数的返回值会返回与render函数相同的内容，表示组件要渲染的内容
- 函数组件有自己的特点（在无hooks的情况下，引入hooks后函数组件与类组件一样强大）
  - 没有生命周期，也会被更新并挂在，但是没有生命周期函数
  - this关键字不能指向组件实例，因为没有组件实例
  - 没有内部状态（state）

### 组件的生命周期

我们需要在组件的不同生命周期中执行不同的操作，比如添加解除监听器、发起网络请求等

![React Life Cycle: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](./React.assets/react-life-cycle.png)

- `componentDidMount` 组件挂载后
- `componentDidUpdate` 组件更新后
- `componentWillUnmount` 组件卸载前
