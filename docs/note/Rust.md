# Rust

## Rust 环境搭建

`rustup` 是一个用于管理 Rust 版本和相关工具的命令行工具。

Unix 系统:

```sh
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

Windows 系统:

下载并安装 [rustup-init.exe](https://static.rust-lang.org/rustup/dist/i686-pc-windows-gnu/rustup-init.exe).

安装完毕后，在命令行执行：

```sh
rustc --version
```

可以看到输出的版本号信息，则 rust 已安装完毕。

## Hello, Rust!

```sh
mkdir hello_rust
```

创建并编辑第一个 Rust 程序：

```rs
// main.rs
fn main() {
    println!("Hello, Rust!");
}
```

执行 `rustc ./hello_rust/main.rs`

可以看到在代码同目录下输出了二进制文件 `main`，在命令行中执行：

```sh
./main
```

可以看到输出：

```sh
> Hello, Rust!
```

下面我们分析一下这个程序：

在 Rust 中，函数名为 `main` 的函数是一个特殊的函数，它总是会被最先执行：

```rs
fn main() {

}
```

在函数体中的代码：

```rs
    println!("Hello, Rust!")
```

`println!` 是一个 Rust 宏（macro），它与函数调用的区别是它以 `!` 结尾。

`"Hello, Rust!"` 是一个字符串，传递给了 `println!` 宏。

**Rust 程序的编译和运行是独立进行的，这意味着你可以将编译产物直接发送给别人，别人不需要安装 Rust 也可以运行**

这与 Ruby Python JavaScript 这类动态语言不同，Rust 是一门**预编译静态语言**（ahead-of-time compiled）

简单项目可以使用 rustc，但随着项目复杂度增长，我们可以使用 cargo 来管理项目中的三方依赖、管理真实世界中 Rust 程序开发的方方面面。

## Cargo

```sh
# 初始化一个 Cargo 项目
cargo new hello_cargo
```

执行 `cargo new` 后会自动帮你初始化一个 Git 仓库，如果你是在一个现存的 Git 仓库中执行的初始化，那么就不会执行此操作。

除了帮你创建了一个 HelloWorld 代码，`cargo` 还创建了一个 `cargo.toml` 文件：

```toml
[package]
name = "hello_cargo"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

`[package]`、`[dependencies]` 分别代表是一个片段：

- 其中 `[package]` 下的字段 `name`、`version` 和 `edition` 表示项目的名称、项目的版本和使用的 Rust 版本。
- `[dependenciese]` 中记录着项目的第三方依赖，这些依赖被称为 *crates*

Cargo 期望所有的源代码都存放在 `src/` 目录下，项目根目录中保存如 README、LICENSE 这类的文件。

### 在 Cargo 中构建和运行项目

执行 `cargo build` 可以构建项目：

```sh
cargo build
```

构建产物将输出在 `target/debug/` 目录下，这是因为 `cargo build` 是调试构建（debug build）

执行：

```sh
cargo run
```

即可运行刚刚 build 输出的产物。如果你在 `cargo run` 之前未构建或修改了代码，`cargo` 会自动帮你完成 re-build 并执行代码。

```sh
cargo check
```

这个命令可以帮你完成代码的静态检查且不输出任何文件，由于它不需要准备输出构建产物，所以它比 `cargo build` 要快得多。

### 发布构建

与调试构建不同，可以执行：

```sh
cargo build --release
```

来构建一个用于生产环境的产物，这会在 `target/release/` 下输出产物而不是 `target/debug/` 下。

发布构建的产物往往有针对生产的更多优化，同时构建需要花费的时间也更长，这也是为什么要有调试构建与发布构建的区分：调试构建用于开发时更快的看到最终效果，需要经常快速地执行构建，而发布构建则是为了最终用户使用时构建的。

## Gussing Game

写一个猜数游戏：

使用 `use` 标识符来从标准库中引入 `io` 库，之后就可以在当前作用域中通过 `io:stdin()` 读取到用户输入：

```rs
use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```

执行 `cargo run` 后测试一下：

```sh
Guess the number!
Please input your guess.
6
You guessed: 6
```

### 使用变量保存数据

在 Rust 中，使用 `let` 与 `const` 声明的变量默认都是不可变的，通过给 `let` 声明的变量加上 `mut` 标记，来让 guess 这个变量可变（mutatiable）

`::new` 中的 `::` 表明：`new` 是 `String` 类型的一个关联函数，在一些语言中它被称之为静态方法（static function）

总的来说，`let mut guess = String::new();` 这一行创建了一个可变变量，当前它绑定到一个新的 `String` 空实例上。

### 读取用户输入

如果在程序开头我们没有使用 `use` 来引入 `io` 库，在代码中我们也可以这样写：

```rs
std::io::stdin()
```

来动态地引入 `io` 库，通过 `read_line` 来从标准输入句柄获取用户输入。

将 `&mut guess` 传递给 `read_line`，其中 `&` 表明传递的是一个变量的引用，同时由于变量是不可变的，`&mut` 表示这个引用可以修改。

### 使用 Result 类型处理潜在错误

前文中我们说 `read_line` 会持续地将用户输入附加到传递给它的字符串中，它也会返回一个 `Result` 类型的值。

`Result` 类型是一个枚举类型，包含两种成员类型：

- `Ok`: 表示操作成功，内部包含成功时产生的值；
- `Err`: 表示操作失败，包含失败的前因后果。

这些 `Result` 类型的作用是处理错误信息，`Result` 的实例具有 `expect` 方法，如果 `io:Result` 实例的值是 `Err`，`expect` 会导致程序崩溃，并显示错误信息。

如果 `read_line` 返回 `Err`，则可能是来源于底层操作系统错误的结果。如果 `Result` 实例的值是 `Ok`，`expect` 会获取 `Ok` 中的值并原样返回。

在此例子中，这个值是用户输入到标准输入中的字节数。

### 使用 println! 占位符打印值

下面这两种 `println!` 是等价的，他们都可以将变量打印到指定位置：

```rs
println!("You guessed: {guess}");
println!("You guessed: {}", guess);
```

### 生成一个随机数

在 Rust 标准库中不包含随机数功能，我们可以使用 rand crate：

```sh
cargo add rand
```

安装后，我们到 Cargo.toml 中可以看到：

```toml
[dependencies]
rand = "0.8.5"
```

这里的 `"0.8.5"` 实际上是 `"^0.8.5"` 的简写，它表示至少是 `0.8.5` 但小于 `0.9.0` 的版本。

