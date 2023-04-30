# React Hooks

- 认识和体验Hooks
- State/Effect
- Context/Reducer
- Callback/Memo
- Ref/LayoutEffect
- 自定义Hooks使用

## 认识React Hooks

Hooks 是 React16.8 推出的新特性

在没有Hooks时，类组件能够完成的大部分工作，函数式组件都无法胜任：

- 类组件可以定义并保存组件内部状态，并在状态发生改变时触发视图重新渲染
  - 函数式组件不行，每次调用函数其中的变量都会被重新初始化，重新渲染时整个函数都重新执行
- 类组件可以在其内部的生命周期回调中添加副作用
  - 例如`componentDidMount`在类组件生命周期只会执行一次
  - 函数式组件没有生命周期，如果在函数体内发起网络请求，那每次重新渲染都会发起请求

类组件存在的问题：

- 复杂组件变得难以理解
  - 业务代码相互耦合，类组件变得复杂
  - 逻辑强耦合在一起难以拆分，强行拆分会导致过度设计，进一步增加代码复杂度
- class关键字的理解
  - 初学React时class关键字理解存在困难
  - 处理`this`的指向问题需要花费额外的心智负担
- 组件状态复用
  - 要复用组件需要借助高阶组件
  - `redux` 中的 `connect` 或者 `react-router` 中的 `withRouter`，高阶组件的目的就是为了状态复
  - 或通过Provider、Consumer来共享状态，但是Comsumer嵌套问题较严重

Hooks带来的优势：

- 在不编写class的情况下使用state和其他React特性（如生命周期）
- Hooks 允许我们在函数式组件中使用状态，并在状态发生改变时让视图重新渲染
- 同时，我们还可以在函数式组件中使用生命周期回调
- 更多的优点 ...

## 计数器案例对比

分别使用Hooks和类组件编写一个计数器：

::: code-group
```tsx [CounterClass.jsx]
// CounterClass.jsx
import React, { PureComponent } from 'react'

export default class CounterClass extends PureComponent {
  constructor() {
    super()
    this.state = {
      count: 0
    }
  }
  setCount(num) {
    this.setState({
      count: num
    })
  }
  render() {
    const { count } = this.state
    return (
      <div>
        <div>CounterClass</div>
        <div>{count}</div>
        <button onClick={() => this.setCount(count + 1)}>+1</button>
        <button onClick={() => this.setCount(count - 1)}>-1</button>
      </div>
    )
  }
}
```
```tsx [CounterFunctional.jsx]
// CounterFunctional.jsx
import React, { useState } from 'react'

export default function CounterFunctional() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>CounterFunctional</div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  )
}
```
:::

### 解读useState

Hook本质上就是一个JavaScript函数，这个函数可以帮你钩入（Hook Into） React State以及其他的生命周期回调

- 只允许在函数顶层调用Hook，而不能再循环、条件判断或子函数中调用
- 只能在React的函数组件中调用Hook，不能在其他JavaScript函数中调用

- 从`react`导入`useState`
  - 参数 状态初始值 不设置则为`undefined`
  - 返回值是一个数组
    - 0位元素 **当前状态的值**，当函数第一次调用时为初始值
    - 1位元素 设置状态值的函数
  - 当点击button按钮后，会完成两件事情：
    - 调用`setCount`函数，将状态设置为新的值
    - 触发组件重新渲染（函数重新执行），使用新的state值渲染DOM

- 为什么叫`useState`而不叫`createState`？
  - create的含义不是很明确，因为state仅在组件首次渲染时被创建
  - 在下一次重新渲染时，useState返回给我们当前的state
  - 如果每次都创建新的变量，那它就不是state了
  - 这也是Hook的名字总是以“use”开头的原因

## useEffect

`useEffect`这个Hook可以帮我们处理一些副作用，**每次组件渲染完成后**，React会自动帮我们调用这些副作用

- 网络请求/手动更新DOM/事件监听
- 完成上述这些功能的Hook被称为 Effect Hook

- 通过`useEffect`，可以告诉React需要在组件渲染完成后执行哪些副作用
- 这里的*组件重新渲染*，指的是组件对应的**DOM更新完毕后**，回调这些副作用函数
- 默认情况下，无论是第一次渲染之后，还是每次更新之后，都会执行这个副作用函数

以下面的代码为例，我们希望每次对状态`title`进行修改后，都能反映到当前页面的标题上

如果我们将`document.title = title`放到函数顶层执行，那么

```tsx
// TitleChanger.jsx
import React, { useEffect, useState } from 'react'

export default function TitleChanger() {
  const [title, setTitle] = useState('Title')

  useEffect(() => {
    document.title = title
  })

  return (
    <div>
      <div>Title: {title}</div>
      <button onClick={() => setTitle(new Date().getTime())}>Change Title</button>
    </div>
  )
}
```

### 清理副作用

使用useEffect可以帮我们在组件执行重新渲染后添加额外的副作用，那怎样清理这些副作用呢？

- 例如，我们使用`useEffect`添加了事件监听回调的副作用
- 当组件被卸载时，需要对事件监听回调执行清理
- `addEventListener <=> removeEventListener`

