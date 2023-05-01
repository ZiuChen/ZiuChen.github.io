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


