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

## React组件化开发

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

## 组件的生命周期

我们需要在组件的不同生命周期中执行不同的操作，比如添加解除监听器、发起网络请求等

![React Life Cycle: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/](./React.assets/react-life-cycle.png)

结合上图，解读一下组件的完整生命周期：

- 组件挂载后 调用构造方法 constructor
- 执行 render 方法
- 组件挂载完毕 `componentDidMount`
- 后续，当props发生修改 或调用了setState触发state改变 或调用forceUpdate触发组件更新
  - 重新执行render函数 根据修改后的最新状态更新视图
  - React帮我们更新DOM和refs
  - 更新回调 `componentDidUpdate` 被调用
- 组件卸载 一般是条件渲染切换路由时发生卸载
- 组件被卸载前 `componentWillUnmount` 被调用
  - 可以用来执行一些清理副作用的操作
  - 如解除监听器等

总结一下常用的生命周期钩子：

- `componentDidMount` 组件挂载后
- `componentDidUpdate` 组件更新后
- `componentWillUnmount` 组件卸载前

```tsx
// LifeCycle.jsx
import { Component } from 'react'

export default class LifeCycle extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    console.log('LifeCycle componentDidMount')
  }

  componentDidUpdate() {
    console.log('LifeCycle componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('LifeCycle componentWillUnmount')
  }

  render() {
    console.log('LifeCycle render')
    return (
      <div>
        <h1>LifeCycle</h1>
        <p>{this.state.count}</p>
        <button onClick={this.addCount}>+</button>
      </div>
    )
  }
}
```

### constructor

一般来讲 constructor 中只完成两件事情

- 给this.state赋初值 初始化组件内部状态
- 为事件处理函数绑定实例(.bind(this))

如果不初始化state或不进行方法绑定，则不需要为React组件实现构造函数

### componentDidMount

该生命周期钩子会在组件挂载后被立即调用，相当于Vue中的onMounted

在该生命周期钩子中可以获取到组件的DOM结构，通常在其中完成以下操作：

- 依赖于DOM的操作 需要操作DOM
- 在此处发送网络请求 (Official Recommend)
- 在此处添加一些订阅监听回调 (在 componentWillUnmount 中取消订阅)

### componentDidUpdate

会在组件更新后被立即调用，首次渲染不会执行此方法

- 每次组件发生更新后，可以在此回调中对DOM进行操作
- 如果对更新前后的props进行了比较，也可以选择在此处进行网络请求
  - 比如当props未发生改变，则不执行网络请求

### componentWillUnmount

组件卸载及销毁之前调用

- 在此回调中执行必要的清理操作
- 例如 清除timer 取消网络请求 或取消在 componentDidMount 中创建的订阅等

### 不常用的生命周期

- static getDeivedStateFromProps
  - state的值在任何时候都依赖props时使用，该方法返回一个对象来更新state
- shouldComponentUpdate
  - 对外部条件进行显式比较 决定是否需要对组件进行更新
  - 在此生命周期回调中返回false时 不会触发re-render 可以完成一些性能优化
- getSnapshotBeforeUpdate
  - 在更新前获取快照 用于更新DOM前对部分数据进行保存
  - 比如在DOM更新前获取并保存当前滚动位置

## 组件间通信

组件间通过props通信

- 父组件通过直接在子组件上添加属性 `title={someValue}` 传递数据
- 子组件中通过 props 参数获取父组件传递来的数据

需要注意的是，子组件中需要通过 `super(props)` 将props注册给父类，这样才能通过`this.props`获取到props

但是默认情况下React帮我们完成了这个操作，我们也就不必手动在constructor写了

```tsx
// Header.jsx
import React, { Component } from 'react'

export default class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { title, count, tabs } = this.props

    return (
      <div>
        <h2>Title: {title}</h2>
        <h2>Count: {count}</h2>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index}>{tab}</li>
          ))}
        </ul>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import Header from './components/Header'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header title="Custom Title" count={1} tabs={['Home', 'Category', 'User']} />
      </div>
    )
  }
}
```

上文中的例子我们从父组件向子组件传递数据，但是数据都为静态的

我们再完成一个动态数据的绑定，用到了axios请求网络数据，并将数据动态传递给子组件

在父组件的 componentDidMount 中发起网络请求，获取到 postList 后通过props动态传递给子组件 Content 展示出来

