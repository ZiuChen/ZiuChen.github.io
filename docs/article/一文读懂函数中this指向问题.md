# 一文读懂函数中this指向问题

## 函数中this指向

函数在调用时, Javascript会默认为this绑定一个值

```
// 定义一个函数
function foo() {
  console.log(this)
}

// 1. 直接调用
foo() // Window

// 2. 绑定对象调用
const obj = { name: 'ziu', aaa: foo }
obj.aaa() // obj

// 3. 通过call/apply调用
foo.call('Ziu') // String {'Ziu'}
```

this的绑定:

-   和定义的位置没有关系
-   和调用方式/调用位置有关系
-   是在运行时被绑定的

**this始终指向最后调用它的对象**

```
function foo() {
  console.log(this)
}
foo() // Window

const obj = {
  name: 'ziu',
  bar: function () {
    console.log(this)
  }
}
obj.bar() // obj

const baz = obj.bar
baz() // Window
```

## 如何改变this的指向

### new 实例化一个函数

> new一个对象时发生了什么:
>
> 0.  创建一个空对象
> 0.  这个空对象会被执行prototype连接
> 0.  将this指向这个空对象
> 0.  执行函数体中的代码
> 0.  没有显式返回这个对象时 会默认返回这个对象

函数可以作为一个构造函数, 作为一个类, 可以通过new关键字将其实例化

```
function foo() {
  console.log(this)
  this.name = 'Ziu'
}
foo() // 直接调用的话 this为Window
​
new foo() // 通过new关键字调用 则this指向空对象
```

### 使用 call apply bind

在 JavaScript 中, 函数是对象。

JavaScript 函数有它的属性和方法。call() 和 apply() 是预定义的函数方法。

两个方法可用于调用函数，两个方法的第一个参数必须是对象本身

* * *

要将`foo`函数中的`this`指向`obj`，可以通过赋值的方式：

```
obj.foo = foo // 绑定
obj.foo() // 调用
```

但是也可以通过对函数调用call / apply实现

```
var obj = {
  name: 'Ziu'
}
​
function foo() {
  console.log(this)
}
​
foo.call(obj) // 将foo执行时的this显式绑定到了obj上 并调用foo
foo.call(123) // foo的this被绑定到了 Number { 123 } 上
foo.call("ziu") // 绑定到了 String { "ziu" } 上
```

#### 包装类对象

当我们直接使用类似：

```
"ZiuChen".length // String.length
```

的语句时，`JS`会为字符串 `ZiuChen` 包装一个对象，随后在这个对象上调用 `.length` 属性

#### call和apply的区别

-   相同点：第一个参数都是相同的，要求传入一个对象

    -   在函数调用时，会将this绑定到这个传入的对象上

-   不同点：后面的参数

    -   apply 传入的是一个数组
    -   call 传入的是参数列表

```
function foo(name, age, height) {
  console.log(this)
}
​
foo('Ziu', 18, 1.88)
​
foo.apply('targetThis', 'Ziu', 18, 1.88)
​
foo.call('targetThis', ['Ziu', 18, 1.88])
```

当我们需要给一个带参数的函数通过call/apply的方式绑定this时，就需要使用到call/apply的第二个入参了。

#### 参数列表

当传入函数的参数有多个时，可以通过`...args`将参数合并到一个数组中去

```
function foo(...args) {
  console.log(args)
}
​
foo("Ziu", 18, 1.88) // ["Ziu", 18, 1.88]
```

#### bind绑定

如果我们希望：在每次调用`foo`时，都能将`obj`绑定到`foo`的`this`上，那么就需要用到`bind`

```
// 将obj绑定到foo上
const fun = foo.bind(obj)
// 在后续每次调用foo时, foo内的this都将指向obj
fun() // obj
fun() // obj
```

`bind()`方法将创建一个新的函数，当被调用时，将其`this`关键字

## 箭头函数

箭头函数是`ES6`新增的编写函数的方式，更简洁。

-   箭头函数不会绑定`this`、`argument`属性
-   箭头函数不能作为构造函数来使用（不能与`new`同用，会报错）

### 箭头函数中的this

在箭头函数中是没有`this`的：

```
const foo = () => {
  console.log(this)
}
foo() // window
console.log(this) // window
```

之所以找到了`Window`对象，是因为在调用`foo()`时，函数内部作用域并没有找到`this`，转而向上层作用域找`this`

因此找到了顶层的全局`this`，也即`Window`对象

### 箭头函数中this的查找规则

检查以下代码：

```
const obj = {
  name: "obj",
  foo: function () {
    const bar = () => {
      console.log(this)
    }
    return bar
  }
}
const fn = obj.foo()
fn() // obj
```

代码执行完毕，控制台输出`this`值为`obj`对象，这是为什么？

箭头函数中没有`this`，故会向上层作用域寻找`this`，`bar`的上层作用域为函数`foo`，而函数`foo`的`this`由其调用决定

调用`foo`函数的为`obj`对象，故内部箭头函数中的`this`指向的是`obj`

检查以下代码：

```
const obj = {
  name: "obj",
  foo: () => {
    const bar = () => {
      console.log(this)
    }
    return bar
  }
}
const fn = obj.foo()
fn() // Window
```

和上面的代码不同之处在于：`foo`也是由箭头函数定义的，`bar`向上找不到`foo`的`this`，故而继续向上，找到了全局`this`，也即`Window`对象

### 严格模式

-   在严格模式下，全局的`this`不是`Window`对象，而是`undefined`。
-   在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。
-   在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

## this面试题

```
var name = 'window'

var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  }
}

function sayName() {
  var sss = person.sayName

  sss() // 默认绑定: window

  person.sayName();  // 隐式绑定: person

  (person.sayName)() // 隐式绑定: person, 本质与上一行代码相同

  ;(person.sayName = person.sayName)() // 间接调用: window
}

sayName()
```

```
var name = 'window'

var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
    return () => console.log(this.name)
  }
}

var person2 = {
  name: 'person2'
}

person1.foo1() // 隐式绑定: person1
person1.foo1.call(person2) // 显式绑定: person2

person1.foo2() // 上层作用域: window
person1.foo2.call(person2) // 上层作用域: window

person1.foo3()() // 默认绑定: window
person1.foo3.call(person2)() // 默认绑定: window
person1.foo3().call(person2) // 显式绑定: person2

person1.foo4()() // 隐式绑定: person1
person1.foo4.call(person2)() // 显式绑定: person2
person1.foo4().call(person2) // 隐式绑定: person1
```