具体可以参看[语义化版本（Semantic Versioning）](https://semver.org/)

Cargo 通过 Cargo.lock 文件来保证每一次构建都是可以被重现的，任何人在任何时候重新构建代码都会产生相同的结果，Cargo 只会使用你指定的依赖版本。

> 如果 rand 库下周发布了 `0.8.6` 版本，新版本中修复了一个 BUG 但存在破坏性变更，如果你没有显式地在 Cargo.toml 中升级 rand 库，那 Cargo 会按照上一次构建成功时生成的 Cargo.lock 记录的第三方库版本来构建。

如果你确实要升级 crate，可以使用：

```sh
cargo update
```

来忽略 Cargo.lock 文件，并计算所有符合 Cargo.toml 声明的最新版本。

安装完了 rand crate，我们下面来生成一个随机数：

```rs
use std::io;
use rand::Rng;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1..=100);

    println!("The secret number is: {secret_number}");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {guess}");
}
```

`use rand:Rng;` 其中，`Rng` 是一个 trait，它定义了随机数生成器实现的方法的话，此 trait 必须在作用域中。

我们调用 `rand::thread_rng` 函数提供实际使用的**随机数生成器**：它位于当前执行线程的本地环境中，从操作系统获取 seed。

随后调用随机数生成器的 `gen_range` 方法，它由 `Rng` trait 定义，获取一个范围表达式（Range expression）作为参数，并生成一个在此范围之间的随机数。

范围表达式使用 `start..=end` 这样的形式，如 `1..=100` 就代表 1 到 100 之间。

::: info
你不可能凭空知道应当 use 哪个 trait，以及应当从 crate 中调用哪个方法，因此每个 crate 都有说明文档。
通过调用 `cargo doc --open` 来构建所有本地依赖提供的文档并在浏览器中打开。
:::

### 对比两个数字

```rs
// 此代码不可运行
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    // --snip--

    println!("You guessed: {guess}");

    match guess.cmp(&secret_number) {
        Ordering::Less => println!("Too small!"),
        Ordering::Greater => println!("Too big!"),
        Ordering::Equal => println!("You win!"),
    }
}
```

我们引入 `std::cmp::Ordering` 到作用域中。`Ordering` 也是一个枚举，其成员包含 `Less`、`Greater` 和 `Equal`，这是在两个值进行比较时可能出现的三种结果。

`cmp` 方法用于比较两个值，并且**可以在任何可比较的值上调用**。它获取一个被比较值的引用：将 `guess` 与 `secret_number` 作比较。然后返回一个通过 `use` 引入作用域的 `Ordering` 枚举的成员。

使用 `match` 表达式，根据对 `guess` 和 `secret_number` 调用 `cmp` 返回的 `Ordering` 成员，来决定下一步应该要做什么。

`match` 表达式由众多的分支（arms）构成，每个分支都包含一个 pattern 以及 pattern 被匹配时要执行的代码。

尝试执行此代码，编译器会抛出错误：不匹配的类型（mismatched types）。Rust 有一个静态强类型系统，同时也有类型推断。

当我们写出 `let guess = String::new();` 时，Rust 会帮我们推断出 `guess` 变量应当是 `String` 类型。

而 `secret_number` 是 1 - 100 之间的数字类型，而符合这个要求（1~100之间）的数字，在 Rust 中有下面几种：

- `i32` 32位数字；
- `u32` 32位无符号数字；
- `i64` 64位数字
- 等等 ...

Rust 默认使用 `i32`，所以 Rust 默认为 `secret_number` 推断出的类型是 `i32`，导致了字符串与数字作对比的情况。

要将 `String` 转化为数字类型才能与 `secret_number` 作比较：

```rs
let guess: u32 = guess.trim().parse().expect("Please type a number!");
```

上面的代码将重新声明 `guess` 变量，这个特性叫隐藏（Shadowing），通过 `guess.trim()` 去除字符串头尾的空白字符（如用户输入 5 并按下空格后，在 Unix 系统中 `guess` 的值为 `5\n`，在 Windows 系统中 `guess` 的值为 `5\r\n`）

`guess.parse()` 方法会将字符串转换为其他类型，通过给 `guess` 显式指定类型来告诉 `guess` 方法转化的目标类型，这里的目标类型是 `u32`。

同时，为了防止字符串中包含特殊字符等原因导致 `parse` 执行失败，这里用 `expect` 来对转化是否成功进行提示：

- 如果 `parse` 不能从字符串生成一个数字，返回一个 `Result` 的 `Err` 成员时，`expect` 方法会使程序结束并打印附加的信息。
- 如果 `parse` 成功执行，那么它会返回 `Result` 的 `Ok` 成员，然后 `expect` 会返回 `Ok` 值中的数字。

### 使用循环来允许多次猜测

可以使用 `loop` 关键字来创建一个无限循环，给用户更多机会来猜数。

```rs
    println!("The secret number is: {secret_number}");

    loop {
        println!("Please input your guess.");

        // --snip--

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            },
        }
    }
```

当用户成功猜对后，会执行 `break;` 退出程序。

### 忽略非数字的猜测并继续游戏

目前的代码如果用户输入了非数字，会导致 `parse` 失败，进而导致程序退出，因此我们需要改写这部分的逻辑，将 `expect` 调用 改为 `match`：

```rs
        // --snip--

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue,
        };

        println!("You guessed: {guess}");

        // --snip--
```

这样当遇到错误时程序不再崩溃，而是进入到 `match` 的错误分支中处理错误：调用 `continue;` 继续循环。

### 总结

这一章里我们学习了使用 `let` 声明变量、变量隐藏、类型转化、`match` 处理多分支任务、`loop` 循环。

还学习了外部 crate 的使用、如何指定数据类型等

## 常见编程概念

### 变量和可变性

变量默认是不可变的（Immutable），这是 Rust 提供的众多特性之一：

下面的代码由于修改了 `x` 导致编译不通过：

```rs
fn main() {
    let x = 5;
    println!("x is {}", x);
    x = 6;
    println!("x is {}", x);
}
```

编译器抛出的错误信息：cannot assign twice to immutable variable `x`

要让 `x` 变得可变，可以在声明 `let` 后添加 `mut`：

```rs
let mut x = 5;
```

这样就可以修改 `x` 的值了。

除了 `let`，还可以通过 `const` 声明一个常量：

- 常量总是不可变，且不允许对常量使用 `mut`
- 必须在声明时注明值的类型
- 常量只能被设置为常量表达式，而不是任何只能在运行时计算出的值

```rs
const THREE_HOURS_IN_SECONDS: u32 = 60 * 60 * 3;
```

这里的 `60 * 60 * 3` 会在编译器编译时执行运算，这使我们可以选择更容易理解和验证的方式来写出这个值，而不是直接将常量设置为 `10,800`。

在前文中我们介绍了变量隐藏，后声明的同名变量将会屏蔽掉之前声明的变量，直到新的变量也被隐藏或作用域结束：

```rs
fn main() {
    let x = 5; // 5

    let x = x + 1; // 6

    {
        let x = x * 2;
        println!("x is {}", x); //  12
    }

    println!("x is {}", x); // 6
}
```

需要注意的是，隐藏与将变量标记为 `mut` 是有区别的，当对变量进行重新赋值时，如果没有使用 `mut` 那么会导致编译时错误。通过变量隐藏，我们可以用新的变量进行一些计算，但计算完之后变量依然是不可变的。

`mut` 与隐藏的另一个区别是：当再次使用 `let` 声明变量时，隐藏实际上创建了一个新的变量，我们可以改变值的类型，只不过复用这个名字：

如果没有变量隐藏，代码可能会像这样：

```rs
let spaces_str = "    ";
let spaces_num = spaces_str.len();
```

利用变量隐藏，我们可以简单地复用相同变量名：

```rs
let spaces = "    "; // 文本之间的空格数量
let spaces = spaces.len(); // 多少个空格
```

然而，如果使用 `mut`，他不允许修改变量的类型：

```rs
let spaces = "    ";
spaces = spaces.len(); // 错误：不能改变变量的类型
```

### 数据类型

在 Rust 中，每一个值都属于某一种数据类型（data type），这告诉 Rust 它被指定为何种数据。

Rust 是静态类型（statically typed）语言编译时必须知道所有变量的类型，当多种类型均有可能时，例如使用 `parse` 将 `String` 转换为数字时，必须增加类型注解，像这样：

```rs
let guess: u32 = "42".parse().expect("Not a number!")
```

在 Rust 中有两种数据类型子集：标量和复合

#### 标量类型（scalar）

##### 整型

整型是一个没有小数部分的数字，例如 `u32` 代表一个占据 32 bit 的无符号整数。其中**有符号**和**无符号**代表数字能否为负值。

| 长度    | 有符号 | 无符号 |
|-------|------|------|
| 8-bit  | i8   | u8   |
| 16-bit | i16  | u16  |
| 32-bit | i32  | u32  |
| 64-bit | i64  | u64  |
| 128-bit| i128 | u128 |
| arch   | isize| usize|

有符号的整型可以存储从 $-(2^{n-1})$ 到 $2^{n-1}-1$ 在内的数字，这里的 $n$ 代表位数。

例如 `i8` 可以存储 $-(2^7)$ 到 $2^7-1$ 在内的数字，也就是从 -128 到 127。

无符号的整型可以存储从 $0$ 到 $2^n-1$的数字。

所以 `u8` 可以存储 $0$ 到 $2^8-1$ 的数字，也就是 0 到 255。

另外，`isize` 与 `usize` 类型依赖运行程序的计算机架构：在 64 位架构上，它们是 64 位的，在 32 位架构上，它们是 32 位的。分别等价于 `i64` `i32` 与 `u64` 和 `u32`。

除了通过类型指定变量的整型类型，还可以以后缀形式使用类型，例如 `let x = 57u8;`。还可以通过数字字面值来指定类型：

`1000` 与 `1_000` 等价，但后者更易读。

| 数字字面值                | 例子         |
|------------------------|------------|
| Decimal (十进制)         | 98_222     |
| Hex (十六进制)           | 0xff       |
| Octal (八进制)           | 0o77       |
| Binary (二进制)          | 0b1111_0000 |
| Byte (单字节字符)(仅限于u8) | b'A'        |

##### 浮点型

在 Rust 中有两个原生浮点数类型：

- `f32` 单精度浮点数，占 32 位
- `f64` 双精度浮点数，占 64 位，现代 CPU 中，它与 `f32` 速度几乎一样，不过精度更高

浮点数都是有符号的。

```rs
fn main() {
    let x = 2.0; // f64
    let y: f32 = 3.0; // f32
}
```

Rust 中的所有数字类型都支持基本数学运算：加法、减法、乘法、除法和取余。整数除法会向零舍入到最接近的整数：

```rs
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let truncated = -5 / 3; // 结果为 -1

    // remainder
    let remainder = 43 % 5;
}
```

##### 布尔型

```rs
let t = true;
let f: bool = false;
```

##### 字符类型

Rust 的 `char` 类型是语言最原生的字母类型，大小为四个字节：

```rs
fn main() {
    let c = 'z';
    let z: char = 'ℤ'; // 显式类型声明
    let heart_eye_cat = '😻';
}
```

#### 复合类型（compound）

复合类型（Compound types）可以将多个值组合成一个类型。Rust 有两个原生的复合类型：元组（tuple）和数组（array）。

##### 元组类型

元组是一个将多个其他类型的值组合进一个复合类型的主要方式。元组长度固定：一旦声明，其长度不会增大或缩小。

```rs
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
}
```

可以使用模式匹配（pattern matching）来解构（destructure）元组值：

```rs
fn main() {
    let tup = (500, 6.4, 1);

    let (x, y, z) = tup;

    println!("{}", y); // 6.4
}
```

也可以直接用 `.` 跟随值的索引来访问元组中的元素：

```rs
fn main() {
    let tup = (500, 6.4, 1);
    
    let x = tup.0;
    let y = tup.1;
    let z = tup.2;

    println!("{}", x); // 500
}
```

不带任何值的元组有个特殊的名称，叫做 单元（unit） 元组。这种值以及对应的类型都写作 `()`，表示**空值或空的返回类型**。如果表达式不返回任何其他值，则会隐式返回单元值。

##### 数组类型

与元组不同，数组中每个元素的类型必须相同。

**Rust 中的数组长度是固定的。**

```rs
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

当你想要在栈（stack）而不是在堆（heap）上为数据分配空间（第四章将讨论栈与堆的更多内容），或者是想要确保总是有固定数量的元素时，数组非常有用。

但是数组并不如 `vector` 类型灵活。

`vector` 类型是标准库提供的一个 允许 增长和缩小长度的类似数组的集合类型。当不确定是应该使用数组还是 vector 的时候，那么很可能应该使用 `vector`。

然而，当你**确定元素个数不会改变时，数组会更有用**。

例如，当你在一个程序中使用月份名字时，你更应趋向于使用数组而不是 `vector`，因为你确定只会有 12 个元素。

```rs
let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
```

声明数组时，可以像这样编写数组的类型，既能约束数组中元素的类型，还能限制数组的长度：

```rs
let a: [i32; 5] = [1, 2, 3, 4, 5];
```

这里的 `i32` 代表每个元素的类型，分号之后的 `5` 代表数组的长度为 5，包含五个元素。

还可以在类型声明中指定初始值：

```rs
let b: [3, 5];
```

这样变量 `b` 就是一个长度为 5，初始值全为 3 的数组。

数组是可以在栈 (stack) 上分配的已知固定大小的单个内存块。可以使用索引来访问数组的元素，像这样：

```rs
let c = [1, 2, 3, 4, 5];

let x = c[0]; // 1
let y = c[1]; // 2
```

通过索引从数组中取值的操作如果是在运行时进行的，那么代码可以顺利通过编译，但在运行时会出错：

下面这段代码可以正常通过编译，当你输入 0 1 2 3 4 访问数组时工作正常，但一旦输入了超过数组长度的索引如 10，就会抛出错误。

```rs
use std::io;

fn main() {
    let a = [1, 2, 3, 4, 5];

    println!("Please enter an array index.");

    let mut index = String::new();

    io::stdin()
        .read_line(&mut index)
        .expect("Failed to read line");

    let index: usize = index
        .trim()
        .parse()
        .expect("Index entered was not a number");

    let element = a[index];

    println!("The value of the element at index {index} is: {element}");
}
```

```sh
thread 'main' panicked at 'index out of bounds: the len is 5 but the index is 10', src/main.rs:19:19
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

### 函数

- 必须显式指定参数的类型
- 通过 `->` 指定返回值的类型
- 函数结尾不包含分号时，隐式返回表达式

```rs
fn main() {
    print_labeled_measurement(188, 's');

    let f: i32 = five();
    println!("five: {}", f);
}

fn print_labeled_measurement(value: i32, unit_label: char) {
    println!("The measurement is: {value}{unit_label}");
}

fn five() -> i32 {
    // 结尾不包含分号 隐式返回表达式
    5
}
```

### 控制流

#### if-else & else-if

- 可以省略 if 与条件之间的空格
- 不允许隐式转换

```rs
fn main() {
    let number = 3;

    if number < 5 {
        println!("Yes.");
    } else {
        println!("No.");
    }
}
```

```rs
// 不允许隐式转换 条件表达式必须返回一个布尔值
if number {
    println!("Yes.");
}

if number != 0 {
    println!("Yes.");
}
```

`if` 可以返回一个值，因此可以在 `let` 语句中使用 `if`：

```rs
fn main() {
    let condition = true;
    // if 与 else 分支的结果都为 i32
    let number = if condition { 5 } else { 6 };

    println!("number: {}", number);
}
```

由于类型必须在编译时被确定，编译器会自动识别出不符合这一原则的 if-in-let 声明：

```rs
fn main() {
    // 编译报错 因为 if 与 else 分支的结果类型不同
    let number = if condition { 5 } else { "six" }
}
```

#### 循环

- `break;` 用于中止循环
- `continue;` 用于跳过当次循环
- `break;` 可以从循环返回表达式

```rs
fn main() {
    let mut count = 0;

    let result = loop {
        count += 1;

        if (count == 10) {
            break count * 2;
        }
    }

    println!("result: {}", result); // 20
}
```

循环标签：在多个循环之间消除歧义

如果你存在一个嵌套的循环，而 `break;` 与 `continue;` 只会应用于此时最内层的循环，可以通过循环标签来让这些关键字应用于已标记的循环：

```rs
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

上面的代码中，第一个 `break;` 语句只会退出内层循环，而 `break 'counting_up';` 语句将直接退出外层循环。

除了 `loop`，Rust 还支持通过 `while` 来控制循环：

```rs
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

当我们要实现遍历集合中的元素时，用 `for` 会更方便：

```rs
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("value is {}", a);
    }
}
```

`for` 亦可用于计时：

这段代码中用到了 `.rev()` 方法来将 range 反转

```rs
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```

## 所有权

### 什么是所有权

Rust 的核心功能之一就是**所有权**（ownership）。

所有程序都必须管理其运行时使用计算机内存的方式：

- 一些语言具有垃圾回收机制，在程序运行时有规律地寻找不再使用的内存；
- 在另一些语言中，程序员必须亲自分配和释放内存；
- Rust 则选择了第三种方式，通过所有权系统管理内存

编译器在编译时会根据一系列的规则进行检查，如果违反了任何这些规则，程序都不能编译。

- Rust 中每一个值都有一个所有者（owner）；
- 值在任一时刻只有且只有一个所有者；
- 当所有者（变量）离开作用域，这个值会被丢弃。

```rs
{
    // s 尚未被声明 无法访问
    let s = "Hello"; // 在此处起 s 是有效的
    // 声明后 在作用域内 你可以使用 s
}
// 作用域外 s 被销毁，使用 s 是不被允许的
```

在上面的代码中有两个重要的时间点：

- s **进入作用域**时，它是有效的
- 这一直持续到它**离开作用域**为止

为了演示所有权的规则，我们需要引入一个存储在堆上的数据类型

之前由字符串字面量创建字符串时，在编译阶段就知道其内容，这部分内容被硬编码存储在最终的编译结果中。

但通过 `String` 创建的字符串，此类型管理被分配到堆上的数据，所以能够存储在编译时未知大小的文本：

```rs
let s = String::from("Hello");
```

双冒号 `::` 是一种运算符，它允许将特定的 `from` 函数置于 `String` 类型的命名空间（namespace）下，而不需要使用如 `string_from` 这样的名字。

可以修改此类字符串：

```rs
let mut s = String::from("Hello");
s.push_str(", World!"); // 在 s 后追加字面值
println!("s: {}", s); // "Hello, World!"
```

不同于通过字符串字面量创建的字符串，此类字符串可以被修改。这是因为两种类型在内存上的处理不同：

- 通过字符串字面量创建的字符串：被硬编码进最终的可执行文件中，这使得字符串字面值快速且高效，但代价是它的不可变性。
- `String` 类型为了支持可变、可增长的文本片段，需要在堆上分配一块在编译时未知大小的内存来存放内容

1. 必须在运行时向内存分配器（memory allocator）请求内存
2. 需要一个当我们处理完 `String` 时将内存返回给分配器的方法

对于 1. 我们已经通过 `String::from` 完成，然而对于 2. 在 Rust 中则是采用这样的策略：内存在拥有它的变量离开作用域时就被自动释放：

```rs
{
    let s = String::from("Hello");
} // 作用域结束
// 此时 s 不再有效
```

这是一个将 `String` 需要的内存返回给分配器的很自然的位置：当 `s` 离开作用域的时候。当变量离开作用域，Rust 为我们调用一个特殊的函数。这个函数叫做 `drop`，在这里 `String` 的作者可以放置释放内存的代码。Rust 在结尾的 `}` 处自动调用 `drop`。

以整型数据为例，同一数据可以被不同的变量绑定：

```rs
let x = 5;
let y = x;
```

将 `5` 绑定到变量 `x`，生成一个值 `x` 的拷贝并绑定到变量 `y` 上，因为整型是已知固定大小的简单值，所以两个 `5` 都被放入了栈中。

再举一个 `String` 版本的例子：

```rs
let s1 = String::from("Hello");
let s2 = s1;
```

虽然做的事情是一样的，但内存分配上完全不同：

![s1被标记为无效的内存表现](./Rust.assets/trpl04-04.svg)

- 如果 `s1` 未被销毁，两个变量指向了同一个内存空间，存在二次释放的风险；
- 如果重新开辟新的内存空间被开辟，会带来性能问题；

因此，当执行 `s2 = s1` 时，不会有新的内存空间被开辟，`s1` 被标记为无效，不再允许被使用，`s2` 是有效的，当其离开自己的作用域就释放自己的内存。

Rust 永远不会自动创建数据的“深拷贝”，因此任何自动的复制都会被认为是对运行时性能影响较小的。

如果我们确实需要深度复制 `String` 中堆上的数据，而不仅仅是栈上的数据，可以显式调用 `clone` 方法。

```rs
let s1 = String::from("Hello");
let s2 = s1.clone();

println!("s1: {}, s2: {}", s1, s2); // s1 与 s2 都可用
```

在 Rust 中有一种 `Copy` trait 的特殊注解：如果一个类型实现了 `Copy` trait，那么一个旧的变量在将其赋值给其他变量后仍然可用。

`Drop` trait 与 `Copy` trait 是互斥的，一个通用的鉴别类型是不是实现了 Copy trait 的方法是：

任何一组简单标量值的组合都可以实现 `Copy`，任何不需要分配内存或某种形式资源的类型都可以实现 `Copy`，如：

int、bool、float、char、tuple

### 引用与借用

### Slice 类型

```rs
fn main() {

    {
        let s = String::from("Hello");
        takes_ownership(s);

        // s had been moved
        // println!("{}", s);

        let x = 5;
        makes_copy(x);
        println!("{}", x); // x is still avaliable(copied)

        fn takes_ownership(some_string: String) {
            println!("{}", some_string);
        }

        fn makes_copy(some_integer: i32) {
            println!("{}", some_integer);
        }
    }

    {
        let s1 = gives_ownership();
        let s2 = String::from("Hello");
        let s3 = takes_and_gives_back(s2);

        // s2 不可访问 因其所有权已经转移给了 s3
        println!("s1: {}, s3: {}", s1, s3);

        // 向外界授予所有权
        fn gives_ownership() -> String {
            let some_string = String::from("yours");
            some_string
        }

        // 获取所有权并向外授予
        fn takes_and_gives_back(a_string: String) -> String {
            a_string
        }
    }

    {
        let s1 = String::from("Hello");
        let (s2, len) = calculate_length(s1);

        println!("length of {} is {}.", s2, len);

        // 计算 String 的长度并归还所有权
        fn calculate_length(some_string: String) -> (String, usize) {
            let size = some_string.len();
            (some_string, size)
        }
    }

    {
        let s1 = String::from("Hello");
        let len = calculate_length(&s1);

        // 将 s1 的指针传递给函数
        // 所有权不会被转移 在调用函数后 s1 仍然可用
        println!("length of {} is {}.", s1, len);

        fn calculate_length(s: &String) -> usize {
            s.len()
        }
    }

    {
        let s = String::from("Hello");
        change(&s);

        fn change(some_string: &String) {
            // 此处无法通过编译 因为借用的变量无法被修改
            // some_string.push_str("SomeStuff");
            println!("some_string: {}", some_string);
        }
    }

    {
        let mut s = String::from("Hello");
        change(&mut s);
        // 如果已经创建了一个变量的可变引用
        // 就不能再创建对该变量的引用 这是为了防止 data race
        println!("s had been changed to: {}.", s);
        
        fn change(some_string: &mut String) {
            some_string.push_str("SomeStuff");
        }
    }

    {
        let mut s = String::from("Hello");

        // 当然 在不同的作用域中 可以创建不同的可变引用
        {
            let r1 = &mut s;
            r1.push_str("SomeStuff");
        }
        {
            let r2 = &mut s;
            r2.push_str("SomeStuff");
        }

        // 但是 不能同时拥有不可变引用与可变引用，或同时拥有多个可变引用
        {
            let _r1 = &s;
            // let r2 = &mut s;
            // println!("r1: {}, r2: {}", r1, r2);
        }
        {
            let _r1 = &mut s;
            // let r2 = &mut s;
            // println!("r1: {}, r2: {}", r1, r2);
        }

        // 只要保证「不同时」即可
        {
            let r1 = &s;
            println!("r1: {}", r1);

            // r1 借用完毕 r2 可以正常引用并使用 s 的引用
            let r2 = &mut s;
            println!("r2: {}", r2);
        }
    }

    {
        // 悬垂引用 (Dangling References)
        let reference_to_nothing = dangle();
        println!("reference_to_nothing: {}", reference_to_nothing);

        // fn dangle() -> &String {
        //     // 创建字符串 s
        //     let s = String::from("");

        //     // 返回字符串的引用 &s
        //     &s
        // } // 作用域结束 s 被丢弃 占据的内存被释放

        fn dangle() -> String {
            let s = String::from("");

            // 返回 String 后 所有权被移动出函数 因此值不会被释放
            s
        }
    }

    {
        let words = String::from("Hello World!");
        let result = first_word(&words);

        println!("result: {}", result);

        fn first_word(s: &String) -> usize {
            let bytes = s.as_bytes();

            for(i, &item) in bytes.iter().enumerate() {
                if item == b' ' {
                    return i;
                }
            }

            s.len()
        }
    }

    {
        let s = String::from("Hello, World!");
        let hello = &s[..5];
        let world = &s[6..];
        println!("{}, {}", hello, world);

        let words = String::from("Hello, World!");
        let result = first_word(&words);
        println!("result: {}", result);

        fn first_word(s: &String) -> &str {
            let bytes = s.as_bytes();

            for (i, &item) in bytes.iter().enumerate() {
                if item == b' ' {
                    return &s[..i];
                }
            }

            &s[..]
        }
    }
}
```

## 结构体

`struct` 是一个自定义数据类型，允许你包装和命名多个相关的值，从而形成一个有意义的组合。

### 结构体的定义与初始化

下面的代码定义了一个用于存储用户账号信息的结构体：

```rs
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64
}
```

要使用它，需要将其实例化：

```rs
fn main() {
    let user1 = User {
        active: true,
        username: String::from("Ziu"),
        email: String::from("ziu@email.com"),
        sign_in_count: 1,
    };
}
```

默认情况下结构体中的值是不可变的，如果要修改某个字段，需要将**结构体实例标记为可变的**（Rust 不允许将某一个字段标记为可变的），那么可以通过 `.` 语法对实例中的值做修改：

```rs
fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("Ziu"),
        email: String::from("ziu@email.com"),
        sign_in_count: 1,
    };

    user1.sign_in_count += 1;
}
```

可以通过字段初始化简写语法来创建实例：

```rs
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        email,
        username,
        sign_in_count: 1
    }
}
```

用结构更新语法使用更少的代码来创建新 `User` 实例：

创建一个新的 `User` 实例 `user2`，其中 `email` 字段是新的值，其余字段来自 `user1`。

```rs
fn main() {
    let user2 = User {
        email: String::from("user2@email.com"),
        ..user1
    };
}
```

::: warning
结构更新语法就像 `=` 赋值一样遵循所有权转移规则，在这个例子中，`user2` 被创建后我们就不能再使用 `user1` 了，这是因为 `user1` 的 `username` 字段中的 `String` 值被转移到了 `user2` 中。

如果我们给 `user2` 的 `username` 与 `email` 都赋新值，只有 `active` 和 `sign_in_count` 被复用，那么 `user1` 仍可用。
:::

元组结构体（tuple structs）中可以通过 `struct` 关键字定义，但没有具体的字段名，只有字段的类型

当你想给元组取一个名字，并使元组成为与其他元组不同的类型时，元组结构体是很有用的：

```rs
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}
```

没有任何字段的类单元结构体，类似于 `()` 即元祖类型中的 unit 类型。

常用语你想要在某个类型上实现 trait 但不需要在类型中存储数据时发挥作用。

声明并实例化一个名为 `AlwaysEqual` 的 unit 结构的例子：

```rs
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

::: info
结构体数据的所有权

前面 `User` 的例子中，`username` 与 `email` 字段都持有 `String` 类型的数据而不是其引用。

同时，结构体也可以存储被其他对象拥有的数据的引用，不过要这样做的话就必须引入**生命周期**这个概念。

生命周期确保结构体引用的数据有效性和结构体本身保持一致。如果你尝试在结构体中存储一个引用而不指定生命周期将是无效的：

```rs
struct User {
    active: bool,
    username: &str,
    email: &str,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: "someusername123",
        email: "someone@example.com",
        sign_in_count: 1,
    };
}
```

执行编译时，编译器将会抛出错误：需要生命周期标识符
:::

### 示例

下面写一个计算长方形面积的程序来理解何时需要使用结构体：

```rs
fn main() {
    let width = 30;
    let height = 50;

    println!(
        "The area of the rectangle is {} square pixels.",
        area(width, height)
    );

    fn area(width: u32, height: u32) -> u32 {
        width * height
    }
}
```

通过元组给函数入参建立关联：

```rs
fn main() {
    let rect1 = (30, 50);

    println!(
        "The area of the rectangle is {} square pixels.",
        area(rect1)
    );
}

