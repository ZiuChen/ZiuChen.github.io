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

## useCallback

`useCallback`和`useMemo`这两个Hook都是用于性能优化，用于减少组件re-render次数，提高性能：**Returns a memoized callback**

首先我们以计数器案例来对`useCallback`进行说明：

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

所以，我们需要显式地为`useCallback`指定依赖state，这样才能准确地使用最新的状态定义新的函数

### 真实的useCallback使用场景

经过之前的说明，目前`useCallback`看起来并没有实际的用途，它没有减少函数的定义次数，甚至在不合理使用时还会出现闭包陷阱，而带来的唯一好处就是：**当状态没有发生改变时，保证函数指向确定且唯一**

下面我们举一个实际场景来说明`useCallback`的用途：

一个嵌套计数器的例子，外部计数器可以展示/改变计数器的值，子组件也可以通过调用props传递来的函数来改变计数器的值，同时外部计数器还包含了其他的状态在动态被修改

::: code-group
```tsx [InnerCounter.jsx]
// InnerCounter.jsx
import React, { memo } from 'react'

export default memo(function InnerCounter(props) {
  const { increment } = props

  console.log('InnerCounter Re-render')

  return (
    <div>
      <div>InnerCounter</div>
      <button onClick={increment}>Inner +1</button>
    </div>
  )
})
```
```tsx [Counter.jsx]
// Counter.jsx
import React, { memo, useState, useCallback } from 'react'
import InnerCounter from './InnerCounter'

export default memo(function Counter() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')

  const increment = useCallback(
    function () {
      setCount(count + 1)
    },
    [count]
  )

  return (
    <div>
      <div>Counter</div>
      <div>{count}</div>
      <div>{msg}</div>
      <button onClick={increment}>+1</button>
      <button onClick={() => setMsg(Math.random())}>setMsg</button>
      <InnerCounter increment={increment} />
    </div>
  )
})
```
:::

当我们将函数作为props传递给子组件时，如果函数地址发生改变，那么子组件也会发生re-render

而这时`useCallback`就可以保证：当依赖不变时，返回的始终是同一个函数，保证函数地址唯一

这时，搭配`memo`，当组件的props不变时，组件不会触发re-render（正常情况下，如果未使用`memo`，只要父组件re-render，那么所有子组件，无论其依赖的props是否发生变化，都会触发re-render）

::: tip
`React.memo` 为高阶组件。它与 `React.PureComponent` 非常相似，但它适用于函数组件，但不适用于 class 组件。

如果你的函数组件在给定相同 `props` 的情况下渲染相同的结果，那么你可以通过将其包装在 `React.memo` 中调用，以此通过记忆组件渲染结果的方式来提高组件的性能表现。这意味着在这种情况下，React 将跳过渲染组件的操作并直接复用最近一次渲染的结果。

默认情况下其只会对复杂对象做浅层对比，如果你想要控制对比过程，那么请将自定义的比较函数通过第二个参数传入来实现。
:::

这里的`memo`就类似于类组件中的`PureComponent`，是极力推荐用来完成基础的性能优化的，用来替代默认的编写组件的方式

总结一下`useCallback`是如何进行性能优化的：

- 需要将一个函数传递给子组件时，使用`useCallback`包裹，并显式指定其依赖
- 将经过`useCallback`处理后的返回的函数传递给子组件
- 这样，当依赖state未发生改变时，就可以保证子组件获得的props是一致的
- 搭配`React,memo`，可以避免子组件不必要的re-render

### 进一步优化useCallback

在之前的代码中，虽然我们对无关状态变量`msg`做更新时，不会再触发InnerCounter的重新渲染了，但是每次`count`的值发生更新时，子组件每次仍然会重新渲染

而在这个案例中，子组件InnerCounter只是需要对count值做更新，而不需要展示count值，这个re-render是不必要的

这里可以使用`useRef`进行进一步的优化：

