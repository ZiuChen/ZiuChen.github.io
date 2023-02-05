# 深入理解Proxy与Reflect

### 监听对象的操作

可以使用Proxy对象将原对象包裹，此后的操作都对`proxy`进行，每次`get`与`set`被触发时都会自动执行相应代码

```js
const obj = {
  name: 'ziu',
  age: 18,
  height: 1.88
}
const proxy = new Proxy(obj, {
  get(target, key) {
    console.log('get', key)
    return target[key]
  },
  set(target, key, value) {
    console.log('set', key, value)
    target[key] = value
  }
})
```

```js
const tmp = proxy.height // getter被触发
proxy.name = 'Ziu' // setter被触发
```

除此之外，在之前的版本中可以通过`Object.defineProperty`为对象中某个属性设置`getter`与`setter`函数，可以达到类似的效果

```js
for (const key of Object.keys(obj)) {
  let value = obj[key]
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', value)
      return value
    },
    set(newVal) {
      console.log('set', key, newVal)
      value = newVal
    }
  })
}
```

但是通过`Object.defineProperty`实现的监听存在问题：

- `Object.defineProperty`设计之初并不是为了监听一个对象中的所有属性的
- 如果要监听新增/删除属性，那么此时`Object.defineProperty`是无能为力的

### Proxy类基本使用

```JS
const proxy = new Proxy(target, handler)
```

即使不传入handler，默认也会进行基本的代理操作

```js
const obj = {
  name: 'ziu',
  age: 18
}
const proxy = new Proxy(obj, {})
proxy.height = 1.88 // 添加新属性
proxy.name = 'Ziu' // 修改原属性

console.log(obj) // { name: 'Ziu', age: 18, height: 1.88 }
```

### 捕获器

常用的捕获器有`set`与`get`函数

```js
const proxy = new Proxy(obj, {
  set: function (target, key, newVal) {
    console.log(`监听: ${key} 设置 ${newVal}`)
    target[key] = newVal
  },
  get: function (target, key) {
    console.log(`监听: ${key} 获取`)
    return target[key]
  }
})
```

- set函数有四个参数
  - target 目标对象（侦听的对象）
  - property 即将被设置的属性key
  - value 新属性值
  - receiver 调用的代理对象
- get函数有三个参数
  - target 目标对象（侦听的对象）
  - property 被获取的属性key
  - receiver 调用的代理对象

另外介绍两个捕获器：`has`与`deleteProperty`

```js
const proxy = new Proxy(obj, {
  ...
  has: function (target, key) {
    console.log(`监听: ${key} 判断`)
    return key in target
  },
  deleteProperty: function (target, key) {
    console.log(`监听: ${key} 删除 `)
    return true
  }
})

delete proxy.name // 监听: name 删除
console.log('age' in proxy) // 监听: age 判断
```

### Reflect

Reflect是ES6新增的一个API，它本身是一个对象

- 提供了很多操作JavaScript对象的方法，有点像Object中操作对象的方法
- 比如`Reflect.getPrototypeOf(target)`类似于`Object.getPrototypeOf()`
- 比如`Reflect.defineProperty(targetm propertyKey, attributes)`类似于`Object.defineProperty()`

如果我们又Object对象可以完成这些操作，为什么还需要Reflect呢？

- Object作为一个构造函数，这些操作放到它身上并不合适
- 包含一些类似于 in delete的操作符
- 在ES6新增了Reflect，让这些操作都集中到了Reflect对象上
- 在使用Proxy时，可以做到不操作原对象

### 与Object的区别

删除对象上的某个属性

```js
const obj = {
  name: 'ziu',
  age: 18
}
// 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变
// 同时该属性也能从对应的对象上被删除。 默认为 false。
Object.defineProperty(obj, 'name', {
  configurable: false
})

// 1. 旧方法 检查`delete obj.name`是否执行成功
// 结果: 需要额外编写检查代码且存在问题(严格模式下删除configurable为false的属性将报错)
delete obj.name
if (obj.name) {
  console.log(false)
} else {
  console.log(true)
}

// 2. Reflect
// 结果: 根据是否删除成功返回结果
if (Reflect.deleteProperty(obj, 'name')) {
  console.log(true)
} else {
  console.log(false)
}
```

### Reflect常见方法

其中的方法与Proxy的方法是一一对应的，一共13个。其中的一些方法是Object对象中没有的：

- `has` 判断一个对象是否存在某个属性，和 `in` 运算符功能完全相同
- `get` 获取对象身上某个属性的值，类似于`target[key]`
- `set` 将值分配给属性的函数，返回一个Boolean，如果更新成功则返回true
- `deleteProperty` 作为函数的 `delete` 操作符，相当于执行 `delete target[key]`
- ··· 

代理对象的目的：不再直接操作原始对象，一切读写操作由代理完成。我们先前在编写Proxy的代理代码时，仍然有操作原对象的行为：

```js
const proxy = new Proxy(obj, {
  set: function (target, key, newVal) {
    console.log(`监听: ${key} 设置 ${newVal}`)
    target[key] = newVal // 直接操作原对象
  },
})
```

这时我们可以让Reflect登场，代替我们对原对象进行操作，之前的代码可以修改：

```js
const proxy = new Proxy(obj, {
  set: function (target, key, newVal) {
    console.log(`监听: ${key} 设置 ${newVal}`)
    Reflect.set(target, key, newVal)
  },
  get: function (target, key) {
    console.log(`监听: ${key} 获取`)
    return Reflect.get(target, key)
  },
  has: function (target, key) {
    console.log(`监听: ${key} 判断`)
    return Reflect.has(target, key)
  }
})
```

使用Reflect替代之前的对象操作有以下好处：

- 代理对象的目的：不再直接操作原对象
- Reflect.set方法有返回Boolean值，可以判断本次操作是否成功
- receiver就是外层的Proxy对象

针对好处三，做出如下解释。以下述代码为例，`set name(){}`函数中的`this`指向的是`obj`

```js
const obj = {
  _name: 'ziu',
  set name(newVal) {
    console.log(`set name ${newVal}`)
    console.log(this)
    this._name = newVal
  },
  get name() {
    console.log(`get name`)
    console.log(this)
    return this._name
  }
}

console.log(obj.name)
obj.name = 'Ziu'
```

```js
const proxy = new Proxy(obj, {
  set: function (target, key, newVal, receiver) {
    console.log(`监听: ${key} 设置 ${newVal}`)
    Reflect.set(target, key, newVal, receiver)
  },
  get: function (target, key, receiver) {
    console.log(`监听: ${key} 获取`)
    return Reflect.get(target, key, receiver)
  }
})
```

我们使用Proxy代理，并且使用Reflect操作对象时，输出的`this`仍然为`obj`，需要注意的是，此处的`this`指向是默认指向原始对象`obj`，而如果业务需要改变`this`指向，此时可以为`Reflect.set()`的最后一个参数传入`receiver`

### Reflect.construct方法

以下两段代码的实现结果是一样的：

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

function Student(name, age) {
  Person.call(this, name, age) // 借用
}

const stu = new Student('ziu', 18)
console.log(stu)
```

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

function Student(name, age) {
  // Person.call(this, name, age) // 借用
}

const stu = new Reflect.construct(Person, ['ziu', 18], Student)
console.log(stu)
```