fn area(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}
```

用结构体给参数赋予更多意义，给参数添加语义化的标签：

```rs
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        area(&rect1)
    );
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

借用结构体的所用权，将 `rect1` 的不可变引用传入 `area` 函数，通过 `.` 语法访问结构体字段不会移动字段的所有权。

在调试的过程中，如果你尝试将结构体通过 `println!` 宏打印，运行代码时会抛出错误：

```rs
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {}", rect1);
}
```

```sh
error[E0277]: `Rectangle` doesn't implement `std::fmt::Display`
```

`println!` 宏能处理很多类型的格式，但当你使用 `{}` 占位符时，默认告诉 `println!` 使用被称为 `Display` 的格式：直接给终端用户查看的输出。

基本类型都默认实现了 `Display`，因为值很简单，Rust 可以帮我们完成这部分实现。然而对于结构体的展示存在很多细节：

- 是否需要结尾的逗号？
- 需要打印出外层大括号吗？
- 所有字段都应该显示吗？

因此 Rust 并没有在结构体上提供 `Display` 实现来使用 `println!` 与 `{}` 占位符。

你可以通过 `Debug` trait 输出格式打印结构体，将 `{}` 占位符替换为 `{:?}`：

```rs
println!("rect1 is {:?}", rect1);
```

同时，我们必须显式地为结构体开启这个调试功能：