```tsx {9,10,12}
// Counter.jsx
import React, { memo, useState, useCallback, useRef } from 'react'
import InnerCounter from './InnerCounter'

export default memo(function Counter() {
  const [count, setCount] = useState(0)
  const [msg, setMsg] = useState('')

  const countRef = useRef()
  countRef.current = count
  const increment = useCallback(function () {
    setCount(countRef.current + 1)
  }, [])

  return (
    <div>
      <div>Counter</div>
      <div>{count}</div>
      <div>{msg}</div>
      <button onClick={increment}>+1</button>
      <button onClick={() => setMsg(Math.random())}>setMsg</button>
      <InnerCounter increment={increment} />
    </div>
  )
})
```

我们首先清空`useCallback`的依赖数组，保证其返回的函数地址始终是唯一确定的

然而这会进入闭包陷阱，导致函数从闭包状态变量取值时取到的始终是第一次调用时变量保存的值

这时就可以通过`useRef`引入一个对象，在函数中通过引用地址与原始变量count建立联系，每次函数执行，需要取`count`值时，都首先取到引用对象`countRef`的地址，随后从其`current`属性中取值

而`countRef.current`的值也会同步`setCount`的调用，跟随原始`count`值发生变化

这就保证了状态变量的值能够跟随外部变化，并且闭包内取到的值始终是最新的状态值

> [useCallback](https://legacy.reactjs.org/docs/hooks-reference.html#usecallback) Pass an inline callback and an array of dependencies. useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate).

## useMemo

`useMemo`类似于`useCallback`，传入一个函数和一个依赖数组，只不过它缓存的不是函数地址，而是函数返回的计算结果：**Returns a memoized value**

**当依赖数组的state未发生改变时，会跳过计算，直接返回之前的结果**

这里还是使用计数器的案例，只不过在案例中我们额外计算了`[0, count]`值的和，展示在页面上：

```tsx
// CounterAccumulate.jsx
import React, { memo, useState, useMemo } from 'react'

/**
 * calc [0, num] accumulate value
 */
function calcTotal(num) {
  console.log('calcTotal')

  let total = 0
  for (let i = 0; i <= num; i++) {
    total += i
  }
  return total
}

const CounterAccumulate = memo(() => {
  const [count, setCount] = useState(0)
  const total = useMemo(() => calcTotal(count), [count])
  // const total = calcTotal(count)

  return (
    <div>
      <div>CounterAccumulate</div>
      <div>count: {count}</div>
      <div>total: {total}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
})

export default CounterAccumulate
```

由于我们将`count`指定为了依赖，所以每次count变化都会重新计算`total`的值

如果我们引入无关状态变量，那么使用`useMemo`即可跳过无关变量发生变化时函数的重新计算，提高性能

```tsx {5,15}
// CounterAccumulate.jsx
...
const CounterAccumulate = memo(() => {
  const [count, setCount] = useState(0)
  const [_, setMsg] = useState('')
  const total = useMemo(() => calcTotal(count), [count])
  // const total = calcTotal(count)

  return (
    <div>
      <div>CounterAccumulate</div>
      <div>count: {count}</div>
      <div>total: {total}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setMsg(Math.random())}>setMsg</button>
    </div>
  )
})
...
```

这时优化场景一，可以减少不必要的重新计算次数

此外，`useMemo`还有一个重要的适用场景，当我们将一个对象作为props传递给子组件时

由于每次父组件重新渲染，都会重新定义一个新的对象，这也就相当于子组件的props在不断发生变化，即使对象中的值并没有发生变化，也会触发子组件的重新渲染

我们就可以通过传入一个空的依赖数组，用`useMemo`来保持对象值的稳定：

```tsx
const info = { name: 'Ziu', age: 18 }
const info = useMemo(() => ({ name: 'Ziu', age: 18 }), [])
...
  <InnerCpn info={info} />
...
```

总结一下`useMemo`的适用场景：

- 进行大量的计算操作时，是否有必要每次渲染时都重新计算
- 对子组件传递相同内容的**对象**时，使用`useMemo`进行性能的优化

## useRef

我们之前在`useCallback`中已经简单使用过`useRef`了

`useRef`返回一个Ref对象，返回的Ref对象在整个生命周期保持不变

最常用的ref有两种用法：

- 引入DOM元素（或者组件，但需要是类组件）
- 保存一个数据，每次从Ref对象中获取最新的数据，但Ref对象在整个生命周期可以保持不变

用法一类似于之前类组件中的`createRef`，可以获取到组件内某个元素的DOM节点

但是在函数式组件中，我们用`useRef`来实现这个操作

在下面的案例中，可以通过点击按钮获取到input标签的DOM元素，并执行聚焦：

```tsx
// Input.jsx
import React, { memo, useRef } from 'react'

const Input = memo(() => {
  const inputRef = useRef(null)

  function focus() {
    const input = inputRef.current
    input.focus()
  }

  return (
    <div>
      <div>Input</div>
      <input ref={inputRef} type="text" />
      <button onClick={focus}>Focus Input</button>
    </div>
  )
})

export default Input
```

针对场景二，我们下面通过一个例子进行简单的验证，验证组件重新渲染后，两次创建的Ref对象是否为同一个对象：

```tsx
// TestRef.jsx
import React, { memo, useState, useRef } from 'react'

let tmp = null

const TestRef = memo(() => {
  const [, setCount] = useState(0)
  const infoRef = useRef({ name: 'Ziu' })

  console.log(tmp === infoRef)

  tmp = infoRef

  return (
    <div>
      <div>TestRef</div>
      <button onClick={() => setCount(Math.random())}>Re-render</button>
    </div>
  )
})

export default TestRef
```

可以看到，组件第一次渲染时输出`false`，其后每次手动触发重新渲染后，控制台都输出`true`，证明每次重新渲染时`useRef`返回的都是同一个对象

## useImperativeHandle

> `useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 `ref` 这样的命令式代码。

举一个例子来说明这个Hook有什么作用：

如果父组件希望获取到子组件DOM元素的的Ref对象，并且对子组件进行一系列的操作，我们可以用`useRef`搭配`forwardRef`来实现：

```tsx
// Banner.jsx
import React, { memo, useRef, forwardRef } from 'react'

const CustomInput = memo(
  forwardRef((props, ref) => {
    return <input type="text" ref={ref} />
  })
)

const Banner = memo(() => {
  const customInputRef = useRef(null)

  function getDOM() {
    customInputRef.current.focus()
    customInputRef.current.value = ''
  }

  return (
    <div>
      <div>Banner</div>
      <CustomInput ref={customInputRef} />
      <button onClick={getDOM}>getDOM</button>
    </div>
  )
})

export default Banner
```

父组件可以获取到通过`forwardRef`的完整子组件的DOM元素，因而可以进行一些“侵入性”的操作

可以完全操作DOM元素而不需要关心子组件的状态，这样大的权利有时候可能会对组件封装不利

这时我们就可以使用`useImperativeHandle`来限制子组件向外暴露的接口，而不是完整暴露整个DOM节点

```tsx
// Banner.jsx
import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react'

const CustomInput = memo(
  forwardRef((props, ref) => {
    const inputRef = useRef(null)

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current.focus(),
      resetValue: () => (inputRef.current.value = '')
    }))

    return <input type="text" ref={inputRef} />
  })
)