```tsx
// Content.jsx
import React, { Component } from 'react'

export default class Content extends Component {
  render() {
    const { postList } = this.props

    return (
      <div>
        <ul>
          {postList.map((post) => {
            return <li key={post.id}>{post.title}</li>
          })}
        </ul>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import axios from 'axios'
import Content from './components/Content'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      postList: []
    }
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      this.setState({
        postList: res.data
      })
    })
  }

  render() {
    const { postList } = this.state
    return (
      <div>
        <Content postList={postList} />
      </div>
    )
  }
}
```

### 子组件向父组件通信

除了父组件向下传递数据，子组件也需要向上传递数据给父组件。

在React中是通过父组件提供给子组件一个回调函数，在子组件中调用回调函数，从而达到子组件向父组件通信的目的

父组件在提供数据状态 `count` 的同时，也提供了增减 `count` 的回调函数 `addCount` 和 `subCount`，子组件通过调用回调即可修改状态值

```tsx
// Counter.jsx
import React, { Component } from 'react'

export default class Counter extends Component {
  render() {
    const { count, addCount, subCount } = this.props
    return (
      <div>
        <button onClick={subCount}>-</button>
        <span>{count}</span>
        <button onClick={addCount}>+</button>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import Counter from './components/Counter'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  addCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  subCount = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <Counter count={count} addCount={this.addCount} subCount={this.subCount}></Counter>
      </div>
    )
  }
}
```

### 参数propTypes

我们可以对props传递值的类型做限制 （目前官方已不再推荐使用prop-types 建议直接上TypeScript）

- 如果项目中默认集成了Flow或TypeScript，可以直接进行类型验证
- 如果没有集成，则可以通过 prop-types 库来进行参数类型验证
- 从React v15.5起，React.PropTypes独立成为了一个npm包 prop-types 库

```sh
pnpm add prop-types
```

以之前的类组件 Header 为例，为其添加类型限制：

```tsx {3,27-31}
// Header.jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Header extends Component {
  // constructor(props) {
  //   super(props)
  // }

  render() {
    const { title, count, tabs } = this.props

    return (
      <div>
        <h2>Title: {title}</h2>
        <h2>Count: {count}</h2>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index}>{tab}</li>
          ))}
        </ul>
      </div>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  tabs: PropTypes.array.isRequired
}

Header.defaultProps = {
  title: 'Default Title',
  count: 0
}
```

- 可以直接在组件类上添加`.propsType`为其添加类型检查
- 也可以添加`.defaultProps`为其传入默认值

需要注意的是，这里的类型限制和Vue做的defineProps类型限制是类似的，如果没有IDE Extension做额外检查，其类型检查都是在运行时进行的

如果props类型发生不匹配，在运行时会在控制台抛出错误，而编译是可以正常完成的

> Warning: Failed prop type: Invalid prop `title` of type `number` supplied to `Header`, expected `string`.

相比之下，TypeScript可以完成静态的类型检查，帮助我们更早的发现错误

### 组件通信案例 Tab栏切换

展示一个Tabs，点击切换页面，并切换不同的Tab激活状态。

切换activeIndex后，触发Tabs组件和下方Pages组件的重新渲染

这里对className的拼接可以用第三方库 classnames 替换

```tsx
// Tabs.jsx
import React, { Component } from 'react'

export default class Tabs extends Component {
  render() {
    const { tabs, activeIndex, changeTab } = this.props

    return (
      <div className="tabs" style={{ display: 'flex' }}>
        {tabs.map((tabName, index) => (
          <div
            className={['tab', activeIndex === index ? 'tab-active' : ''].join('')}
            onClick={changeTab(index)}
            style={{
              margin: 5,
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: activeIndex === index ? 'red' : 'black',
              borderBottom: activeIndex === index ? '2px solid red' : ''
            }}
          >
            {tabName}
          </div>
        ))}
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import Tabs from './components/Tabs'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tabs: ['Home', 'Hot', 'Category', 'Profile'],
      activeIndex: 0
    }
  }

  changeTab = (index) => () => {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { tabs, activeIndex } = this.state
    return (
      <div>
        <Tabs tabs={tabs} activeIndex={activeIndex} changeTab={this.changeTab}></Tabs>
        {tabs[activeIndex] === 'Home' && <h2>Home</h2>}
        {tabs[activeIndex] === 'Hot' && <h2>Hot</h2>}
        {tabs[activeIndex] === 'Category' && <h2>Category</h2>}
        {tabs[activeIndex] === 'Profile' && <h2>Profile</h2>}
      </div>
    )
  }
}
```