```rs {1}
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}
```

这会默认展示所有的结构体中的字段：

```sh
rect1 is Rectangle { width: 30, height: 50 }
```

当结构体变得更大，有一种更易读的占位符可以使用：`{:#?}`

```rs
    println!("rect1 is {:#?}", rect1);
```

这包含了更漂亮的换行与缩进，输出的调试信息更易读。

另一种使用 `Debug` 格式打印数值的方法是 `dbg!` 宏，它接收一个表达式的所有权（与 `println!` 宏相反，后者接收的是引用）

打印出代码中调用 `dbg!` 宏时所在的文件和行号以及该表达式的结果值，并返回该值得所有权。

::: warning
注意：调用 `dbg!` 宏会打印到标准错误控制台流（`stderr`），与 `println!` 不同，后者会打印到标准输出控制台流（`stdout`）。
:::

下面是使用 `dbg!` 宏的例子：

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
```

```sh
$ cargo run
   Compiling rectangles v0.1.0 (file:///projects/rectangles)
    Finished dev [unoptimized + debuginfo] target(s) in 0.61s
     Running `target/debug/rectangles`
[src/main.rs:10] 30 * scale = 60
[src/main.rs:14] &rect1 = Rectangle {
    width: 60,
    height: 50,
}
```

### 方法语法

在前面的代码中，`area` 函数是单独实现的，但实际上 `area` 函数与结构体 `Rectangle` 是强相关的。

这里涉及到 函数（function） 与 方法（method） 的不同：

与函数不同的是，方法是在结构体的上下文被定义的（或者是枚举或 trait 对象的上下文）

我们将前文中的 `area` 函数改写为定义于 `Rectangle` 结构体上的一个 `area` 方法：

```rs
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
}
```

为了使函数定义于 `Rectangle` 的上下文中，我们使用 `impl` 关键字，在 `impl` 中的所有内容都将和 `Rectangle` 类型相关联。

将 `area` 函数的参数 `rectangle: &Rectangle` 改为 `&self`，这本质上是 `self: &Self` 的缩写。在一个 `impl` 块中，`Self` 类型是 `impl` 块的类型的别名。

- 方法的第一个参数必须有一个名为 `self` 的 `Self` 类型的参数；
- 要修改调用方法的实例，可以写为：`&mut self` 以获得所有权；

特别地，我们可以选择将方法的名称与结构中的一个字段相同，例如我们可以定义一个名为 `width` 的方法：

```rs
impl Rectangle {
    fn width(&self) -> bool {
        // 当 self.width > 0 时返回 true
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    if rect1.width() {
        println!("The rectangle has a nonzero width; it is {}", rect1.width);
    }
}
```

在使用 `width` 方法时，需要用 `()` 来调用它。

你也可以将 `width` 方法仅仅返回 `self.width` 的值，这样就可以通过这个 getter 访问到 `self.width` 的值。

下面我们编写一个带参数的方法 `can_hold` 用于检查一个 `Rectangle` 是否可以包含另一个 `Rectangle`：

```rs
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn width(&self) -> bool {
        self.width > 0
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

fn main() {
    let rec1 = Rectangle {
        width: 30,
        height: 50,
    };
    let rec2 = Rectangle {
        width: 10,
        height: 40,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rec1.area()
    );
    println!("rec1 can hold rec2: {}", rec1.can_hold(&rec2));
}
```

我们给 `can_hold` 传入了第二个参数 `other`，它是一个 `Rectangle` 实例的不可变借用。

在调用 `can_hold` 时，直接将 `Rectangle` 实例传入即可，这时所有权仍然被 `rec2` 保持，因此我们可以在调用完 `can_hold` 后继续使用 `rec2`。

所有在 `impl` 块中定义的函数被称为 **关联函数**，因为它们与 `impl` 后面命名的类型相关。我们可以定义不以 `self` 为第一参数的关联函数（因此不是方法）。

关联函数并不作用于一个实例，一个最好的关联函数例子就是 `String::from` 函数。

不是方法的关联函数经常被用作返回一个结构体新实例的构造函数（名称通常为 `new`，但实际上 `new` 并不是一个关键字）。

例如我们可以编写一个名为 `square` 的关联函数，它接收一个参数同时作为宽和高，通过 `square` 声明 `Rectangle` 时不必指定两次同样的值：

```rs
impl Rectangle {
    fn square(size: u32) -> Self {
        Rectangle {
            width: size,
            height: size,
        }
    }
}

fn main() {
    let sq = Rectangle::square(30); // 创建一个 30*30 的正方形
}
```

使用结构体名和 `::` 语法来调用这个关联函数。这个函数位于结构体的命名空间中，`::` 语法用于关联函数和模块创建的命名空间。

每个结构体都允许拥有多个 `impl` 块，你可以在不同的 `impl` 中声明方法或关联函数，在后面的章节中会见到实用的多 `impl` 块的用例。

## 枚举和模式匹配

### 枚举的定义

在前文中我们介绍了结构体，它可以将字段和数据聚合在一起：

`Rectangle` 结构体中包含 `width` 和 `height` 两个字段，还可以包含方法。

而枚举可以提供一种途径，用于声明某个值是一个集合中的一员：

`Rectangle` 是一些形状的集合，例如：`Circle` 和 `Triangle`。

下面的代码声明了一个枚举类型 `IpAddrKind`，它包含 `V4` 与 `V6` 两个成员：

```rs
enum IpAddrKind {
    V4,
    V6
}
```

可以 `IpAddrKind` 枚举创建不同成员的实例：

```rs
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

枚举的成员位于其标识符的命名空间中，并使用两个冒号分开。

下面的例子中，枚举成员作为参数传递给 `route` 函数，不论类型是 `V4` 还是 `V6`：

```rs
fn route(ip_kind: IpAddrKind) {}

route(IpAddrKind::V4);
route(IpAddrKind::V6);
```

到目前为止，我们的枚举都是以**类型**形式存在的，并没有一个实际存储 IP 地址数据的地方，我们可以定义一个 `IpAddr` 结构体来完成这样的工作：

```rs
struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
}

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
}
```

实际上，我们可以通过一种更为简洁的方式来表达相同的概念：

只使用枚举，并将数据直接放进每个枚举成员中，而不是用结构体：

```rs
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

这样，我们就不再需要额外的结构体来完成：将数据附加到枚举成员上 这件事了。

另外，你也会发现，定义枚举成员的名字也变成了一个函数调用：`IpAddr::V4()` 获取一个 `String` 类型的参数，并返回 `IpAddr` 类型实例。

用枚举来替代结构体还带来了另一个优势：可以给不同的枚举对象绑定不同的数据类型

```rs
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```

[标准库](https://doc.rust-lang.org/std/net/enum.IpAddr.html)是这样处理IP地址的：

```rs
struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```

另一个枚举的例子 `Message`：

```rs
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

我们当然可以用 `struct` 复写这样的枚举：

```rs
struct QuitMessage; // 类单元结构体
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // 元组结构体
struct ChangeColorMessage(i32, i32, i32); // 元组结构体
```

然而，这些结构体都有不同的类型，而枚举的不同成员是同一个类型。

枚举和结构体另一个相似的地方是：

- 结构体可以使用 `impl` 来定义方法
- 枚举可以通过名为 `call` 的方法来定义

```rs
impl Message {
    fn call(&self) {
        // some code ...
    }
}

let m = Message::Write(String::from("Hello"));
m.call();
```

下面介绍一个标准库中常见且非常实用的枚举 `Option`。

`Option` 类型应用广泛，是因为它编码了一个普遍的场景：一个值要么有值要么没值。

例如：请求一个非空列表的第一项，会得到一个值；请求一个空的列表，那么就什么都不会得到。

从类型系统的角度来表达这个概念，意味着编译器需要检查是否处理了所有应该处理的所有情况。

Rust 并没有其他语言中空值（`null`）的功能，在有空值的语言中，变量总是这两种状态之一：空值和非空值。

在 Rust 中存在一个可以编码存在或不存在概念的枚举：`Option<T>`，被定义在标准库中，并且包含在了 prelude 中，这意味着你不需要显式将其引入作用域。

```rs
enum Option<T> {
    None,
    Some(T),
}
```

甚至，你不需要 `Option::` 的前缀来使用 `Some` 和 `None`，下面是一些 `Option` 的例子：

```rs
let some_number = Some(5);
let some_char = Some('e');
let absent_number: Option<i32> = None;
```

`some_number` 和 `some_char` 的类型由 Rust 自动推断，而 `absent_number` 则是通过泛型指定告诉 Rust 的。

编译器不允许像一个肯定有效的值那样使用 `Option<T>`，因为本质上 `Option<T>` 与 `T` 是不同的类型：

```rs
// 此代码无法通过编译
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y; // ❌
```

编译器确保 `i8` 类型始终有值，不需要做空值检查。只有当使用如 `Option<i8>` 这样的值的时才会担心可能没有值，而编译器会确保我们在使用值之前处理了为空的情况。

换句话说，在对 `Option<i8>` 进行运算之前，必须将其转换为 `T`，这能帮助我们捕获到空值最常见的问题之一：假设某值不为空但实际上为空的情况。

这样就消除了错误地假设一个非空值的风险：为了拥有一个可能为空的值，你必须要显式地将其放入对应类型的 `Option<T>` 中，当你要使用这个值的时候，必须明确处理值为空的情况。

只要一个值不是 `Option<T>` 类型，你就**可以**安全第认定它的值不为空。

更多地关于 `Option<T>` 的用法，可以看[它的文档](https://doc.rust-lang.org/std/option/enum.Option.html)。

如果你希望一些代码仅在有值 `Some(T)` 时才运行，并允许这些代码使用其中的 `T`，或者是你希望当值为 `None` 时做一些错误处理时，可以试试用 `match`。

下文中我们将介绍 `match` 控制流结构，`match` 表达式是一个处理枚举的控制流结构：它会根据枚举的成员运行不同的代码，这些代码可以使用匹配到值中的数据。

### match 控制流结构

Rust 拥有一个名为 `match` 的极为强大的控制流运算符，它允许我们将一个值与一系列的模式相比较，并根据匹配的模式执行相应的代码。

模式（pattern）可以由字面值、变量、通配符和许多其他内容组成，`match` 的力量来源于模式的表现力与编译器检查，它确保了所有可能得情况都能得到处理。

把 `match` 表达式想象成某种硬币分类器：硬币滑入有着不同大小孔洞的轨道，每个硬币都会调入符合其大小的孔洞中。同样地，值也会通过 `match` 的每一个模式，并且在遇到第一个符合的模式时，值会进入相关联的代码块，并在执行中被使用。

一个验钞机的例子：

```rs
// 硬币 => 美分
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

`match` 中的匹配分支，可以绑定匹配的模式的部分值：

```rs
#[derive(Debug)] // 这样可以立刻看到州的名称
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}
```

这里我们给 `Coin::Quarter` 传入州名，以区分不同州对 25 美分的特殊设计。

在 `match` 表达式中，一旦匹配了此模式，变量 `state` 变量将会绑定对应的州值，随后就可以在当前匹配分支中使用 `state`：

```rs
value_in_cents(Coin::Quarter(UsState::Alaska));

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        }
    }
}
```

输出为：

```sh
> State quarter from Alaska!
```

下面我们尝试用 `match` 来匹配 `Option<T>` 的值：

编写一个函数，它获取一个 `Option<i32>`，如果其有值，则将值 +1，如果没有值，则返回 `None`，不执行任何操作。

```rs
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