传入useEffect的函数的返回值是一个函数，组件被重新渲染或组件被卸载时，React会调用这个函数

我们可以借助这个功能来完成清理副作用的操作

下面的案例展示了一个输入框，当焦点处于输入框时，按下ESC键时会对输入框进行清空并使其失焦：

```tsx
// KeydownListener.jsx
import React, { useEffect } from 'react'

export default function KeydownListener() {
  const handleKeydown = (e) => {
    if (e.key === 'Escape') {
      e.target.value = ''
      e.target.blur()
      console.log('Escape Pressed')
    }
  }

  useEffect(() => {
    const input = document.querySelector('input')
    input.addEventListener('keydown', handleKeydown)
    console.log('Effect Ran')

    return () => {
      input.removeEventListener('keydown', handleKeydown)
      console.log('Effect Cleaned Up')
    }
  })

  return (
    <div>
      <div>document</div>
      <input type="text" />
    </div>
  )
}
```

为什么要在effect中返回一个函数？

- 这时effect可选的清除机制，每个effect都可以返回一个清除函数
- 如此可以将添加和移除订阅的逻辑放在一起
- 它们都属于effect的一部分

如果我们有较为复杂的逻辑，我们也可以在同一个组件中使用多个useEffect，并分别在不同的回调函数中返回清理副作用函数

### Effect性能优化

同时，我们也会发现一些问题，尽管我们保证了监听回调是时刻唯一、不会冗余的

但是组件每次重新渲染都会：先删除原来事件监听回调，再添加新的监听回调，这造成了额外的性能浪费

我们可以对此进行额外的优化

- `useEffect`实际上有两个参数
  - 参数一：函数，组件重新渲染时执行的回调函数
  - 参数二：数组，回调函数在那些state发生变化时，才重新执行

默认情况下，如果不传第二个参数，没有指定更新依赖项，则只要组件重新渲染，Effect都会重新执行

如果我们为第二个参数传递一个空数组，则证明：此Effect没有依赖state，仅在首次渲染时被回调

```tsx {12}
// KeydownListener.jsx
...
  useEffect(() => {
    const input = document.querySelector('input')
    input.addEventListener('keydown', handleKeydown)
    console.log('Effect Ran')

    return () => {
      input.removeEventListener('keydown', handleKeydown)
      console.log('Effect Cleaned Up')
    }
  }, [])
...
```

## useContext

在之前的开发中，要在组件中使用共享的Context有两种方式

- 类组件可以通过`ClassName.contextType = SomeContext`绑定上下文
- 在类的函数中通过`this.context.xxx`获取上下文中共享的状态
- 同时有多个Context时/函数式组件中，通过`SomeContext.Consumer`的方式共享上下文状态

其中最大的问题就是：多个Context在同时使用时会引入大量的嵌套，而`useContext`可以帮我们解决这个问题

通过`useContext`可以直接获取到某个上下文中共享的状态变量

::: code-group
```tsx [Profile.jsx]
// Profile.jsx
import React, { useContext } from 'react'
import { UserContext, ThemeContext } from '../context'

export default function Profile() {
  const userContext = useContext(UserContext)
  const themeContext = useContext(ThemeContext)
  return (
    <div>
      <div>Profile</div>
      <div>userName: {userContext.userName}</div>
      <div>age: {userContext.age}</div>
      <div>theme: {themeContext.theme}</div>
    </div>
  )
}
```
```tsx [index.js]
// context/index.js
import { createContext } from 'react'

export const UserContext = createContext({
  userName: '',
  userAge: 0
})

export const ThemeContext = createContext({
  theme: 'light'
})
```
```tsx [App.jsx]
// App.jsx
import React from 'react'
import { UserContext, ThemeContext } from './context'
import Profile from './components/Profile'

export default function App() {
  return (
    <div>
      <UserContext.Provider value={{ userName: 'Ziu', age: 18 }}>
        <ThemeContext.Provider value={{ theme: 'dark' }}>
          <Profile />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}
```
:::

当组件上层最近的`SomeContext.Provider`提供的值发生更新时，`useContext`会使用上下文中最新的数据触发组件的重新渲染

## useReducer

`useReducer`并不是Redux的替代品

- `useReducer`是`useState`在某些场景下的替代方案
- 如果state需要处理的**数据较为复杂**，我们可以通过`useReducer`对其进行拆分
- 或者需要修改的state需要依赖之前的state时，也可以使用`useReducer`

下面举一个例子：用户信息包含多个复杂的字段，当用户执行操作后需要同时对多个字段进行修改

我们分别用`useState`和`useReducer`来实现：