const Banner = memo(() => {
  const customInputRef = useRef(null)

  function getDOM() {
    customInputRef.current.focus()
    customInputRef.current.value = '' // 不再生效
    customInputRef.current.resetValue() // 依然生效
  }

  return (
    <div>
      <div>Banner</div>
      <CustomInput ref={customInputRef} />
      <button onClick={getDOM}>getDOM</button>
    </div>
  )
})

export default Banner
```

在子组件中，我们使用`useRef`在组件内绑定Ref对象，再通过`useImperativeHandle`暴露需要转发的Ref对象，后续父组件通过ref获取到的Ref对象，就是限制能力之后的、子组件转发出来的Ref对象，而不再是之前完整的DOM节点

- 通过`useImperativeHandle`这个Hook，将传入的`ref`和`useImperative`的第二个参数返回的对象绑定到了一起
- 在父组件中，使用`inputRef.current`时，获取到的实际上是返回的对象

除了对原有的DOM能力进行限制，`useImperativeHandle`还可以实现逻辑的API组合，比如我们将一系列复杂的DOM操作放入一个函数中暴露出去，这样父组件就可以调用一个接口实现一系列的操作

## useLayoutEffect

实际使用到的场景较少，官方也不推荐使用

- `useEffect` 会在渲染的内容更新到真实DOM之后执行，不会阻塞DOM的更新
- `useLayoutEffect` 会在渲染的内容更新到真实DOM之前执行，**会阻塞DOM的更新**

当一个组件要重新渲染时，首先生成虚拟DOM，当完成虚拟DOM的diff之后，要将需要更新的DOM反映到真实DOM树上，在对真实DOM树做修改之前，会触发`useLayoutEffect`的回调

![useLayoutEffect](./React%20Hooks.assets/useLayoutEffect.svg)

```tsx
// TestLayoutEffect.jsx
import React, { memo, useState, useEffect, useLayoutEffect } from 'react'