传入 `Some(5)` 后，`match` 表达式匹配到了 `Some(i)` 这一模式，进入分支，在分支中获得 `T` 的值也就是 `5`，将其加一后返回一个 `Some(6)`。

::: warning
Rust 中的匹配是穷尽的（exhaustive）

在使用 `match` 表达式时，你必须为值的每一种模式都编写一个分支：

```rs
// 此代码无法通过编译
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
    }
}
```

由于缺少了对 `None` 情况的处理，编译会报错：

```sh
> error[E0004]: non-exhaustive patterns: `None` not covered
```

实际上这也使我们免于假设拥有一个实际上为空的值。
:::

可以使用 `_` 作为占位符，作为兜底模式，匹配所有未被其之前匹配到的值：

```rs
let dice_roll = 9;
match dice_roll {
    3 => do_something(),
    7 => do_something_else(),
    _ => reroll() // 🥳 匹配所有剩余的情况
}

fn do_something() {}
fn do_something_else() {}
fn reroll() {}
```

同时，这个例子满足前文中 Rust 的穷举性要求，因为我们在最后一个分支中明确忽略了其他值，而没有忽略任何值。

可以用单元值替换空操作：

```rs
match dice_roll {
    3 => do_something(),
    7 => do_something_else(),
    _ => () // 单元值（本质是空元组）
}
```

