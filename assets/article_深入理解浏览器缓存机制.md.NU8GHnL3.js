import{_ as e,c as a,o as i,ai as s}from"./chunks/framework.BFSS5Pox.js";const u=JSON.parse('{"title":"深入理解浏览器缓存机制","description":"","frontmatter":{},"headers":[],"relativePath":"article/深入理解浏览器缓存机制.md","filePath":"article/深入理解浏览器缓存机制.md","lastUpdated":1712031455000}'),l={name:"article/深入理解浏览器缓存机制.md"},t=s(`<h1 id="深入理解浏览器缓存机制" tabindex="-1">深入理解浏览器缓存机制 <a class="header-anchor" href="#深入理解浏览器缓存机制" aria-label="Permalink to &quot;深入理解浏览器缓存机制&quot;">​</a></h1><p>浏览器有两种缓存规则：强制缓存与协商缓存</p><ol><li>强制缓存：不会向服务器发送请求，直接从缓存中读取资源</li><li>协商缓存：向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源</li></ol><ul><li>共同点：都是从客户端缓存中读取资源</li><li>不同点：强制缓存不会发请求，协商缓存会发请求</li></ul><h2 id="强制缓存" tabindex="-1">强制缓存 <a class="header-anchor" href="#强制缓存" aria-label="Permalink to &quot;强制缓存&quot;">​</a></h2><h3 id="什么是强制缓存" tabindex="-1">什么是强制缓存 <a class="header-anchor" href="#什么是强制缓存" aria-label="Permalink to &quot;什么是强制缓存&quot;">​</a></h3><p>浏览器在服务器发起真正请求前，先检查浏览器缓存：</p><ul><li>如果命中缓存，且缓存未过期，那么直接使用缓存资源</li><li>如果未命中缓存，或缓存已过期失效，那么向服务器发出请求</li></ul><h3 id="强制缓存的规则" tabindex="-1">强制缓存的规则 <a class="header-anchor" href="#强制缓存的规则" aria-label="Permalink to &quot;强制缓存的规则&quot;">​</a></h3><p>服务器通过向响应头添加<code>Expires</code>和<code>Cache-Control</code>字段来标识强制缓存的状态，浏览器会将这两个信息缓存到本地，后续有相同请求时，优先到浏览器缓存中检查资源是否到期。</p><p>其中<code>Cache-Control</code>优先级比<code>Expires</code>高，即：二者同时存在时，浏览器以<code>Cache-Control</code>为标准，检查缓存资源是否过期</p><h3 id="expires与cache-control" tabindex="-1">Expires与Cache-Control <a class="header-anchor" href="#expires与cache-control" aria-label="Permalink to &quot;Expires与Cache-Control&quot;">​</a></h3><h4 id="expires" tabindex="-1">Expires <a class="header-anchor" href="#expires" aria-label="Permalink to &quot;Expires&quot;">​</a></h4><p><code>Expires</code>表示当前资源的失效时间，它的值是一个HTTP-日期时间戳，例如：<code>Expires: Thu, 01 Dec 1994 16:00:00 GMT</code></p><p>使用<code>Expires</code>存在一些弊端：</p><ul><li>代表的是绝对时间，如果浏览器和服务器的时间不同步，会导致缓存目标时间存在偏差</li><li>如果服务端设置的日期格式不规范，那么等同于无缓存</li><li><code>Expires</code>是<code>HTTP/1.0</code>的字段，但是现在浏览器默认使用的是<code>HTTP/1.1</code></li></ul><p>在某些不支持HTTP1.1的环境下，<code>Expires</code>就会发挥用处</p><p>所以<code>Expires</code>其实是过时的产物，现阶段它的存在只是一种兼容性的写法</p><h4 id="cache-control" tabindex="-1">Cache-Control <a class="header-anchor" href="#cache-control" aria-label="Permalink to &quot;Cache-Control&quot;">​</a></h4><p>如果在<code>Cache-Control</code>响应头设置了&quot;max-age&quot;或者&quot;s-max-age&quot;指令，那么<code>Expires</code>头会被忽略</p><p>设置<code>Cache-Control</code>的值有以下规则：</p><ul><li>不区分大小写，但建议使用小写</li><li>多个指令以逗号分隔</li><li>具有可选参数，可以用令牌或者带引号的字符串语法</li></ul><p>常用的指令：</p><ul><li>public：所有内容都将被缓存，即使是通常不可缓存的内容（如POST请求）。</li><li>private：所有内容只有客户端可以缓存，不能作为共享缓存（即代理服务器不能缓存它），这也是<code>Cache-Control</code>的默认取值</li><li>no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定</li><li>no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存，即不使用任何缓存。</li><li>max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效</li></ul><p>举几个例子：</p><p>此次请求之后的600秒内，如果浏览器再次发起请求，那么直接使用缓存中的资源：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: max-age=600</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>浏览器可以缓存资源，但每次使用缓存资源前都必须重新验证其有效性：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: no-cache</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Cache-Control: max-age=0, must-revalidate</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>这意味着每次都会发起 HTTP 请求，但当缓存内容仍有效时可以跳过 HTTP 响应体的下载</p><h2 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h2><p>当浏览器检查本地的<strong>强制缓存</strong>已经失效后，浏览器携带该资源的<strong>协商缓存</strong>标识向服务器发起请求，由服务器根据缓存标识决定是否继续使用本地缓存。</p><ul><li>协商缓存生效，服务器返回304，通知浏览器继续使用本地缓存</li><li>协商缓存失效，服务器返回200，与最新的请求资源</li></ul><h3 id="协商缓存的规则" tabindex="-1">协商缓存的规则 <a class="header-anchor" href="#协商缓存的规则" aria-label="Permalink to &quot;协商缓存的规则&quot;">​</a></h3><p>服务器与浏览器通过两两成对的请求头来控制协商缓存：</p><ul><li><code>Etag</code> <code>If-None-Match</code></li><li><code>Last-Modified</code> <code>If-Modified-Since</code></li></ul><p>其中，<code>Etag</code>与<code>Last-Modified</code>是由服务器设置的响应头的字段，<code>If-None-Match</code>与<code>If-Modified-Since</code>则是浏览器向服务器发送的请求头的字段</p><h4 id="etag与last-modified" tabindex="-1">Etag与Last-Modified <a class="header-anchor" href="#etag与last-modified" aria-label="Permalink to &quot;Etag与Last-Modified&quot;">​</a></h4><p><code>Etag</code>是上一次加载资源时，服务器返回的ResponseHeader，是对该资源的一种唯一标识，只要资源有变化，<code>Etag</code>就会重新生成。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的<code>Etag</code>值放到RequestHeader里的<code>If-None-Match</code>里，服务器接受到<code>If-None-Match</code>的值后，会拿来跟该资源文件的<code>Etag</code>值做比较，如果相同，则表示资源文件没有发生改变，命中协商缓存。</p><ul><li><code>Etag</code>由服务器生成，标志当前资源的唯一标识，一般包含大小、修改时间等信息</li><li><code>If-None-Match</code>浏览器缓存到本地的<code>Etag</code>值</li></ul><p>HTTP协议并未规定<code>Etag</code>的内容是如何生成的，但一般包含大小、修改时间等信息</p><p>Node.js下生成<code>Etag</code>的示例：</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 根据文件的fs.Stats信息计算出etag</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> genEtag</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">stat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> fileLength</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stat.size </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件的大小</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> fileLastModifiedTime</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> stat.mtime.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getTime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 文件的最后更改时间</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 数字都用16进制表示</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fileLength</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}-\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">fileLastModifiedTime</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">toString</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="last-modified与if-modified-since" tabindex="-1">Last-Modified与If-Modified-Since <a class="header-anchor" href="#last-modified与if-modified-since" aria-label="Permalink to &quot;Last-Modified与If-Modified-Since&quot;">​</a></h4><p><code>Last-Modified</code>是该资源文件最后一次更改时间，服务器会在ResponseHeader里返回，同时浏览器会将这个值保存起来，在下一次发送请求时，放到RequestHeader里的<code>If-Modified-Since</code>里，服务器在接收到后也会做比对，如果相同则命中协商缓存。</p><ul><li><code>Last-Modified</code>由服务器添加，标志资源文件上次被修改的时间</li><li><code>If-Modified-Since</code>浏览器缓存到本地的<code>Last-Modified</code>值</li></ul><p><code>If-None-Match</code>的优先级要高于<code>If-Modified-Since</code>，即：如果浏览器同时存在</p><h4 id="两种协商缓存的区别" tabindex="-1">两种协商缓存的区别 <a class="header-anchor" href="#两种协商缓存的区别" aria-label="Permalink to &quot;两种协商缓存的区别&quot;">​</a></h4><ul><li>精确度上，<code>Etag</code>要优于<code>Last-Modified</code>。<code>Last-Modified</code>的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的<code>Last-Modified</code>其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的<code>Last-Modified</code>也有可能不一致。</li><li>性能上，<code>Etag</code>要逊于<code>Last-Modified</code>，毕竟<code>Last-Modified</code>只需要记录时间，而<code>Etag</code>需要服务器通过算法来计算出一个值。</li><li>优先级上，服务器校验优先使用<code>Etag</code>。</li></ul><h2 id="内存缓存与硬盘缓存" tabindex="-1">内存缓存与硬盘缓存 <a class="header-anchor" href="#内存缓存与硬盘缓存" aria-label="Permalink to &quot;内存缓存与硬盘缓存&quot;">​</a></h2><p>当我们打开一个新网页，服务器返回200，将资源发送给浏览器，浏览器做本地缓存</p><p>当我们刷新标签页，浏览器从内存缓存获得资源</p><p>当我们关闭标签页重新打开，浏览器从硬盘缓存获得资源</p><ul><li><strong>内存缓存</strong>(MemoryCache)：内存缓存具有两个特点，分别是快速读取和时效性 <ul><li>快速读取：内存缓存会将编译解析后的文件，直接存入该进程的内存中，占据该进程一定的内存资源，以方便下次运行使用时的快速读取。</li><li>时效性：一旦该进程关闭，则该进程的内存则会清空。</li></ul></li><li><strong>硬盘缓存</strong>(DiskCache)：硬盘缓存则是直接将缓存写入硬盘文件中，读取缓存需要对该缓存存放的硬盘文件进行I/O操作，然后重新解析该缓存内容，读取复杂，速度比内存缓存慢。</li></ul><p>在浏览器中，浏览器会在js和图片等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中读取(MemoryCache)；而css文件则会存入硬盘文件中，所以每次渲染页面都需要从硬盘读取缓存(DiskCache)。</p><h2 id="用户对浏览器缓存的控制" tabindex="-1">用户对浏览器缓存的控制 <a class="header-anchor" href="#用户对浏览器缓存的控制" aria-label="Permalink to &quot;用户对浏览器缓存的控制&quot;">​</a></h2><ul><li>地址栏访问，链接跳转是正常用户行为，将会触发浏览器缓存机制</li><li>F5刷新，浏览器会设置max-age=0，跳过强缓存判断，会进行协商缓存判断</li><li>Ctrl+F5刷新，跳过强缓存和协商缓存，直接从服务器拉取资源</li></ul><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844903593275817998" target="_blank" rel="noreferrer">[稀土掘金] 彻底理解浏览器的缓存机制</a></p><p><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651226262&amp;idx=1&amp;sn=2128db200b88479face67ed8e095757c&amp;chksm=bd4959128a3ed0041b43a5683c75c4b88c7d35fac909a59c14b4e9fc11e8d408680b171d2706&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">[微信公众号] 浏览器的缓存机制小结</a></p><p><a href="https://mp.weixin.qq.com/s?__biz=MjM5MTA1MjAxMQ==&amp;mid=2651226347&amp;idx=1&amp;sn=6dbccc54406f0b075671884b738b1e88&amp;chksm=bd49596f8a3ed079f79cda4b90ac3cb3b1dbdb5bfb8aade962a16a323563bf26a0c75b0a5d7b&amp;scene=21#wechat_redirect" target="_blank" rel="noreferrer">[微信公众号] 浏览器缓存机制剖析</a></p><p><a href="https://httpwg.org/specs/rfc9111.html#field.expires" target="_blank" rel="noreferrer">[RFC-9111] Expires</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Expires" target="_blank" rel="noreferrer">[MDN] Expires</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control" target="_blank" rel="noreferrer">[MDN] Cache-Control</a></p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag" target="_blank" rel="noreferrer">[MDN] ETag</a></p>`,66),d=[t];function o(n,r,c,p,h,k){return i(),a("div",null,d)}const b=e(l,[["render",o]]);export{u as __pageData,b as default};
