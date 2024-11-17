import{_ as i,o as a,c as n,ag as h}from"./chunks/framework.D__0zeO9.js";const o=JSON.parse('{"title":"一文读懂伪类与伪元素","description":"","frontmatter":{},"headers":[],"relativePath":"article/一文读懂伪类与伪元素.md","filePath":"article/一文读懂伪类与伪元素.md","lastUpdated":1731851683000}'),l={name:"article/一文读懂伪类与伪元素.md"};function t(p,s,e,k,d,r){return a(),n("div",null,s[0]||(s[0]=[h(`<h1 id="一文读懂伪类与伪元素" tabindex="-1">一文读懂伪类与伪元素 <a class="header-anchor" href="#一文读懂伪类与伪元素" aria-label="Permalink to &quot;一文读懂伪类与伪元素&quot;">​</a></h1><h2 id="🔰-什么是伪类" tabindex="-1">🔰 什么是伪类？ <a class="header-anchor" href="#🔰-什么是伪类" aria-label="Permalink to &quot;🔰 什么是伪类？&quot;">​</a></h2><p>伪类是添加到选择器的 <strong>关键字</strong> ，指定要选择的元素的特殊状态。</p><h3 id="典型的伪类关键字" tabindex="-1">典型的伪类关键字 <a class="header-anchor" href="#典型的伪类关键字" aria-label="Permalink to &quot;典型的伪类关键字&quot;">​</a></h3><p>在大多数情况下，<strong>伪类都与基础选择器搭配使用</strong>，下述是伪类在一些典型场景下的应用。</p><h4 id="hover" tabindex="-1"><code>:hover</code> <a class="header-anchor" href="#hover" aria-label="Permalink to &quot;\`:hover\`&quot;">​</a></h4><p>指针在 <code>&lt;button&gt;</code> 上悬停，但没有激活它时，按钮颜色变为蓝色</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:hover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p><strong>注意</strong>: 在触摸屏上 <code>:hover</code> 基本不可用。不同的浏览器上<code>:hover</code> 伪类表现不同。网页开发人员不要让任何内容只能通过悬停才能展示出来，不然这些内容对于触摸屏使用者来说是很难或者说不可能看到。</p></blockquote><h4 id="not" tabindex="-1"><code>:not</code> <a class="header-anchor" href="#not" aria-label="Permalink to &quot;\`:not\`&quot;">​</a></h4><p><strong><code>:not()</code></strong> 用来匹配不符合一组选择器的元素。由于它的作用是防止特定的元素被选中，它也被称为<em>反选伪类</em>（<em>negation pseudo-class</em>）。</p><p>将所有不是<code>&lt;p&gt;</code>的元素颜色改为蓝色：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">body</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:not</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 实测下述代码没有效果 */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:not</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">p</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p><strong>注意</strong>: 在触摸屏上 <code>:hover</code> 基本不可用。不同的浏览器上<code>:hover</code> 伪类表现不同。网页开发人员不要让任何内容只能通过悬停才能展示出来，不然这些内容对于触摸屏使用者来说是很难或者说不可能看到。</p></blockquote><h4 id="first-child" tabindex="-1"><code>:first-child</code> <a class="header-anchor" href="#first-child" aria-label="Permalink to &quot;\`:first-child\`&quot;">​</a></h4><p>给所有 <code>&lt;ul&gt;</code> 下的第一个 <code>&lt;li&gt;</code> 应用不同的样式</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ul</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> li</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">ul</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> li</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:first-child</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  font-weight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">bold</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h4 id="active" tabindex="-1"><code>:active</code> <a class="header-anchor" href="#active" aria-label="Permalink to &quot;\`:active\`&quot;">​</a></h4><p><code>:active</code> 表示的是鼠标从按下到松开的时间，下述代码表示 <code>&lt;a&gt;</code> 在不同状态下的样式。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:link</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">blue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }          </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 未访问链接 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:visited</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">purple</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 已访问链接 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:hover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">background</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">yellow</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 用户鼠标悬停 */</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:active</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; }         </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 激活链接 */</span></span></code></pre></div><blockquote><p><strong>注意</strong>: <code>:active</code> 赋予的样式可能会被后声明的其他链接相关的伪类覆盖。为保证样式生效，需要把 <code>:active</code> 的样式放在所有链接相关的样式之后。</p></blockquote><p>这种链接伪类先后顺序被称为 <em>LVHA 顺序</em>：<code>:link</code> &gt; <code>:visited</code> &gt; <code>:hover</code> &gt; <code>:active</code>。</p><h3 id="单独使用的伪类关键字" tabindex="-1">单独使用的伪类关键字 <a class="header-anchor" href="#单独使用的伪类关键字" aria-label="Permalink to &quot;单独使用的伪类关键字&quot;">​</a></h3><p>我们常见的伪类关键字的特征是以单个冒号<code>:</code>开头，跟随在基础选择器后面。</p><p><strong>但是单独使用的伪类关键字也可以对页面产生效果，</strong> 例如：</p><p>通过 <code>:focus</code> 伪类，可以让任何元素获得焦点后的颜色变为红色。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">:focus</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">red</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>更多伪类，见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95" target="_blank" rel="noreferrer">MDN - 标准伪类索引</a></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d77fd1d23840415ca645e9429237b6dc~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><h2 id="🔰-什么是伪元素" tabindex="-1">🔰 什么是伪元素？ <a class="header-anchor" href="#🔰-什么是伪元素" aria-label="Permalink to &quot;🔰 什么是伪元素？&quot;">​</a></h2><p>伪元素是一个<strong>附加至选择器末的关键词</strong>，允许你对被选择元素的特定部分修改样式。</p><p>与伪类相同，一个选择器中只能使用一个伪元素。但是，<strong>伪元素必须紧跟在语句中的基础选择器之后</strong>。</p><p>例如，下述代码可以给页面中每个 <code>&lt;a&gt;</code> 标签前添加一个😃表情。</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">a</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">::before</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;😃&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>相比于伪类，伪元素的使用方式更加固定，其基本语法：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">selector::</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">pseudo-element</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  property</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><blockquote><p><strong>注意</strong>: 在书写伪元素时，你会见到单冒号 <code>:</code> 的写法，但此为CSS2过时语法，仅用于支持IE8，大多情况请书写双冒号 <code>::</code> 来表示伪元素。</p></blockquote><p>更多伪元素见 <a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements#%E6%A0%87%E5%87%86%E4%BC%AA%E5%85%83%E7%B4%A0%E7%B4%A2%E5%BC%95" target="_blank" rel="noreferrer">MDN - 标准伪元素索引</a></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17049cd3157f4a368c98d4fcd905c064~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><h2 id="📌-伪类与伪元素共同使用" tabindex="-1">📌 伪类与伪元素共同使用 <a class="header-anchor" href="#📌-伪类与伪元素共同使用" aria-label="Permalink to &quot;📌 伪类与伪元素共同使用&quot;">​</a></h2><p>下面一个案例中，同时用到了伪类和伪元素：</p><blockquote><p>用CSS实现一个开关样式，hover时触发，滑块为正方形，具体大小可随意，如下图</p></blockquote><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6e4b09bb9e64989b0561d48d10a2734~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><blockquote><p>尽量实现如下要求，可实现一部分：</p><ol><li>开关动作均有动画过度（滑块移位、背景色）</li><li>只用一个dom元素实现</li><li>开关的高度是固定的，但宽度不固定，即宽度为未知父元素的100%，宽度始终大于高度</li></ol></blockquote><h3 id="题目解读" tabindex="-1">题目解读 <a class="header-anchor" href="#题目解读" aria-label="Permalink to &quot;题目解读&quot;">​</a></h3><p>由于只能使用一个 <code>DOM</code> 元素，而要区分滑块和背景的不同状态，故使用伪元素 <code>::before</code> 在 <code>.box</code> 内部添加一个滑块，滑块采用 <code>inline-block</code> 方式展示，并且由 <code>transition</code> 属性指定过渡动画。</p><p>对于背景也采用了 <code>transition</code> 来指定过渡动画，并且二者都通过 <code>:hover</code> 触发。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ac690e718be445083bc67b7bbcccb7e~tplv-k3u1fbpfcp-watermark.image?" alt="image.png" loading="lazy"></p><h3 id="实现代码" tabindex="-1">实现代码 <a class="header-anchor" href="#实现代码" aria-label="Permalink to &quot;实现代码&quot;">​</a></h3><p><code>HTML</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;father&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;box&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p><code>CSS</code></p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">50</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#c2d3e4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: background-color </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0.25</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">s</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box::before</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  content</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;b&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">white</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  display</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">inline-block</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">white</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">relative</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">40</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">35</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  transition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">left</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0.25</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">s</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box:hover</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  background-color</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">#348fe4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box:hover::before</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">60</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 父元素宽度任意 */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.father</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="相关链接" tabindex="-1">相关链接 <a class="header-anchor" href="#相关链接" aria-label="Permalink to &quot;相关链接&quot;">​</a></h3><p><a href="https://code.juejin.cn/pen/7088328950488760334" target="_blank" rel="noreferrer">代码片段</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Selectors" target="_blank" rel="noreferrer"><code>CSS选择器</code></a></p>`,56)]))}const c=i(l,[["render",t]]);export{o as __pageData,c as default};