这样在未匹配 3 或 7 时将不会做任何事情。

### if let 简洁控制流

在某些情况下，我们只关心 `match` 表达式中某一种情况后执行的效果，这时可以使用 `if let` 语法来简化原本冗余的 `match`：

```rs
let config_max = Some(3u8);
match config_max {
    Some(max) => println!("The maximum is configured to be {}", max);
}
```

使用 `if let` 语法简化后的代码：

```rs
let config_max = Some(3u8);
if let Some(max) = config_max {
    println!("The maximum is configured to be {}", max);
}
```

`if let` 语法通过等号分隔的一个模式和一个表达式，它的工作方法与 `match` 相同：

- `Some(max)` 是一个模式，`max` 绑定为 `Some` 中的值；
- 模式被匹配时，分支被执行，可以在 `if let` 代码块中使用 `max`。

换句话说，可以认为 `if let` 是 `match` 的语法糖，当它的值匹配时执行代码而忽略所有其他值。

可以在 `if let` 中包含一个 `else`。`else` 块中的代码与 `match` 表达式中的 `_` 分支块中的代码相同。

我们用先前的 `match` 例子改写，使用 `if let` 与 `else` 来实现：

```rs
let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
} else {
    count += 1;
}
```

## 使用包、Crate 和模块管理不断增长的项目