::: code-group
```tsx [UserInfoWithReducer.jsx]
// UserInfoWithReducer.jsx
import React, { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'addAge':
      return {
        ...state,
        age: state.age + 1
      }
    case 'pushLikes':
      return {
        ...state,
        likes: [...state.likes, action.payload]
      }
    case 'modifyName':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}

export default function UserInfoWithReducer() {
  const [userInfo, dispatch] = useReducer(reducer, {
    id: 1,
    name: 'Ziu',
    age: 18,
    likes: [
      { id: 5, name: 'Why', age: 19 },
      { id: 8, name: 'ZIU', age: 20 }
    ]
  })

  const addAge = () => dispatch({ type: 'addAge' })
  const pushLikes = (user) => dispatch({ type: 'pushLikes', payload: user })
  const modifyName = (name) => dispatch({ type: 'modifyName', payload: name })

  return (
    <div>
      <div>UserInfoWithReducer</div>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={addAge}>Add Age</button>
      <button onClick={() => pushLikes({ id: 10, name: 'ZiuChen', age: 21 })}>Push Likes</button>
      <button onClick={() => modifyName('ZiuChen')}>Modify Name</button>
    </div>
  )
}
```
```tsx [UserInfo.jsx]
// UserInfo.jsx
import React, { useState } from 'react'

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({
    id: 1,
    name: 'Ziu',
    age: 18,
    likes: [
      { id: 5, name: 'Why', age: 19 },
      { id: 8, name: 'ZIU', age: 20 }
    ]
  })

  const addAge = () =>
    setUserInfo({
      ...userInfo,
      age: userInfo.age + 1
    })

  const pushLikes = (user) =>
    setUserInfo({
      ...userInfo,
      likes: [...userInfo.likes, user]
    })

  const modifyName = (name) =>
    setUserInfo({
      ...userInfo,
      name
    })

  return (
    <div>
      <div>UserInfo</div>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={() => addAge()}>Add Age</button>
      <button onClick={() => pushLikes({ id: 10, name: 'ZiuChen', age: 21 })}>Push Likes</button>
      <button onClick={() => modifyName('ZiuChen')}>Modify Name</button>
    </div>
  )
}
```
:::

从代码中可以看出差距：对于复杂的更新状态逻辑，使用`useReducer`可以将他们聚合在一起，通过统一的出口对状态进行更新，而不像`useState`方案中需要频繁调用暴露在外部的`setUserInfo`状态更新接口

当然，对于复杂数据的处理，也可以将其放到Redux这类的状态管理中，如果没有Redux，那么`useReducer`可以在一定程度上扮演Redux的角色，但是本质还是`useState`的替代方案

## useCallback和useMemo

这两个Hook都是用于性能优化

### useCallback

我们以计数器案例来对`useCallback`进行说明：

```tsx
// Counter.jsx
import React, { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }

  return (
    <div>
      <div>Counter</div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
    </div>
  )
}
```

当我们每次点击`+1`的button时，整个函数都会被重新执行一次，但是`increment`也会被重复定义，虽然上一次组件渲染快照中的`increment`函数由于引用次数为0，会被GC机制回收，但是函数的重复定义对性能也存在消耗

但是`useCallback`的使用常常存在一个误区：使用`useCallback`可以减少函数重复定义，以此来进行性能优化

```tsx
// Counter.jsx
import React, { useState, useCallback } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  // var1 = useCallback(fn1)
  // var2 = useCallback(fn2)
  // var1 === var2 === fn0
  const increment = useCallback(function () {
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <div>Counter</div>
      <div>{count}</div>
      <button onClick={increment}>+1</button>
    </div>
  )
}
```

本质上，传递给`useCallback`的参数时一个函数，这个函数在每次重新渲染时也会被重新定义，所以`useCallback`并没有解决函数重新定义的问题，它只是保证了组件每次访问`increment`时，访问到的都是同一个函数引用

- `useCallback`会返回一个函数的memoized值
- 在依赖不变的情况下，多次定义时，返回的值是完全相同的

在使用`useCallback`时，我们同样可以为其传入一个依赖数组，仅当依赖数组中的state值发生变化时，`useCallback`才会返回一个新的函数

当我们为其传入一个空的依赖数组时，这里涉及到一个概念：闭包陷阱

```tsx {5}
// Counter.jsx
...
  const increment = useCallback(function () {
    setCount(count + 1)
  }, [])
...
```

即使我们多次点击+1的按钮，状态count也不会发生变化，这是因为依赖数组为空时，`useCallback`每次返回的都是第一次定义时的函数，而那个函数的`count`值始终为0，那么每次`setCount`得到的值都为1

> 闭包陷阱：函数在定义时，从上层作用域捕获变量，并保存在闭包中。
> 
> 后续即使重复定义新的函数，其取到的值仍然是闭包内部保存的变量的值，而这个值是始终没有发生改变的

这里我们使用普通函数模拟了一下这个场景

```js
function foo() {
  let count = 0
  function bar() {
    console.log(count + 1)
  }
  return bar
}

const bar1 = foo()

bar1() // 1
bar1() // 1
```

不论调用了多少次`bar1`，其内部取到的值都始终是最初的那个`count`，自然值也不会发生变化

所以，我们需要显式地为`useCallback`指定依赖state，这样才能让函数准确的使用到最新的状态

### 真实的useCallback使用场景

经过之前的说明，目前`useCallback`看起来并没有实际的用途，它没有减少函数的定义次数，甚至在不合理使用时还会出现闭包陷阱，而带来的唯一好处就是：保证函数指向确定且唯一

下面我们举一个实际场景来说明`useCallback`的用途：