## React中的插槽

React并不存在插槽的概念，但是可以通过`props.children`来实现类似的效果

- 可以通过向子组件传递`props.children`子元素来决定子组件内渲染何种内容的标签
- 我们在子组件标签内书写的内容都会默认作为`props.children`传递给子组件

### 通过children实现插槽

实现一个导航栏NavBar组件，左中右布局，渲染内容由父组件决定

需要注意的是 如果只传入了一个子标签，那么`props.children`不再是一个数组，需要对此做额外判断

```tsx
// NavBar.jsx
import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    const { children } = this.props

    Array.isArray(children) || (children = [children])

    return (
      <div
        className="nav-bar"
        style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <div className="left">{children[0]}</div>
        <div className="center">{children[1]}</div>
        <div className="right">{children[2]}</div>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import NavBar from './components/NavBar'

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar>
          <span>Back</span>
          <div>Search</div>
          <div>Menu</div>
        </NavBar>
      </div>
    )
  }
}
```

### 通过props实现插槽

相比于通过`props.children`传递插槽，通过props实现的插槽更具确定性

```tsx
// NavBar.jsx
import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    const { left, center, right } = this.props

    return (
      <div
        className="nav-bar"
        style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}
      >
        <div className="left">{left}</div>
        <div className="center">{center}</div>
        <div className="right">{right}</div>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import NavBar from './components/NavBar'

export default class App extends Component {
  render() {
    const left = <span>Back</span>
    const center = <div>Search</div>
    const right = <div>Menu</div>

    return (
      <div>
        <NavBar left={left} center={center} right={right}></NavBar>
      </div>
    )
  }
}
```

### 作用域插槽

在Vue中，可以通过作用域插槽，在父组件插槽内容中注入插槽的数据

- 标签与结构由父组件决定
- 数据内容由子组件对外暴露

重写之前的Tabs例子，可以将插槽传递的内容由静态的React元素变为一个函数，这样在子组件内部就可以通过函数传参，动态地对外暴露数据

之前每个Tab使用`span`标签书写的，通过作用域插槽，我们将它通过`button`标签渲染出来

```tsx{6,22,57}
// Tabs.jsx
import React, { Component } from 'react'

export default class Tabs extends Component {
  render() {
    const { tabs, activeIndex, changeTab, tabSlot } = this.props

    return (
      <div className="tabs" style={{ display: 'flex' }}>
        {tabs.map((tabName, index) => (
          <div
            className={['tab', activeIndex === index ? 'tab-active' : ''].join('')}
            onClick={changeTab(index)}
            style={{
              margin: 5,
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: activeIndex === index ? 'red' : 'black',
              borderBottom: activeIndex === index ? '2px solid red' : ''
            }}
          >
            {tabSlot ? tabSlot(tabName) : tabName}
          </div>
        ))}
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import Tabs from './components/Tabs'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      tabs: ['Home', 'Hot', 'Category', 'Profile'],
      activeIndex: 0
    }
  }

  changeTab = (index) => () => {
    this.setState({
      activeIndex: index
    })
  }

  render() {
    const { tabs, activeIndex } = this.state
    return (
      <div>
        <Tabs
          tabs={tabs}
          activeIndex={activeIndex}
          changeTab={this.changeTab}
          tabSlot={(content) => <button>{content}</button>}
        ></Tabs>
        {tabs[activeIndex] === 'Home' && <h2>Home</h2>}
        {tabs[activeIndex] === 'Hot' && <h2>Hot</h2>}
        {tabs[activeIndex] === 'Category' && <h2>Category</h2>}
        {tabs[activeIndex] === 'Profile' && <h2>Profile</h2>}
      </div>
    )
  }
}
```

## Context跨组件传参

非父子组件之间的数据共享

- props层层传递 跨组件会很不方便 对于中间那些本不需要这些props数据的组件是冗余的
- 第三方状态库 外置于React 如Redux （实际开发中较为常用）
- 事件总线 ...

针对跨组件传参的场景，React提供了一个API名为Context

- Context 提供了一个在组件之间共享此类值的方式，而不是显式地通过组件树逐层传递props
- 使用 Context 共享那些全局的数据，如主题色、用户登录状态、locales等