编写大型项目中，一般会将代码分解为多个模块盒多个文件来组织。

一个包可以包含多个二进制 crate 项和一个可选的 crate 库，伴随着包的增长，你可以将包中的部分代码提取出来，做成独立的 crate，将这些 crate 作为外部依赖项。

- 包（Package）：Cargo 的一个功能，它允许你构建、测试和分享 crate。
- **Crates**：一个模块的树形结构，它形成了库或二进制项目。
- **模块**（Module）和 **use**：允许你控制作用域和路径的私有性。
- **路径**（path）：一个命名例如结构体、函数或模块等项的方式

### 包和 Crate

crate 是 Rust 在编译时的最小的代码单位。如果你用 `rustc` 而不是 `cargo` 来编译一个文件，编译器还是会将那个文件认作一个 crate。

crate 可以包含模块，模块可以定义在其他文件，然后和 crate 一起编译。

crate 有两种形式：二进制和库：

- 二进制项可以被编译为可执行程序，比如一个命令行程序或者一个服务器。
  - 它必须有一个 `main` 函数来定义当程序被执行时的时候所需要做的事情。
- 库 并没有 `main` 函数，它们也不会被编译为可执行程序，它们提供一些诸如函数之类的东西，使其他项目也能使用这些东西。

crate root 是一个源文件，Rust 编译器以它为起点，并构成你的 crate 根模块。

包（Package）是提供一系列功能的一个或多个 crate。一个包会包含一个 Cargo.toml 文件，阐述如何去构建这些 crate。Cargo 就是一个包含构建你代码的二进制项的包。Cargo 也包含这些二进制项所依赖的库。其他项目也能用 Cargo 库来实现与 Cargo 命令行程序一样的逻辑。

包中可以包含至多一个库 crate（library crate）。包中可以包含任意多个二进制 crate（binary crate），但是必须至少包含一个 crate（无论是库还是二进制的）；

```sh
cargo new my-project
```

### 定义模块来控制作用域和私有性

下面解释一下模块、路径、`use` 关键词和 `pub` 关键词如何在编译器中工作：

- 从 crate 根节点开始
  - 当编译一个 crate，编译器首先在 crate 根文件（库 crate 通常是 *src/lib.rs*，二进制 crate 通常是 *src/main.rs*）
- 声明模块
  - 在 crate 根文件中，你可以声明一个新模块，例如：`mod garden;` 声明了一个名为 `garden` 的模块。编译器会在下列路径中寻找模块代码：
    - 内联，在大括号中，当 `mod garden` 后方不是一个分号而是一个大括号（`mod garden {}`）
    - 在文件 *src/garden.rs*
    - 在文件 *src/garden/mod.rs*
- 声明子模块
  - 在除了 crate 根节点以外的其他文件中，你可以定义子模块，例如你可能在 *src/garden.rs* 中定义了 `mod vegetables;`。编译器会在父模块命名的目录中继续寻找子模块代码：
    - 内联，在大括号中，当 `mod vegetables` 后方不是一个分号而是一个大括号
    - 在文件 *src/garden/vegetables.rs*
    - 在文件 *src/garden/vegetables/mod.rs*
- 模块中的代码路径
  - 一旦一个模块是你 crate 的一部分，你可以在隐私规则允许的前提下，从同一个 crate 内的任意地方，通过代码路径引用该模块的代码。
  - 例如：一个 garden vegetables 模块下的 `Asparagus` 类型可以在 `crate::garden::vegetables::Asparagus` 被找到。
- 私有 vs 公用
  - 一个模块里的代码默认对其父模块私有。为了让一个模块公用，应当在声明时使用 `pub mod` 代替 `mod`。为了使一个公用模块的内部成员公用，应当在声明前使用 `pub`。
- `use` 关键字
  - 在一个作用域内，`use` 关键字创建了一个成员的快捷方式，用来减少长路径的重复。
  - 在任何可以引用 `crate::garden::vegetables::Asparagus` 的作用域，你可以通过 `use crate::garden::vegetables::Asparagus;` 创建一个快捷方式，随后你在作用域中就可以直接使用 `Asparagus` 来使用该类型。

::: code-group
```rs [main.rs]
// src/main.rs
use crate::garden::vegetables::Asparagus;

pub mod garden;

fn main() {
    let plant = Asparagus {};
    println!("I'm growing {:?}!", plant);
}

```

```rs [garden.rs]
// src/garden.rs
pub mod vegetables;
```

```rs [vegetables.rs]
// src/garden/vegetables.rs
#[derive(Debug)]
pub struct Asparagus {}
```
:::

在模块中对相关代码进行分组

模块可以让我们将一个 crate 中的代码进行分组，以提高可读性和可重用性。因为第一个模块中的代码默认是私有的，所以还可以利用模块控制项的私有性。