const TestLayoutEffect = memo(() => {
  const [, setCount] = useState(0)

  useEffect(() => {
    console.log('useEffect')
  })

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  })

  console.log('Rerender')
  return (
    <div>
      <div>TestLayoutEffect</div>
      <button onClick={() => setCount(Math.random())}>Rerender</button>
    </div>
  )
})

export default TestLayoutEffect
```

上面的案例中，每次点击按钮更新state状态变量时，控制台输出优先级为：

`Rerender => useEffect => useLayoutEffect`

## 自定义Hook

可以将需要经常复用的逻辑进行抽取，变成自定义Hook

### 案例一：共享Context

某个组件需要使用到哪些Context，就需要将它们导入后使用`useContext`

```ts
import { useContext } from 'react'
import { UserContext, ThemeContext } from '@/context'

...
const user = useContext(UserContext)
const theme = useContext(ThemeContext)

console.log(user.name, theme.primaryColor) // ...
...
```

我们可以使用自定义Hook来简化这一操作，将所有的Context统一导入并转化为对象，直接在组件中使用

对之前的Profile组件使用Hook进行增强：

::: code-group
```ts [useSharedContext.js]
// useSharedContext.js
import { useContext } from 'react'
import { UserContext, ThemeContext } from '../context'

export function useSharedContext() {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)

  return { user, theme }
}
```
```ts [Profile.js]
// Profile.js
import React from 'react'
import { useSharedContext } from '../hooks'

export default function Profile() {
  const context = useSharedContext()

  return (
    <div>
      <div>Profile</div>
      <div>userName: {context.user.userName}</div>
      <div>age: {context.user.age}</div>
      <div>theme: {context.theme.theme}</div>
    </div>
  )
}
```
:::

### 案例二：获取滚动位置

::: code-group
```tsx [useScrollPosition.js]
// useScrollPosition.js
import { useState, useEffect } from 'react'

export function useScrollPosition(options = {}) {
  const [offset, setOffset] = useState(0)

  const handleScroll = () => {
    setOffset(window.pageYOffset)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, options)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return [offset]
}
```
```tsx [GiantList.jsx]
// GiantList.jsx
import React, { memo } from 'react'
import { useScrollPosition } from '../hooks'

