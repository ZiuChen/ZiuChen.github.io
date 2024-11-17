import{_ as s,o as e,c as n,ag as p}from"./chunks/framework.D__0zeO9.js";const u=JSON.parse('{"title":"深入理解浏览器运行原理","description":"","frontmatter":{},"headers":[],"relativePath":"article/深入理解浏览器运行原理.md","filePath":"article/深入理解浏览器运行原理.md","lastUpdated":1731851683000}'),i={name:"article/深入理解浏览器运行原理.md"};function l(t,a,o,c,d,r){return e(),n("div",null,a[0]||(a[0]=[p(`<h1 id="深入理解浏览器运行原理" tabindex="-1">深入理解浏览器运行原理 <a class="header-anchor" href="#深入理解浏览器运行原理" aria-label="Permalink to &quot;深入理解浏览器运行原理&quot;">​</a></h1><h2 id="网页解析过程" tabindex="-1">网页解析过程 <a class="header-anchor" href="#网页解析过程" aria-label="Permalink to &quot;网页解析过程&quot;">​</a></h2><p>输入域名 =&gt; DNS解析为IP =&gt; 目标服务器返回<code>index.html</code></p><blockquote><p>DNS：Domain Name System</p></blockquote><h2 id="html解析过程" tabindex="-1">HTML解析过程 <a class="header-anchor" href="#html解析过程" aria-label="Permalink to &quot;HTML解析过程&quot;">​</a></h2><ul><li>浏览器开始解析<code>index.html</code>文件，当遇到<code>&lt;link&gt;</code>则向服务器请求下载<code>.css</code>文件</li><li>遇到<code>&lt;script&gt;</code>标签则向服务器请求下载<code>.js</code>文件</li></ul><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a90afa7c2534ae78f3eab9200a0095b~tplv-k3u1fbpfcp-watermark.image?" alt="浏览器解析HTML过程" width="70%"><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/630cf2fd1d3748d6846fe7f2ab99a01b~tplv-k3u1fbpfcp-watermark.image?" alt="浏览器是和如何工作的" width="70%"><p><a href="https://web.dev/howbrowserswork/" target="_blank" rel="noreferrer">How browsers work</a></p><h2 id="生成css规则" tabindex="-1">生成CSS规则 <a class="header-anchor" href="#生成css规则" aria-label="Permalink to &quot;生成CSS规则&quot;">​</a></h2><p>在解析的过程中，如果遇到<code>&lt;link&gt;</code>元素，那么会由浏览器负责下载对应的CSS文件</p><ul><li>注意：下载CSS文件不会影响到DOM解析</li><li>有单独一个线程对CSS文件进行下载与解析</li></ul><p>浏览器下载完CSS文件后，就会对CSS文件进行解析，解析出对应的规则树：</p><ul><li>我们可以称之为CSSOM（CSS Object Model，CSS对象模型）</li></ul><h2 id="构建render-tree" tabindex="-1">构建Render Tree <a class="header-anchor" href="#构建render-tree" aria-label="Permalink to &quot;构建Render Tree&quot;">​</a></h2><p>有了DOM Tree和CSSOM Tree之后，就可以将二者结合，构建Render Tree了</p><p>此时，如果有某些元素的CSS属性<code>display: none;</code>那么这个元素就不会出现在Render Tree中</p><ul><li>下载和解析CSS文件时，不会阻塞DOM Tree的构建过程</li><li>但会阻塞Render Tree的构建过程：因为需要对应的CSSOM Tree</li></ul><h2 id="布局和绘制-layout-paint" tabindex="-1">布局和绘制(Layout &amp; Paint) <a class="header-anchor" href="#布局和绘制-layout-paint" aria-label="Permalink to &quot;布局和绘制(Layout &amp; Paint)&quot;">​</a></h2><p>第四步是在渲染树（Render Tree）上运行布局（Layout），以计算每个节点的几何体</p><ul><li>渲染树会表示显示哪些节点以及其他的样式，但是不表示每个节点的尺寸、位置等信息</li><li>布局是确定呈现树中所有节点的宽度、高度和位置信息</li></ul><p>第五步是将每个节点绘制（Paint）到屏幕上</p><ul><li>在绘制阶段，浏览器布局阶段计算的每个frame转为屏幕上实际的像素点</li><li>包括将元素的可见部分进行绘制，比如文本、颜色、边框、阴影、替换元素</li></ul><h2 id="回流和重绘-reflow" tabindex="-1">回流和重绘(Reflow &amp; ) <a class="header-anchor" href="#回流和重绘-reflow" aria-label="Permalink to &quot;回流和重绘(Reflow &amp; )&quot;">​</a></h2><p>回流也可称为重排</p><p>理解回流（Reflow）：</p><ul><li>第一次确定节点的大小和位置，称之为布局（layout）</li><li>之后对节点的大小、位置修改重新计算，称之为回流</li></ul><p>什么情况下会引起回流？</p><ul><li>DOM 结构发生改变（添加新的节点或者移除节点）</li><li>改变了布局（修改了width height padding font-size等值）</li><li>窗口resize（修改了窗口的尺寸等）</li><li>调用getComputedStyle方法获取尺寸、位置信息</li></ul><p>理解重绘（Repaint）：</p><ul><li>第一次渲染内容称之为绘制（paint）</li><li>之后的重新渲染称之为重绘</li></ul><p>什么情况下会引起重绘？</p><ul><li>修改背景色、文字颜色、边框颜色、样式等</li></ul><p><strong>回流一定会引起重绘，所以回流是一件很消耗性能的事情</strong></p><ul><li><p>开发中要尽量避免发生回流</p></li><li><p>修改样式尽量一次性修改完毕</p><ul><li>例如通过cssText一次性设置样式，或通过修改class的方式修改样式</li></ul></li><li><p>尽量避免频繁的操作DOM</p><ul><li>可以在一个DocumentFragment或者父元素中，将要操作的DOM操作完成，再一次性插入到DOM树中</li></ul></li><li><p>尽量避免通过getComputedStyle获取元素尺寸、位置等信息</p></li><li><p>对某些元素使用position的absolute或fixed属性</p><ul><li>并不是不会引起回流，而是开销相对较小，不会对其他元素产生影响</li></ul></li></ul><h2 id="特殊解析-composite合成" tabindex="-1">特殊解析: composite合成 <a class="header-anchor" href="#特殊解析-composite合成" aria-label="Permalink to &quot;特殊解析: composite合成&quot;">​</a></h2><p>在绘制的过程中，可以将布局后的元素绘制到多个合成图层中</p><ul><li>这是浏览器的一种优化手段</li><li>将不同流生成的不同Layer进行合并</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>标准流 =&gt; LayouTree =&gt; RenderLayer</span></span>
<span class="line"><span>\`position:fixed;\` =&gt; RenderLayer</span></span></code></pre></div><p>默认情况，标准流中的内容都是被绘制在同一个图层（Layer）中的</p><p>而一些特殊的属性，浏览器会创建一个新的合成层（CompositingLayer），并且新的图层可以利用GPU来加速绘制</p><ul><li>每个合成层都是单独渲染的</li><li>单独渲染可以避免所有的动画都在同一层中渲染导致性能问题</li><li>在各自的层中渲染完成后，只需要将渲染结果更新回合成层即可</li></ul><p>当元素具有哪些属性时，浏览器会为其创建新的合成层呢？</p><ul><li>3D Transforms</li><li>video canvas iframe</li><li>opacity 动画转换时</li><li>position: fixed</li><li>will-change: 一个实验性的属性，提前告诉浏览器此元素可能发生哪些变化</li><li>animation 或 transition设置了opacity、transform</li></ul><h3 id="案例1-同一层渲染" tabindex="-1">案例1：同一层渲染 <a class="header-anchor" href="#案例1-同一层渲染" aria-label="Permalink to &quot;案例1：同一层渲染&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.box1 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: red;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.box2 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>}</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;box1&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>  &lt;div class=&quot;box2&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span></code></pre></div><p>在开发者工具的图层工具中可以看到，两个元素<code>.box1</code> 和 <code>.box2</code>都是在一个层（Document）下渲染的：</p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/373fb3a4d5284e6c80c3ec519918e6e4~tplv-k3u1fbpfcp-watermark.image?" alt="image-20221122103111654.png" width="70%"><h3 id="案例2-分层渲染" tabindex="-1">案例2：分层渲染 <a class="header-anchor" href="#案例2-分层渲染" aria-label="Permalink to &quot;案例2：分层渲染&quot;">​</a></h3><p>当我们为<code>.box2</code>添加上<code>position: fixed;</code>属性，这时<code>.box2</code>将在由浏览器创建出来的合成层，分层单独渲染</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.box2 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  position: fixed;</span></span>
<span class="line"><span>}</span></span></code></pre></div><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6116d83ee8c041f586d627e549fdd5bf~tplv-k3u1fbpfcp-watermark.image?" alt="image-20221122103256116.png" width="70%"><h3 id="案例3-transform-3d" tabindex="-1">案例3：transform 3D <a class="header-anchor" href="#案例3-transform-3d" aria-label="Permalink to &quot;案例3：transform 3D&quot;">​</a></h3><p>为元素添加上<code>transform</code>属性时，浏览器也会为对应元素创建一个合成层，需要注意的是：只有3D的变化浏览器才会创建</p><p>如果是<code>translateX</code>或<code>translateY</code>则不会</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.box2 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  /* position: fixed; */</span></span>
<span class="line"><span>  transform: translateZ(10px);</span></span>
<span class="line"><span>}</span></span></code></pre></div><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/befb4826b079439f81c98b03586a36e5~tplv-k3u1fbpfcp-watermark.image?" alt="image-20221122103715428.png" width="70%"><h3 id="案例4-transition-transform" tabindex="-1">案例4：transition+transform <a class="header-anchor" href="#案例4-transition-transform" aria-label="Permalink to &quot;案例4：transition+transform&quot;">​</a></h3><p>当我们为元素添加上动画时，动画的中间执行过程的渲染会在新的图层上进行，但是中间动画渲染完成后，结果会回到原始图层上</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.box2 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  transition: transform 0.5s ease;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.box2:hover {</span></span>
<span class="line"><span>  transform: translateY(10px);</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li>这也是使用<code>transform</code>执行动画性能更高的原因，因为浏览器会为动画的执行过程单独创建一个合成层</li><li>如果是通过修改<code>top</code> <code>left</code>等定位属性实现的动画，是在原始的图层上渲染完成的。“牵一发则动全身”，动画过程中将导致整个渲染树回流与重绘，极大的影响性能</li></ul><h3 id="案例5-transition-opacity" tabindex="-1">案例5：transition+opacity <a class="header-anchor" href="#案例5-transition-opacity" aria-label="Permalink to &quot;案例5：transition+opacity&quot;">​</a></h3><p>与<code>transform</code>类似，使用<code>transition</code>过渡的<code>opacity</code>动画，浏览器也会为其创建一个合成层</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>.box2 {</span></span>
<span class="line"><span>  width: 100px;</span></span>
<span class="line"><span>  height: 100px;</span></span>
<span class="line"><span>  background-color: blue;</span></span>
<span class="line"><span>  opacity: 1;</span></span>
<span class="line"><span>  transition: opacity 0.5s ease;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>.box2:hover {</span></span>
<span class="line"><span>  opacity: 0.2;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h3><p>分层确实可以提高性能，但是它是以内存管理为代价的，因此不应当作为Web性能优化策略的一部分过度使用</p><h2 id="浏览器对script元素的处理" tabindex="-1">浏览器对script元素的处理 <a class="header-anchor" href="#浏览器对script元素的处理" aria-label="Permalink to &quot;浏览器对script元素的处理&quot;">​</a></h2><p>之前我们说到，在解析到<code>link</code>标签时，浏览器会异步下载其中的css文件，并在DOM树构建完成后，将其与CSS Tree合成为RenderTree</p><p>但是当浏览器解析到<code>script</code>标签时，整个解析过程将被阻塞，当前<code>script</code>标签后面的DOM树将停止解析，直到当前<code>script</code>代码被下载、解析、执行完毕，才会继续解析HTML，构建DOM树</p><p>为什么要这样做呢？</p><ul><li>这是因为Javascript的作用之一就是操作DOM，并且可以修改DOM</li><li>如果我们等到DOM树构建完成并且渲染出来了，再去执行Javascript，会造成回流和重绘，严重影响页面性能</li><li>所以当浏览器构建DOM树遇到<code>script</code>标签时，会优先下载和执行Javascript代码，而后再继续构建DOM树</li></ul><p>这也会带来新的问题，比如在现代的页面开发中：</p><ul><li>脚本往往比HTML更“重”，浏览器也需要花更多的时间去处理脚本</li><li>会造成页面的解析阻塞，在脚本下载、解析、执行完成之前，用户在界面上什么也看不到</li></ul><p>为了解决这个问题，浏览器的<code>script</code>标签为我们提供了两个属性（attribute）：<code>defer</code> 和 <code>async</code></p><h2 id="defer属性" tabindex="-1">defer属性 <a class="header-anchor" href="#defer属性" aria-label="Permalink to &quot;defer属性&quot;">​</a></h2><p><code>defer</code> 即推迟，为<code>script</code>标签添加这个属性，相当于告诉浏览器：不要等待此脚本下载，而是继续解析HTML，构建DOM Tree</p><ul><li>脚本将由浏览器进行下载，但是不会阻塞DOM Tree的构建过程</li><li>如果脚本提前下载好了，那么它会等待DOM Tree构建完成，在<code>DOMContentLoaded</code><strong>事件触发之前</strong>先执行<code>defer</code>中的代码</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;script&gt;</span></span>
<span class="line"><span>  console.log(&#39;script enter&#39;)</span></span>
<span class="line"><span>  window.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {</span></span>
<span class="line"><span>    console.log(&#39;DOMContentLoaded enter&#39;)</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>&lt;/script&gt;</span></span>
<span class="line"><span>&lt;script src=&quot;./defer.js&quot; defer&gt;&lt;/script&gt;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>// defer.js</span></span>
<span class="line"><span>console.log(&#39;defer script enter&#39;)</span></span></code></pre></div><p>上述代码在控制台的输出为：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>script enter</span></span>
<span class="line"><span>defer script enter</span></span>
<span class="line"><span>DOMContentLoaded enter</span></span></code></pre></div><ul><li>多个带<code>defer</code>的脚本也是按照自上至下的顺序执行的</li><li>从某种角度来说，<code>defer</code>可以提高页面的性能，并且推荐放到<code>head</code>元素中</li><li>注意：<code>defer</code>仅适用于外部脚本，对于<code>script</code>标签内编写的默认<code>JS</code>代码会被忽略掉</li></ul><h2 id="async属性" tabindex="-1">async属性 <a class="header-anchor" href="#async属性" aria-label="Permalink to &quot;async属性&quot;">​</a></h2><p><code>async</code>属性也可以做到：让脚本异步加载而不阻塞DOM树的构建，它与<code>defer</code>的区别：</p><ul><li>用<code>async</code>标记的脚本是<strong>完全独立</strong>的</li><li><code>async</code>脚本不能保证执行顺序，因为它是独立下载、独立运行，不会等待其他脚本</li><li>使用<code>async</code>标记的脚本不会保证它将在<code>DOMContentLoaded</code>之前或之后被执行</li></ul><p>要使用<code>async</code>属性标记的<code>script</code>操作DOM，必须在其中使用<code>DOMContentLoaded</code>监听器的回调函数，在该事件触发（DOM树构建完毕）后，执行相应的回调函数</p>`,87)]))}const b=s(i,[["render",l]]);export{u as __pageData,b as default};