### 用Context实现跨组件传参

假设有App Profile UserCard三个嵌套组件，我们希望App中的 `isDarkMode` 状态能够透传到UserCard组件中

- 全局通过 `createContext` 创建一个上下文
- 根组件通过 `DarkModeContext.Provider` 标签与 `value` 传递值到上下文中
- 需要使用到该值的子组件通过 `UserCard.contextType = DarkModeContext` 绑定到上下文
- 随后即可在子组件中通过 `this.context` 获取到此上下文当前绑定的状态值

::: code-group
```tsx [context.js]
// context.js
import { createContext } from 'react'

export const DarkModeContext = createContext()
```

```tsx [App.jsx]
// App.jsx
import React, { Component } from 'react'
import Profile from './components/Profile'
import { DarkModeContext } from './context'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      darkMode: false
    }
  }

  changeDarkMode = () => {
    this.setState({ darkMode: !this.state.darkMode })
  }

  render() {
    const { darkMode } = this.state

    return (
      <DarkModeContext.Provider value={darkMode}>
        <Profile />
        <button onClick={this.changeDarkMode}>Change DarkMode</button>
      </DarkModeContext.Provider>
    )
  }
}

// Profile.jsx
import React, { Component } from 'react'
import UserCard from './UserCard'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <UserCard />
      </div>
    )
  }
}
```

```tsx [UserCard.jsx]
// UserCard.jsx
import React, { Component } from 'react'
import { DarkModeContext } from '../context'

export default class UserCard extends Component {
  render() {
    return (
      <div>
        <h1>UserCard</h1>
        {this.context ? <h2>Dark Mode</h2> : <h2>Light Mode</h2>}
      </div>
    )
  }
}

UserCard.contextType = DarkModeContext
```
:::

在类组件中可以通过Context共享数据，而函数组件中的this并没有指向组件实例，那么在函数式组件中应当如何使用？

用函数式组件重写一下 UserCard

```tsx
// UserCard.jsx
import { DarkModeContext } from '../context'

export default function UserCard() {
  return (
    <DarkModeContext.Consumer>
      {(context) => (
        <div>
          <h1>UserCard</h1>
          {context ? <h2>Dark Mode</h2> : <h2>Light Mode</h2>}
        </div>
      )}
    </DarkModeContext.Consumer>
  )
}
```

如果同时需要共享多个状态，Provider可以嵌套，那么在子组件中可以通过不同的Context.Consumer获取到不同的全局上下文，执行不同的操作，展示不同的内容

### React.createContext

- 创建一个需要共享的Context对象
- 如果一个组件订阅了Context，那么这个组件会从自身最近的那个匹配的Provider中读取到当前的context值
- defaultValue是组件在顶层查找过程中没有找到对应的Provider，那么就使用默认值
- `const SomeContext = React.createContext(defaultValue)`

### Context.Provider

- 每个Context对象都会返回一个Provider组件，它允许消费组件订阅Context的变化
- Provider接收一个value属性，用于将变化的值传递给消费组件Consumer
- 一个Provider可以与多个Consumer创建关系
- 多个Provider可以嵌套使用，内层数据会覆盖外层数据
- 当Provider的value发生变化时，其内部的所有Consumer组件都会重新渲染

### Class.contextType

- 挂载在类组件上的 `contextType` 属性会被重新赋值为一个由 `React.createContext` 创建的Context对象
- 这允许你在类组件中通过 `this.context` 获取到**最近的Context**的值
- 任何生命周期都能访问到这个值

### Context.Consumer

- 帮你在**函数式组件**中完成订阅context （函数式组件中没有this）
- 当Consumer订阅到context变更，会触发其内部传递的函数
- 传入Consumer的函数接收当前的context值，返回一个React元素节点

### 关于defaultValue

什么时候会用到创建Context时传入的defaultValue？

如果子组件通过 `this.context` 向上查找时没有找到相应的Provider，则使用Context的默认值

```tsx{10}
...
  render() {
    const { darkMode } = this.state

    return (
      <>
        <DarkModeContext.Provider value={darkMode}>
          <button onClick={this.changeDarkMode}>Change DarkMode</button>
        </DarkModeContext.Provider>
        <Profile />
      </>
    )
  }
...
```

### props属性展开

如果我们希望将一个对象中的所有属性都作为props传递给子组件，可以在子组件标签上直接展开该对象

