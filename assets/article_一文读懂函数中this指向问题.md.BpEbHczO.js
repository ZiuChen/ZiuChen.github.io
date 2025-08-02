import{_ as n,c as a,o as p,at as e}from"./chunks/framework.abbEBnpT.js";const u=JSON.parse('{"title":"一文读懂函数中this指向问题","description":"","frontmatter":{},"headers":[],"relativePath":"article/一文读懂函数中this指向问题.md","filePath":"article/一文读懂函数中this指向问题.md","lastUpdated":1754111533000}'),l={name:"article/一文读懂函数中this指向问题.md"};function o(i,s,c,t,d,h){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="一文读懂函数中this指向问题" tabindex="-1">一文读懂函数中this指向问题 <a class="header-anchor" href="#一文读懂函数中this指向问题" aria-label="Permalink to &quot;一文读懂函数中this指向问题&quot;">​</a></h1><h2 id="函数中this指向" tabindex="-1">函数中this指向 <a class="header-anchor" href="#函数中this指向" aria-label="Permalink to &quot;函数中this指向&quot;">​</a></h2><p>函数在调用时, Javascript会默认为this绑定一个值</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 定义一个函数</span></span>
<span class="line"><span>function foo() {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 1. 直接调用</span></span>
<span class="line"><span>foo() // Window</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 2. 绑定对象调用</span></span>
<span class="line"><span>const obj = { name: &#39;ziu&#39;, aaa: foo }</span></span>
<span class="line"><span>obj.aaa() // obj</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 3. 通过call/apply调用</span></span>
<span class="line"><span>foo.call(&#39;Ziu&#39;) // String {&#39;Ziu&#39;}</span></span></code></pre></div><p>this的绑定:</p><ul><li>和定义的位置没有关系</li><li>和调用方式/调用位置有关系</li><li>是在运行时被绑定的</li></ul><p><strong>this始终指向最后调用它的对象</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function foo() {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>foo() // Window</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const obj = {</span></span>
<span class="line"><span>  name: &#39;ziu&#39;,</span></span>
<span class="line"><span>  bar: function () {</span></span>
<span class="line"><span>    console.log(this)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>obj.bar() // obj</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const baz = obj.bar</span></span>
<span class="line"><span>baz() // Window</span></span></code></pre></div><h2 id="如何改变this的指向" tabindex="-1">如何改变this的指向 <a class="header-anchor" href="#如何改变this的指向" aria-label="Permalink to &quot;如何改变this的指向&quot;">​</a></h2><h3 id="new-实例化一个函数" tabindex="-1">new 实例化一个函数 <a class="header-anchor" href="#new-实例化一个函数" aria-label="Permalink to &quot;new 实例化一个函数&quot;">​</a></h3><blockquote><p>new一个对象时发生了什么:</p><ol start="0"><li>创建一个空对象</li><li>这个空对象会被执行prototype连接</li><li>将this指向这个空对象</li><li>执行函数体中的代码</li><li>没有显式返回这个对象时 会默认返回这个对象</li></ol></blockquote><p>函数可以作为一个构造函数, 作为一个类, 可以通过new关键字将其实例化</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function foo() {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>  this.name = &#39;Ziu&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>foo() // 直接调用的话 this为Window</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>new foo() // 通过new关键字调用 则this指向空对象</span></span></code></pre></div><h3 id="使用-call-apply-bind" tabindex="-1">使用 call apply bind <a class="header-anchor" href="#使用-call-apply-bind" aria-label="Permalink to &quot;使用 call apply bind&quot;">​</a></h3><p>在 JavaScript 中, 函数是对象。</p><p>JavaScript 函数有它的属性和方法。call() 和 apply() 是预定义的函数方法。</p><p>两个方法可用于调用函数，两个方法的第一个参数必须是对象本身</p><hr><p>要将<code>foo</code>函数中的<code>this</code>指向<code>obj</code>，可以通过赋值的方式：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>obj.foo = foo // 绑定</span></span>
<span class="line"><span>obj.foo() // 调用</span></span></code></pre></div><p>但是也可以通过对函数调用call / apply实现</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var obj = {</span></span>
<span class="line"><span>  name: &#39;Ziu&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>function foo() {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>foo.call(obj) // 将foo执行时的this显式绑定到了obj上 并调用foo</span></span>
<span class="line"><span>foo.call(123) // foo的this被绑定到了 Number { 123 } 上</span></span>
<span class="line"><span>foo.call(&quot;ziu&quot;) // 绑定到了 String { &quot;ziu&quot; } 上</span></span></code></pre></div><h4 id="包装类对象" tabindex="-1">包装类对象 <a class="header-anchor" href="#包装类对象" aria-label="Permalink to &quot;包装类对象&quot;">​</a></h4><p>当我们直接使用类似：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;ZiuChen&quot;.length</span><span> // String.length</span></span></code></pre></div><p>的语句时，<code>JS</code>会为字符串 <code>ZiuChen</code> 包装一个对象，随后在这个对象上调用 <code>.length</code> 属性</p><h4 id="call和apply的区别" tabindex="-1">call和apply的区别 <a class="header-anchor" href="#call和apply的区别" aria-label="Permalink to &quot;call和apply的区别&quot;">​</a></h4><ul><li><p>相同点：第一个参数都是相同的，要求传入一个对象</p><ul><li>在函数调用时，会将this绑定到这个传入的对象上</li></ul></li><li><p>不同点：后面的参数</p><ul><li>apply 传入的是一个数组</li><li>call 传入的是参数列表</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function foo(name, age, height) {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>foo(&#39;Ziu&#39;, 18, 1.88)</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>foo.apply(&#39;targetThis&#39;, &#39;Ziu&#39;, 18, 1.88)</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>foo.call(&#39;targetThis&#39;, [&#39;Ziu&#39;, 18, 1.88])</span></span></code></pre></div><p>当我们需要给一个带参数的函数通过call/apply的方式绑定this时，就需要使用到call/apply的第二个入参了。</p><h4 id="参数列表" tabindex="-1">参数列表 <a class="header-anchor" href="#参数列表" aria-label="Permalink to &quot;参数列表&quot;">​</a></h4><p>当传入函数的参数有多个时，可以通过<code>...args</code>将参数合并到一个数组中去</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>function foo(...args) {</span></span>
<span class="line"><span>  console.log(args)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>​</span></span>
<span class="line"><span>foo(&quot;Ziu&quot;, 18, 1.88) // [&quot;Ziu&quot;, 18, 1.88]</span></span></code></pre></div><h4 id="bind绑定" tabindex="-1">bind绑定 <a class="header-anchor" href="#bind绑定" aria-label="Permalink to &quot;bind绑定&quot;">​</a></h4><p>如果我们希望：在每次调用<code>foo</code>时，都能将<code>obj</code>绑定到<code>foo</code>的<code>this</code>上，那么就需要用到<code>bind</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// 将obj绑定到foo上</span></span>
<span class="line"><span>const fun = foo.bind(obj)</span></span>
<span class="line"><span>// 在后续每次调用foo时, foo内的this都将指向obj</span></span>
<span class="line"><span>fun() // obj</span></span>
<span class="line"><span>fun() // obj</span></span></code></pre></div><p><code>bind()</code>方法将创建一个新的函数，当被调用时，将其<code>this</code>关键字</p><h2 id="箭头函数" tabindex="-1">箭头函数 <a class="header-anchor" href="#箭头函数" aria-label="Permalink to &quot;箭头函数&quot;">​</a></h2><p>箭头函数是<code>ES6</code>新增的编写函数的方式，更简洁。</p><ul><li>箭头函数不会绑定<code>this</code>、<code>argument</code>属性</li><li>箭头函数不能作为构造函数来使用（不能与<code>new</code>同用，会报错）</li></ul><h3 id="箭头函数中的this" tabindex="-1">箭头函数中的this <a class="header-anchor" href="#箭头函数中的this" aria-label="Permalink to &quot;箭头函数中的this&quot;">​</a></h3><p>在箭头函数中是没有<code>this</code>的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const foo = () =&gt; {</span></span>
<span class="line"><span>  console.log(this)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>foo() // window</span></span>
<span class="line"><span>console.log(this) // window</span></span></code></pre></div><p>之所以找到了<code>Window</code>对象，是因为在调用<code>foo()</code>时，函数内部作用域并没有找到<code>this</code>，转而向上层作用域找<code>this</code></p><p>因此找到了顶层的全局<code>this</code>，也即<code>Window</code>对象</p><h3 id="箭头函数中this的查找规则" tabindex="-1">箭头函数中this的查找规则 <a class="header-anchor" href="#箭头函数中this的查找规则" aria-label="Permalink to &quot;箭头函数中this的查找规则&quot;">​</a></h3><p>检查以下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = {</span></span>
<span class="line"><span>  name: &quot;obj&quot;,</span></span>
<span class="line"><span>  foo: function () {</span></span>
<span class="line"><span>    const bar = () =&gt; {</span></span>
<span class="line"><span>      console.log(this)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return bar</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const fn = obj.foo()</span></span>
<span class="line"><span>fn() // obj</span></span></code></pre></div><p>代码执行完毕，控制台输出<code>this</code>值为<code>obj</code>对象，这是为什么？</p><p>箭头函数中没有<code>this</code>，故会向上层作用域寻找<code>this</code>，<code>bar</code>的上层作用域为函数<code>foo</code>，而函数<code>foo</code>的<code>this</code>由其调用决定</p><p>调用<code>foo</code>函数的为<code>obj</code>对象，故内部箭头函数中的<code>this</code>指向的是<code>obj</code></p><p>检查以下代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const obj = {</span></span>
<span class="line"><span>  name: &quot;obj&quot;,</span></span>
<span class="line"><span>  foo: () =&gt; {</span></span>
<span class="line"><span>    const bar = () =&gt; {</span></span>
<span class="line"><span>      console.log(this)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return bar</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>const fn = obj.foo()</span></span>
<span class="line"><span>fn() // Window</span></span></code></pre></div><p>和上面的代码不同之处在于：<code>foo</code>也是由箭头函数定义的，<code>bar</code>向上找不到<code>foo</code>的<code>this</code>，故而继续向上，找到了全局<code>this</code>，也即<code>Window</code>对象</p><h3 id="严格模式" tabindex="-1">严格模式 <a class="header-anchor" href="#严格模式" aria-label="Permalink to &quot;严格模式&quot;">​</a></h3><ul><li>在严格模式下，全局的<code>this</code>不是<code>Window</code>对象，而是<code>undefined</code>。</li><li>在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。</li><li>在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。</li></ul><h2 id="this面试题" tabindex="-1">this面试题 <a class="header-anchor" href="#this面试题" aria-label="Permalink to &quot;this面试题&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var name = &#39;window&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var person = {</span></span>
<span class="line"><span>  name: &#39;person&#39;,</span></span>
<span class="line"><span>  sayName: function () {</span></span>
<span class="line"><span>    console.log(this.name)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function sayName() {</span></span>
<span class="line"><span>  var sss = person.sayName</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  sss() // 默认绑定: window</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  person.sayName();  // 隐式绑定: person</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  (person.sayName)() // 隐式绑定: person, 本质与上一行代码相同</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ;(person.sayName = person.sayName)()</span><span> // 间接调用: window</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sayName()</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>var name = &#39;window&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var person1 = {</span></span>
<span class="line"><span>  name: &#39;person1&#39;,</span></span>
<span class="line"><span>  foo1: function () {</span></span>
<span class="line"><span>    console.log(this.name)</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  foo2: () =&gt; console.log(this.name),</span></span>
<span class="line"><span>  foo3: function () {</span></span>
<span class="line"><span>    return function () {</span></span>
<span class="line"><span>      console.log(this.name)</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  foo4: function () {</span></span>
<span class="line"><span>    return () =&gt; console.log(this.name)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var person2 = {</span></span>
<span class="line"><span>  name: &#39;person2&#39;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>person1.foo1() // 隐式绑定: person1</span></span>
<span class="line"><span>person1.foo1.call(person2) // 显式绑定: person2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>person1.foo2() // 上层作用域: window</span></span>
<span class="line"><span>person1.foo2.call(person2) // 上层作用域: window</span></span>
<span class="line"><span></span></span>
<span class="line"><span>person1.foo3()() // 默认绑定: window</span></span>
<span class="line"><span>person1.foo3.call(person2)() // 默认绑定: window</span></span>
<span class="line"><span>person1.foo3().call(person2) // 显式绑定: person2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>person1.foo4()() // 隐式绑定: person1</span></span>
<span class="line"><span>person1.foo4.call(person2)() // 显式绑定: person2</span></span>
<span class="line"><span>person1.foo4().call(person2) // 隐式绑定: person1</span></span></code></pre></div>`,59)]))}const b=n(l,[["render",o]]);export{u as __pageData,b as default};