const GiantList = memo(() => {
  const list = new Array(100).fill(0).map((_, i) => i)
  const [offset] = useScrollPosition()

  return (
    <div>
      <div>GiantList</div>
      <div>offset: {offset}</div>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
})

export default GiantList
```
:::

### 案例三：封装localStorage

在使用状态变量的时候，为状态变量值的更新添加副作用，将变量名作为key，值更新到localStorage中

::: code-group
```tsx [useLocalStorage.js]
// useLocalStorage.js
import { useState, useEffect } from 'react'

export function useLocalStorage(key) {
  const [value, setValue] = useState(() => {
    const data = window.localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  })

  useEffect(() => {
    const data = JSON.stringify(value)
    window.localStorage.setItem(key, data)
  }, [key, value])

  return [value, setValue]
}
```
```tsx [UserInfoStorage.jsx]
// UserInfoStorage.jsx
import React, { memo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const UserInfoStorage = memo(() => {
  const [token, setToken] = useLocalStorage('token')

  function handleInputChange(e) {
    setToken(e.target.value || '')
  }

  return (
    <div>
      <div>UserInfoStorage</div>
      <div>token: {token}</div>
      <input type="text" onChange={(e) => handleInputChange(e)} />
    </div>
  )
})

export default UserInfoStorage
```
:::

这里的`useState`还展示了一个额外的用法，向`useState`传递一个函数，函数的返回值会作为状态变量的初始值

## Redux Hooks

之前的Redux开发中，为了让组件和Redux建立联系，我们使用了react-redux中的connect

- 必须与高阶函数结合，必须使用返回的高阶组件
- 必须编写`mapStateToProps` `mapDispatchToProps`，将上下文状态映射到props中

从Redux7.1开始，支持Hook写法，不再需要编写connect以及映射函数了

### useSelector

将state映射到组件中

- 参数一：将state映射到需要的数据中
- 参数二：可以进行比较，来决定组件是否重新渲染

默认情况下`useSelector`监听整个state的变化，只要state中有状态变量发生变化，无论当前组件是否使用到了这个状态变量，都会触发组件的重新渲染。这就需要我们显式地为其指定重新渲染的判断条件

> `useSelector`会比较我们返回的两个对象是否相等：
> 
> ```ts
> const refEquality = (a, b) => (a === b);
> ```
> 只有两个对象全等时，才可以不触发重新渲染

### useDispatch

直接获取`dispatch`函数，之后在组件中直接调用即可

另外，我们还可以通过`useStore`来获取当前的store对象

拿之前Redux的计数器举例，使用`useSelector`与`useDispatch`进行重构：

::: code-group
```tsx [[Now] Counter.jsx]
// [Now] Counter.jsx
import { memo } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { addCount, subCount } from '../store/features/counter'

const Counter = memo(() => {
  const count = useSelector((state) => state.counter.count, shallowEqual)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch(addCount(1))}>+1</button>
      <button onClick={() => dispatch(subCount(1))}>-1</button>
    </div>
  )
})

export default Counter
```
```tsx [[Prev] Counter.jsx]
// [Prev] Counter.jsx
import { connect } from '../hoc'
import { addCount, subCount } from '../store/features/counter'

const mapStateToProps = (state) => ({
  count: state.counter.count
})