类似于Vue中的`v-bind="childProps"`，一次绑定所有属性到子组件

```tsx{6}
...
  render() {
    const { childProps } = this.state
    return (
      <div>
        <Child {...childProps} />
      </div>
    )
  }
...
```

如果你确实希望层层传递props来实现跨组件通信，那么可以在render函数中直接将`this.props`进行属性展开，虽然不推荐这样的做法：

```tsx
// App.jsx
<App {...this.props} />
// Profile.jsx
<Profile {...this.props} />
// UserCard.jsx
<UserCard {...this.props} />
// Details.jsx
<Details {...this.props} />
...
```

## EventBus跨组件通信

很多第三方库实现了时间发布订阅，如 `tiny-emitter`

可以借助EventBus完成全局状态共享：

- 在 App.jsx 中点击按钮 触发全局事件并携带payload
- 当 Player 组件挂载时 `componentDidMount` 添加play事件的监听
- 当 Player 组件卸载时 `componentWillUnmount` 移除play事件的监听
- 在 Player 组件中展示当前播放的音乐

```tsx
// App.jsx
import React, { Component } from 'react'
import Player from './components/Player'
import { emit } from './eventbus'

export default class App extends Component {
  play = () => {
    emit('play', { musicName: 'Hello, Music' })
  }

  render() {
    return (
      <>
        <Player></Player>
        <button onClick={this.play}>Play</button>
      </>
    )
  }
}

// Player.jsx
import React, { Component } from 'react'
import { on, off } from '../eventbus'

export default class Player extends Component {
  constructor() {
    super()
    this.state = {
      musicName: ''
    }
  }

  playMusic = ({ musicName }) => {
    console.log('Music Play: ' + musicName)
    this.setState({ musicName })
  }

  componentDidMount() {
    on('play', this.playMusic)
  }

  componentWillUnmount() {
    off('play', this.playMusic)
  }

  render() {
    return (
      <div>
        <h1>Player</h1>
        <p>Now Playing: {this.state.musicName}</p>
      </div>
    )
  }
}
```

## setState的使用详解

不同于Vue的自动追踪依赖，React是通过用户调用`setState`来获知状态的更新，所以开发者要更新状态不能直接`this.state.xxx = 'xxx'`，而必须通过`setState`方法。这样React在内部才能获知状态的更新，继而触发对视图的更新。

从React的源码可以看到，setState方法是从Component集继承而来的

![setState in source code of React](./React.assets/prototype-setState.png)

### setState的异步更新

当调用 `setState` 时，方法会使用 `Object.assign()` 方法将新旧state合并

也可以通过传入回调函数来更新state

```tsx
// 传入一个state对象 更新state
this.setState({
  count: this.state.count + 1
})

// 传入回调函数 返回值作为将与旧state合并
this.setState((state, props) => {
  return {
    count: state.count + 1
  }
})
```

传入回调函数来对state进行更新带来了一些好处：

- 可以在回调中写心得state的逻辑（代码内聚性更强）
- 回调函数会将之前的state和当前的props传递进来
- setState在React的事件处理中是被异步调用的

**如何获取异步更新的结果？**

setState的异步更新也带来了一些问题，如果我们希望能在state变化后立即做出一些处理，可以使用到setState的第二个入参:

第二个参数是一个回调函数，在回调函数中获取到的state为更新后的state最新值

`setState((oldState, props) => newState, () => ... )`

#### 为什么setState被设计为异步执行？