```rs
// src/lib.rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

模块定义以 `mod` 开始，然后指定模块的名字：`front_of_house`。

在模块内，我们还可以定义其他的模块：`hosting` 和 `serving` 模块。

模块中还可以保存一些定义的其他项，如结构体、枚举、常量、特性、函数。

这样的结构组成了一个模块树：

- crate
  - front_of_house
    - hosting
      - add_to_waitlist
      - seat_at_table
    - serving
      - take_order
      - serve_order
      - take_payment

Rust 在模块树中找到一个项的位置，需要知道引用模块的路径：

- 绝对路径
  - 以 crate 根开头的全路径；
  - 对于外部 crate 的代码，是以 crate 名开头的绝对路径
  - 对于当前 crate 的代码，则以 `crate` 开头
- 相对路径
  - 从当前模块开始，以 `self`、`super` 或定义在当前模块中的标识符开头

绝对路径和相对路径都后跟一个或多个由双冒号（`::`）分割的标识符：

以之前的例子为例，我们希望在模块中调用 `add_to_waitlist` 函数：

```rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}
```

代码中使用 `pub` 关键字声明 `hosting` 模块是一个公共模块、模块内的 `add_to_waitlist` 函数是一个公共函数。父模块可以访问到公共子模块中的公共 `add_to_waitlist` 函数。

::: tip
二进制和库 crate 包的最佳实践

我们提到过包可以同时包含一个 *src/main.rs* 二进制 crate 根和一个 *src/lib.rs* 库 crate 根，并且这两个 crate 默认以包名来命名。通常这种包含二进制 crate 和库 crate 的模式的包，在二进制 crate 中只有足够的代码来启动一个可执行文件，在可执行文件中调用库 crate 的代码。

模块树应当定义在 *src/lib.rs* 中，这样通过以包名开头的路径，公有项就可以在二进制 crate 中使用。二进制 crate 就完全变成了同其他外部 crate 一样的库 crate 的用户：它只能使用共有 API。
:::

我们可以在路径的开头使用 `super`，从父模块开始构建相对路径，而不是从当前模块或者根开始。这类似以 `..` 语法开始一个文件系统路径。使用 `super` 允许我们引用父模块中的已知项目。

这带来一个好处：当前模块与父模块关联得更紧密，某天父模块可能要移动到模块树的其他位置时，前模块不必做任何调整。

```rs {6}
fn deliver_order() {}

mod back_of_house() {
    fn fix_incorrect_order() {
        cook_order();
        super::deliver_order();
    }

    fn cook_order() {}
}
```

可以直接在子模块中通过 `super::deliver_order()` 调用父模块中的 `deliver_order` 函数。

我们可以使用 `pub` 将结构体或枚举标记为公有，但是结构体中的字段依然是私有的，需要我们单独决定某些字段是否公有。

```rs
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    let mut meal = back_of_house::Breakfast::summer("Rye"); // 黑麦面包

    mea.toast = String::from("Wheat"); // 小麦面包
    println!("{}", meal.toast);

    // 不允许访问私有字段
    // meal.seasonal_fruit = String::from("blueberries");
}
```

如果 `Breakfast` 没有暴露出 `summer` 这个方法，那么我们将无法创建 `Breakfast` 实例，因为 `seasonal_fruit` 这个字段是私有的，我们不能设置它的值。

如果我们将枚举设为公有，那么它的所有成员都将变为公有：

```rs
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

### 使用 use 关键字将路径引入作用域

先看看没有 `use` 关键字的世界：

```rs {7}
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    front_of_house::hosting::add_to_waitlist();
}
```

必须通过 `模块名:子模块名:方法名` 才能调用到模块内的函数，可以用 `use` 关键字来简化这一操作：

```rs {1,4}
use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

上面的代码中，路径被简化为了 `hosting`，现在 `hosting` 就在作用域中可用了

::: warning
注意 `use` 只能创建 `use` 所在的特定作用域内的短路径。

下例中 `eat_at_restaurant` 函数移动到了一个叫 `customer` 的子模块，这又是一个不同于 `use` 语句的作用域，所以函数体不能编译。
:::

```rs
// 此代码无法通过编译
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;

mod customer {
    pub fn eat_at_restaurant() {
        hosting::add_to_waitlist();
    }
}
```

可以通过两种方法修改代码让其可以正常编译：

- 将 `use` 调用移动到子模块 `consumer` 中；
- 在子模块 `consumer` 中通过 `super::hosting` 引用父模块中的短路径。

在引入第三方 crate 时，一个通常的约定是：

- 引入的是函数时，需要在调用函数时指定父模块，以表明函数并不是在本地被定义的；
  - 要引入两个模块的同名函数时，父模块可以帮助我们区分它们
- 引入的是结构体、枚举时，习惯指定它们的完整路径。

```rs
// 将 `HashMap` 引入作用域的习惯用法
use std::collections:HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}
```

另外，如果你真的希望从两个模块中引入同名函数，可以使用 `as` 关键字提供新的名称：

```rs
use std::fmt::Result;
use std::io::Result as IoResult;

fn func1() -> Result {
    // ...
}

fn func2() -> IoResult<()> {
    // ...
}
```

使用 `pub use` 重导出名称：

```rs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

// 这里将 hosting 重导出了
pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

在重导出之前，外部如果要调用 `add_to_waitlist` 函数，需要：`restaurant::front_of_house::hosting::add_to_waitlist()`。在完成重导出后，只需要 `restaurant::hosting::add_to_waitlist()` 即可。

使用外部包一样可以使用 `use` 来将其引入到当前作用域。

下面的代码将 `rand` 包中的 `Rng` trait 引入作用域，并调用 `rand::thread_rng` 函数：

```rs
use rand:Rng;
fn main() {
    let secret_number = rand::thread_rng().gen_range(1..=100);
}
```

需要注意的是，`std` 标准库对于你的包来说也是一个外部 crate，但因为标准库随着 Rust 语言一同分发，因此无需修改 *Cargo.toml* 来引入 `std`，但需要通过 `use` 将标准库中定义的内容引入项目包中的作用域来使用它们，例如我们常用的 `HashMap`：

```rs
use std::collections::HashMap;
```

当我们需要重复从 `std` 导入时，可以使用 `{}` 嵌套路径来消除重复的 `use`：

```rs
use std::cmp::Ordering; // [!code --]
use std::io; // [!code --]
use std::{cmp::Ordering, io}; // [!code ++]
```

可以在嵌套路径中使用 `self` 代表要引入当前的路径内容：

```rs
use std::io; // [!code --]
use std::io::Write; // [!code --]
use std::io::{self, Write}; // [!code ++]
```

通过 glob 运算符将**所有**的公有定义引入作用域：

```rs
use std::collections::*;
```

::: warning
这个 `use` 语句将 `std::collections` 中定义的所有公有项引入当前作用域。使用 `glob` 运算符时请多加小心！

Glob 会使得我们难以推导作用域中有什么名称和它们是在何处定义的。
:::

glob 运算符常常用于测试模块 `tests` 中，这时会将所有内容引入作用域。

将模块拆分为多个文件

在一个文件中定义多个模块时，随着模块内容增长，文件会变得更大且代码不容易阅读，此时我们可以将模块拆分到不同的文件中。

crate 的根文件是 *src/lib.rs*，我们可以渐进式地将模块拆分到各自的文件中。

```rs
// src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}
```

只需要在模块树中的某处使用一次 `mod` 声明就可以加载这个文件。一旦编译器知道了这个文件是项目的一部分（并且通过 `mod` 语句的位置就知道了代码在代码树中的位置），项目中的其他文件应该使用其所声明的位置的路径来引用那个文件的代码。

换句话说，`mod` 不是你可能会在其他编程语言中看到的 “include” 操作。

下面我们将 `hosting` 模块提取到单独的文件中，因为 `hosting` 是 `front_of_house` 的子模块而不是根模块：

::: code-group

```rs [front_of_house.rs]
// src/front_of_house.rs
pub mod hosting;
```

```rs [hosting.rs]
// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

:::