const mapDispatchToProps = (dispatch) => ({
  addCount: (num) => dispatch(addCount(num)),
  subCount: (num) => dispatch(subCount(num))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(() => {
  return (
    <div>
      <h2>Count: {this.props.count}</h2>
      <button onClick={() => this.props.addCount(1)}>+1</button>
      <button onClick={() => this.props.subCount(1)}>-1</button>
    </div>
  )
})
```
:::

`react-redux`为我们提供了`shallowEqual`函数，用来比较两次映射出来的对象是否相同。

使用时我们直接导入并传递给`useSelector`的第二个参数即可

## React 18 新Hooks

### useId

用于生成横跨服务端和客户端的唯一稳定ID，同时避免hydration不匹配

本质上是找到当前组件在组件树中的深度与层级，保证生成的值的一致性

#### SSR

同构应用

- 一套代码，既可以在服务端运行，又可以在客户端运行，这就是同构应用
- 同构是一种SSR的形态，是现代SSR的一种表现形式
  - 当用户发出请求时，先在服务器通过SSR渲染出首页的内容
  - 但是对应的代码同样可以在客户端被执行
  - 执行的目的包括：绑定事件等，同时切换页面时，也可以在客户端被渲染

Hydration

> When doing SSR our pages are rendered to HTML. But HTML alone is not sufficient to make a page interactive. For example, a page with zero browser-side JavaScript cannot be interactive (there are no JavaScript event handlers to react to user actions such as click on a button.)
>
> To make our page interactive, in addition to render our page to HTML in Node.js, our UI framework (Vue/React/...) also loads and renders the page in the browser. (It creates an internal representation of the page, and then maps the internal representation to the DOM elements of the HTML we rendered in Node.js)
>
> This process is called *hydration*. Informally speaking: it makes our page interactive/alive/hydrated.

在进行SSR时，我们的页面会呈现为HTML

但仅仅HTML不足以使页面具有可交互性。例如：浏览器侧的JavaScript为零的页面是无法交互的，没有JavaScript事件处理程序来响应用户操作，例如单击按钮

为了使我们的页面具有交互性，除了在Node.js中将页面呈现为HTML，我们的UI框架还在浏览器中加载和呈现页面（它创建页面的内部表示，然后将内部表示映射到我们在Node.js中呈现的HTML的DOM元素）

这里用一张图简单介绍一下SSR的流程：

![SSR](./React%20Hooks.assets/SSR.svg)

### useTransition

并不是做CSS动画的，而是用来完成过渡任务的

返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数

可以允许我们给React一些提示：某些任务的更新优先级较低，可以稍后再进行更新

举一个例子：用输入框内的文本实时筛选万级数据的大列表，我们改造一下之前的GiantList案例：

```tsx
// GiantList.jsx
import React, { memo, useState } from 'react'

const list = new Array(10000).fill(0).map((_, i) => i)

const GiantList = memo(() => {
  const [showList, setShowList] = useState(list)
  const [, setKeyword] = useState('')

  function handleKeywordChange(e) {
    const { value } = e.target
    setKeyword(value || '')
    value
      ? setShowList(list.filter((item) => item.toString().includes(value)))
      : setShowList(list)
  }

  return (
    <div>
      <div>GiantList</div>
      <input type="text" onChange={(e) => handleKeywordChange(e)} />
      <ul>
        {showList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
})

export default GiantList
```

用户在向文本框内输入数据时，能够感受到明显卡顿：明明已经按下了键盘，但是输入框内却还没有文本

这是因为文本框内的state更新与巨型列表的更新是同步的，二者的变化会同时反映到页面上

文本框内的state更新应该优先于筛选列表的展示，无论如何都应该先更新文本框，来获得更好的用户体验

这时就可以引入`useTransition`，将巨型列表的更新延后，变成一个“过渡任务”

```tsx {9,15-19,26}
// GiantList.jsx
import React, { memo, useState, useTransition } from 'react'

const list = new Array(10000).fill(0).map((_, i) => i)

const GiantList = memo(() => {
  const [showList, setShowList] = useState(list)
  const [, setKeyword] = useState('')
  const [pending, startTransition] = useTransition()

  function handleKeywordChange(e) {
    const { value } = e.target
    setKeyword(value || '')

    startTransition(() => {
      value
        ? setShowList(list.filter((item) => item.toString().includes(value)))
        : setShowList(list)
    })
  }

  return (
    <div>
      <div>GiantList</div>
      <input type="text" onChange={(e) => handleKeywordChange(e)} />
      <div>{pending ? 'Loading...' : ''}</div>
      <ul>
        {showList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
})

export default GiantList
```

将需要延迟更新的操作放入`startTransition`后，可以明显地发现，输入框内的文本先被更新展示到了页面上，而巨型列表的更新则会在自己的筛选操作完成后，展示到页面上

这里还利用`pending`做了一下加载中的状态提示

### useDeferredValue

`useDeferredValue`接收一个值，并返回该值的新副本，该副本将推迟到更紧急的更新之后

本质上与`useTransition`是相同的目的：为了让DOM更新延迟进行

我们沿用之前的例子来说明它的用法

```tsx {9,14-16,24}
// GiantList.jsx
import React, { memo, useState, useDeferredValue } from 'react'

const list = new Array(10000).fill(0).map((_, i) => i)

const GiantList = memo(() => {
  const [showList, setShowList] = useState(list)
  const [, setKeyword] = useState('')
  const deferredShowList = useDeferredValue(showList)

  function handleKeywordChange(e) {
    const { value } = e.target
    setKeyword(value || '')
    value
      ? setShowList(list.filter((item) => item.toString().includes(value)))
      : setShowList(list)
  }

  return (
    <div>
      <div>GiantList</div>
      <input type="text" onChange={(e) => handleKeywordChange(e)} />
      <ul>
        {deferredShowList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
})

export default GiantList
```

不需要使用额外的API来显式指定哪些操作作为过渡任务延迟执行更新，只需要将原有的状态变量使用`useDeferredValue`包裹后，使用返回的值进行展示。

后续，对原来的状态变量进行的任何操作，当更新反映到真实DOM时都会被延迟执行