[Github: RFClarification: why is setState asynchronous?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

- 可以显著提升性能，出于性能优化考虑
    - 假设`setState`是同步执行的，假设在调用函数后开发者连续调用了三次`setState`
    - render函数会执行三次，创建三份不同的VDOM，执行三次Diff算法，三次更新到DOM上，带来重绘与重排...
  - 如果在同一时间段内多次修改了state，那么React会在一段时间内的多次修改合并到一起，统一修改
  - 这样，即使在同一时间多次触发`setState`，那么render函数也只会被调用一次
- 如果同步更新state，那么render函数中通过props传参的子组件不会被更新，会出现数据不同步的问题
  - 在setState后，可以立即获取到最新的state值，但是此时render函数并没有被执行

#### setState一定是异步的吗？（React18之前）

在React18之后，setState方法调用都为异步的（在生命周期中 或在方法中）

但是在React18之前，某些情况下是同步的：

```tsx
// 异步执行 执行setState后当前state并未改变
changeTitle = () => {
  this.setState({ title: 'Hello, React!' })
  console.log(this.state.title) // Hello, World!
}

// 同步执行
changeTitle = () => {
  setTimeout(() => {
    this.setState({ title: 'Hello, React!' })
    console.log(this.state.title) // Hello, React!
  }, 0)
}
```

- 这是因为setTimeout创建了一个宏任务，脱离了React内部的事件处理队列，不再受React的控制，从而达到了同步执行的效果
- 同样的，如果是通过DOM监听器触发的回调中执行setState，也会作为宏任务执行，脱离React的事件处理队列

在React18之后，即使是setTimeout中的回调也是异步执行的，所有的回调都将被放入React内部维护的队列中，批量更新

> New Feature: Automatic Batching 
> 
> Batching is when React groups multiple state updates into a single re-render for better performance. Without automatic batching, we only batched updates inside React event handlers. Updates inside of promises, setTimeout, native event handlers, or any other event were not batched in React by default. With automatic batching, these updates will be batched automatically:
> 
> [What’s New in React 18](https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching)

- 将多个状态更新会放到一次re-render中，为了更好的性能
- 只在React事件处理函数才会有批处理
- 之前：在promise/setTimeout/原生事件处理器以及其他的事件默认没有被批处理
- 现在：都会被做批量处理，收集state改变，统一更新

在React18之后，可以通过 `flushSync(() => { ... })` 让 `setState` 实现同步更新：

```tsx {2}
...
flushSync(() => {
  this.setState({
    message: 'Hello, React!'
  })

  this.setState({
    message: 'Hello, React18!'
  })
})

console.log(this.state.message) // Hello, React18
...
```

## React性能优化SCU

### React的更新机制

之前我们已经了解了React的渲染流程：JSX => 虚拟DOM => 真实DOM

React的更新流程：

- props/state改变
- render函数重新执行
- 产生新的虚拟DOM树
- diff新旧虚拟DOM树
- 计算出差异执行局部更新 更新真实DOM
- 获取到真实DOM

### 关于diff算法

- React需要基于两棵新旧虚拟DOM树来判断如何更高效地更新UI
- 如果一棵树参考另一棵树完全比较更新，那么即使是最先进的算法，时间复杂度为$O(n^2)$，其中$n$是树中节点的数量
- 如果React中使用了这样的算法，当节点数量提高，那计算量是巨大的，会造成巨量的性能开销，更新性能较差

针对普通diff算法的缺陷，React对其进行了优化，将其时间复杂度优化到了$O(n)$

- 同级节点之间互相比较，节点不会跨级比较
- 不同类型的节点产生不同的树结构
- 开发中可以通过绑定 `key` 来保证哪些节点在不同的渲染下保持稳定（跳过diff 尽可能复用节点 避免更新）

这意味着，如果根节点的类型发生变化，即使所有子节点都未发生变化，那整棵树也都将重新渲染，这也是一种取舍

### 关于key的优化

- 如果我们在渲染列表时没有绑定 `key` 属性，控制台会抛出警告提示
- key的优化也是分为不同场景的
  - 向列表末位插入数据
    - key的优化意义不大 插入新数据时前面数据不会发生改变
  - 向列表前插入数据
    - 该场景下应当传key 否则列表发生变化时所有列表都会发生re-render
- key必须为唯一的 唯一代表当前节点
- 不要使用随机数 这脱离了绑定key的初衷
- 使用index作为key时没有意义 对性能优化没有助益

### 引入shouldComponentUpdate

这里我们首先引入一个例子：在App组件中包含两个纯展示组件Home和Profile。

观察控制台输出，当页面第一次渲染时，所有组件的 `render` 函数都会被执行

但是当我们点击按钮，修改App中的`state.count`时，实际上只有`h1`标签的内容发生了变化

此时观察控制台，Home和Profile的render函数又都被执行了一次，这显然是不合理的，因为这两个组件的内容没有发生变化

```tsx
import React, { Component } from 'react'

export class Home extends Component {
  render() {
    console.log('Home render')
    return <h1>Home</h1>
  }
}

export class Profile extends Component {
  render() {
    console.log('Profile render')
    return <h1>Profile</h1>
  }
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }

  render() {
    console.log('App render')
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>+1</button>
        <Home />
        <Profile />
      </div>
    )
  }
}
```

这样的场景下，可以通过 `shouldComponentUpdate` 生命周期返回 `false` 来决定当前组件是否发生更新

判断两次state是否发生改变，只有改变时才触发re-render

```tsx
...
// nextProps: 修改后最新的Props
// nextState: 修改后最新的State
shouldComponentUpdate(nextProps, nextState) {
  // 只有两次不等时 才发生更新
  return this.state.count !== nextState.count
}
...
```

在组件内部也可以使用类似的优化手段，自行决定是否更新

需要注意的是，`shouldComponentUpdate` 只会进行浅层比较，如果比较的props或state是引用类型的数据，则不适合用这样的方式

### PureComponent

显然，如果每次都通过编写 `shouldComponentUpdate` (SCU) 来决定更新是很繁琐的，React为我们提供了更方便的用法：React.PureComponent

如果你正在编写类组件，那么你可以使用 PureComponent (纯组件) 包裹你的组件内容，它会来帮你完成跳过更新，它的本质和 `shouldComponentUpdate` 是一样的：相同输入导致相同输出，输入相同时不必重新渲染

使用PureComponent对之前Counter的例子进行修改：

当执行 `changeTitle` 修改父组件状态时，不会触发 Counter 的重新渲染，而只有在修改和 Counter 相关联的状态 count 时，其才会re-render

```tsx {4}
// Counter.jsx
import React, { PureComponent } from 'react'

export default class Counter extends PureComponent {
  render() {
    const { count, addCount, subCount } = this.props
    return (
      <div>
        <button onClick={subCount}>-</button>
        <span>{count}</span>
        <button onClick={addCount}>+</button>
      </div>
    )
  }
}

// App.jsx
import React, { Component } from 'react'
import Counter from './components/Counter'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      title: 'Hello, World!'
    }
  }

  changeTitle = () => {
    this.setState({
      title: new Date().getTime()
    })
  }

  ...

  render() {
    const { title, count } = this.state
    return (
      <div>
        <h2>{title}</h2>
        <button onClick={this.changeTitle}>Change Title</button>
        <Counter count={count} addCount={this.addCount} subCount={this.subCount}></Counter>
      </div>
    )
  }
}
```

### 函数式组件 memo

我们知道，函数式组件是没有生命周期的，要在函数式组件中使用类似的性能优化手段，可以使用 `memo` 这个API

```tsx {4}
// Recommand.jsx
import { memo } from 'react'

export default memo(function Recommand(props) {
  console.log('Recommand render')
  const { count } = props
  return (
    <div>
      <h2>Recommand</h2>
      <h3>count: {count}</h3>
    </div>
  )
})
```

### 不可变数据的力量

来自React官方文档，不可变数据指的是稳定的state和props

我们在这里举一个简单的书籍列表的例子：

我们首先向state中推入一条新数据，随后使用 `setState` 将当前的状态作为更新源，点击按钮后页面是可以正常更新的

```tsx {4,21-22}
// BookList.jsx
import React, { Component } from 'react'

export default class BookList extends Component {
  constructor() {
    super()
    this.state = {
      books: [
        { id: 1, name: 'book1', price: 10 },
        { id: 2, name: 'book2', price: 20 },
        { id: 3, name: 'book3', price: 30 },
        { id: 4, name: 'book4', price: 40 }
      ]
    }
  }

  addBook = () => {
    const newBook = { id: new Date().getDate(), name: 'book5', price: 50 }
    this.state.books.push(newBook)
    this.setState({ books: this.state.books })
  }

  render() {
    const { books } = this.state

    return (
      <div>
        <ul className="books">
          {books.map((book) => {
            return (
              <li className="book" key={book.id}>
                <span>{book.name}</span>
                <span>{book.price}</span>
              </li>
            )
          })}
        </ul>
        <button onClick={this.addBook}>add Book</button>
      </div>
    )
  }
}
```

然而，一旦如果我们将 `Component` 替换为 `PureComponent`

由于 `shouldComponentUpdate` 是**浅层比较**的

传入 `setState` 的更新源 `books` 的引用地址和 `this.state.books` 是相同的，**即使内部数据发生了添加，更新也会被跳过**

最好的方式就是，**保证每次传入 `setState` 的值都是新的**，保证组件能够被正常渲染更新

```tsx
...
this.setState({
  books: [
    ...this.state.books,
    { id: new Date().getDate(), name: 'book5', price: 50 }
  ]
})
...
```

这里的“不可变数据的力量”，指的就是保持state中数据稳定，如果我们希望修改state中的数据，则应当将state.xxx完整替换为一个新的对象

从源码层面，在源码内部React实现了一个方法 `checkShouldComponentUpdate`，如果组件内部定义了 `shouldComponentUpdate` 则会通过此方法进行检查

如果是 PureComponent，则会从组件原型上检查 `isPureReactComponent`，继而通过 shallowEqual 浅层比较判断 oldState & newState 是否相等

## 获取DOM的方式 refs

### 使用Ref获取到真实DOM

某些情况下我们需要直接操作DOM，在Vue中可以通过在template中绑定ref获取到DOM元素

- 方式1：在ReactElement上绑定ref属性 值为字符串 （已被废弃）
- 方式2：通过 `createRef` 创建一个ref并动态绑定到ReactElement上
- 方式3：给ref属性传入一个函数，当DOM被创建时将作为参数传递到函数中

```tsx
// method 1: bind string to ref attribute
import React, { PureComponent } from 'react'

export default class Input extends PureComponent {
  getNativeDOM = () => {
    console.log(this.refs.input) // <input type="text" />
  }

  render() {
    return (
      <div>
        <input ref="input" type="text" />
        <button onClick={this.getNativeDOM}>getNativeDOM</button>
      </div>
    )
  }
}
```

```tsx {7,10,16}
// method 2: dynamic bind Ref object to target Element's ref attribute
import React, { PureComponent, createRef } from 'react'

export default class Input extends PureComponent {
  constructor() {
    super()
    this.inputRef = createRef()
  }
  getNativeDOM = () => {
    console.log(this.inputRef.current) // <input type="text" />
  }

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" />
        <button onClick={this.getNativeDOM}>getNativeDOM</button>
      </div>
    )
  }
}
```

```tsx {8}
// method 3: bind a function to ref attribute of target element
import React, { PureComponent } from 'react'

export default class Input extends PureComponent {
  render() {
    return (
      <div>
        <input ref={(e) => console.log(e)} type="text" />
      </div>
    )
  }
}
```

### 获取组件实例

通过类似的方法，可以直接获取到组件实例，也可以直接调用组件实例上的方法

```tsx
import React, { PureComponent, createRef } from 'react'

class CustomInput extends PureComponent {
  foo = () => {
    console.log('CustomInput foo called')
  }

  render() {
    return <input type="text" />
  }
}

export default class Input extends PureComponent {
  constructor() {
    super()
    this.customInputRef = createRef()
  }

  getComponent = () => {
    this.customInputRef.current.foo()
  }

  render() {
    return (
      <div>
        <CustomInput ref={this.customInputRef} />
        <button onClick={this.getComponent}>getComponent</button>
      </div>
    )
  }
}
```

但是，函数式组件没有实例，更别提直接调用实例方法了。类似于Vue3中通过setup创建的组件，我们需要对函数式组件做额外处理，类似于`defineExpose`

这时就需要用到新的API：`forwardRef` 和 `useImperativeHandle`

- `forwardRef` 用于将ref属性传递给函数式组件
  - 父组件传递给子组件的ref属性，会被React自动传递给子组件的第二个参数，即 `forwardRef` 的第二个参数
- `useImperativeHandle` 用于将函数式组件内部的方法暴露给父组件

```tsx
import React, { PureComponent, createRef, forwardRef, useImperativeHandle } from 'react'

const CustomInput = forwardRef((props, ref) => {
  const foo = () => {
    console.log('CustomInput foo called')
  }

  useImperativeHandle(ref, () => ({
    foo
  }))

  return <input type="text" ref={ref} {...props} />
})
...
```

## 受控和非受控组件

在React中，HTML表单的处理方式和普通DOM元素不太一样：表单通常会保存在一些内部的state中，并且根据用户的输入进行更新

```tsx
// Input.jsx
import React, { PureComponent } from 'react'

export default class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleInputChange = (ev) => {
    console.log(ev.target.value) // 这里的Event对象是合成事件 SyntheticEvent 由React封装的
    this.setState({
      value: ev.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleInputChange} />
        <button onClick={this.getComponent}>getComponent</button>
      </div>
    )
  }
}
```

## React的高阶组件

React Hooks更优秀

## portals和fragment


## StrictMode 严格模式
