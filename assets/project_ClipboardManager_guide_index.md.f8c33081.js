import{_ as l,C as p,o as t,c,k as s,a,H as n,Q as e}from"./chunks/framework.4001cd3b.js";const r="/assets/gi3.c83cee76.png",i="/assets/gi3-2.8cc1f8a9.png",d="/assets/gi3-3.47dffc9b.png",u="/assets/sign-mac.2c3e272f.png",E="/assets/sign-mac-2.5861d44c.png",y="/assets/mac-chmod.bf888724.jpg",h="/assets/gi4.e4051a3e.png",m="/assets/gi5.f517b425.png",V=JSON.parse('{"title":"使用指南","description":"","frontmatter":{"navbar":false,"sidebar":false,"aside":false},"headers":[],"relativePath":"project/ClipboardManager/guide/index.md","filePath":"project/ClipboardManager/guide/index.md","lastUpdated":1697384672000}'),q={name:"project/ClipboardManager/guide/index.md"},b=s("h1",{id:"使用指南",tabindex:"-1"},[a("使用指南 "),s("a",{class:"header-anchor",href:"#使用指南","aria-label":'Permalink to "使用指南"'},"​")],-1),g=s("h2",{id:"快捷键一览",tabindex:"-1"},[a("快捷键一览 "),s("a",{class:"header-anchor",href:"#快捷键一览","aria-label":'Permalink to "快捷键一览"'},"​")],-1),_=e("<li>按下<code>空格</code>进入多选模式，连续向下选择 支持<strong>跨标签</strong>合并复制/粘贴</li><li><code>鼠标左键</code>复制并粘贴 <code>鼠标右键</code>仅复制</li><li><code>↑</code> <code>↓</code>选中历史记录 按下<code>↵</code>直接粘贴 <code>Ctrl+C</code>仅复制</li><li><code>←</code> <code>→</code>切换分类 <code>Tab</code>键连续切换分类</li><li><code>Ctrl+数字键</code>快速粘贴 <code>Alt+数字键</code>快速复制</li><li><code>输入任意字母或数字/Ctrl+F</code>聚焦搜索框并输入 支持使用<code>空格</code>同时检索多个关键词</li>",6),F=s("code",null,"Ctrl/Command+鼠标左键",-1),C=s("code",null,"`",-1),v=s("code",null,"H",-1),f=s("code",null,"J",-1),x=s("code",null,"K",-1),k=s("code",null,"L",-1),B=e('<h2 id="如何手动安装clipboard-event-handler" tabindex="-1">如何手动安装<code>clipboard-event-handler</code> <a class="header-anchor" href="#如何手动安装clipboard-event-handler" aria-label="Permalink to &quot;如何手动安装`clipboard-event-handler`&quot;">​</a></h2><p>新版 <code>超级剪贴板</code> 对剪贴板内容更新事件的监听，依赖于可执行文件：</p><ul><li>Windows系统: <code>clipboard-event-handler-win32.exe</code></li><li>Linux系统: <code>clipboard-event-handler-linux</code></li><li>MacOS系统: <code>clipboard-event-handler-mac</code></li></ul><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>适配了Apple M1芯片的监听程序： <a href="https://github.com/wangyw6716/clipboard-event-handler-mac-apple-silicon-arm64-M1" target="_blank" rel="noreferrer">clipboard-event-handler-mac-apple-silicon-arm64-M1</a></p><p>由于此仓库不在超级剪贴板开发者维护范围内，请自行注意辨别文件安全性。</p></div><p>插件每次启动时，将自动检查剪贴板数据文件所在目录下是否存在剪贴板监听程序，如存在，则使用性能更优秀的新的监听策略，如不存在，则仍然使用旧的策略。</p><hr><h3 id="_1-下载监听程序" tabindex="-1">1. 下载监听程序 <a class="header-anchor" href="#_1-下载监听程序" aria-label="Permalink to &quot;1. 下载监听程序&quot;">​</a></h3><p>请<a href="https://pan.baidu.com/s/14GJIXWDU2F4jsqDDq73aFg?pwd=Ziuc" target="_blank" rel="noreferrer">点击此处（百度网盘）</a>或访问<a href="https://github.com/sudhakar3697/node-clipboard-event/tree/master/platform" target="_blank" rel="noreferrer">node-clipboard-event</a>手动下载<strong>对应系统</strong>的文件，并将其移动到<strong>剪贴板数据文件所在目录</strong>下</p><p>插件使用的二进制文件拷贝自<a href="https://github.com/sudhakar3697/node-clipboard-event" target="_blank" rel="noreferrer">node-clipboard-event</a>，请避免从其它不可信的来源下载文件，并在下载文件后比较哈希，有能力的也可以从仓库源代码自行编译</p><h3 id="_2-找到剪贴板数据文件所在目录" tabindex="-1">2. 找到剪贴板数据文件所在目录 <a class="header-anchor" href="#_2-找到剪贴板数据文件所在目录" aria-label="Permalink to &quot;2. 找到剪贴板数据文件所在目录&quot;">​</a></h3><p>进入设置页（顶部导航栏/齿轮图标），点击数据库路径这一项右侧的打开按钮</p><h3 id="_3-将监听程序拷贝到目录中" tabindex="-1">3. 将监听程序拷贝到目录中 <a class="header-anchor" href="#_3-将监听程序拷贝到目录中" aria-label="Permalink to &quot;3. 将监听程序拷贝到目录中&quot;">​</a></h3><h4 id="windows" tabindex="-1">Windows: <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows:&quot;">​</a></h4><p><img src="'+r+'" alt=""></p><h4 id="linux" tabindex="-1">Linux: <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux:&quot;">​</a></h4><p><img src="'+i+'" alt=""></p><h4 id="mac" tabindex="-1">Mac: <a class="header-anchor" href="#mac" aria-label="Permalink to &quot;Mac:&quot;">​</a></h4><p><img src="'+d+'" alt=""></p><h3 id="_4-注意事项" tabindex="-1">4. 注意事项 <a class="header-anchor" href="#_4-注意事项" aria-label="Permalink to &quot;4. 注意事项&quot;">​</a></h3><h4 id="macos-的特殊配置" tabindex="-1">MacOS 的特殊配置 <a class="header-anchor" href="#macos-的特殊配置" aria-label="Permalink to &quot;MacOS 的特殊配置&quot;">​</a></h4><p>针对<code>MacOS</code>系统，在将剪贴板监听程序拷贝到指定目录后，请在重启插件后，<strong>进入设置页，检查监听程序是否生效</strong></p><p>如果监听程序未生效，可能是：</p><ol><li>需要下载对应芯片的监听程序</li><li>需要对程序进行签名与授权</li></ol><p><strong>1. 签名</strong></p><p>打开终端输入以下命令</p><div class="language-sh vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">sudo</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">codesign</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--force</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--deep</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">--sign</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">-</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">sudo</span><span style="color:#24292E;"> </span><span style="color:#032F62;">codesign</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--force</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--deep</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">--sign</span><span style="color:#24292E;"> </span><span style="color:#032F62;">-</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="'+u+'" alt=""></p><p>然后将此目录中的<code>clipboard-event-handler-mac</code>文件拖入终端执行命令</p><p><img src="'+E+'" alt=""></p><p><strong>2. 授权</strong></p><p><em>左上角🍎</em> -&gt; <em>系统偏好设置</em> -&gt; <em>安全性与隐私</em> -&gt; <em>通用</em> -&gt; <em>点击允许</em></p><p><img src="'+y+`" alt=""></p><h4 id="监听程序不生效如何排查" tabindex="-1">监听程序不生效如何排查？ <a class="header-anchor" href="#监听程序不生效如何排查" aria-label="Permalink to &quot;监听程序不生效如何排查？&quot;">​</a></h4><p>请务必完整按照教程完成安装，如果程序仍未生效，请按照如下方式排查：</p><ul><li>监听程序拷贝完成后，需要重启插件方可生效</li><li>设置页<code>剪贴板监听程序状态</code>选项是否为<code>已安装</code></li><li>系统进程管理器中是否存在<code>clipboard-event-handler-xxxxx</code>的进程</li></ul><p>使用中遇到任何问题，请尝试通过论坛或入群反馈</p><h2 id="如何创造自己的功能按钮" tabindex="-1">如何创造自己的功能按钮 <a class="header-anchor" href="#如何创造自己的功能按钮" aria-label="Permalink to &quot;如何创造自己的功能按钮&quot;">​</a></h2><p>超级剪贴板为用户提供了自定义功能按钮的能力</p><p>这让<code>超级剪贴板</code>真正变得“超级”起来，用户可以通过编写<code>json</code>实现<strong>携带数据跳转到任何其他插件</strong>，这项功能给<code>超级剪贴板</code>带来了无限可能。</p><p>插件中，默认内置了若干使用样例：</p><ul><li>讯飞OCR识别</li><li>百度搜索</li><li>百度识图</li><li>统计文本字数</li><li>颜色管理</li><li>识别图片中二维码</li><li>上传到图床</li><li>翻译</li></ul><p>下面我将从这些样例出发对这项功能做简单介绍：</p><p>这项功能的原理是<code>utools.redirect()</code>，在不分离插件的情况下，在不同插件之间的跳转体验是连贯的。</p><p>以<code>百度搜索</code>为例，是通过<code>网页快开</code>提供的关键词实现的，我们可以编写以下json：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;custom.1663490859&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;百度搜索&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;icon&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;🔍&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;text&quot;</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;redirect:百度一下&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;custom.1663490859&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;百度搜索&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;icon&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;🔍&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;text&quot;</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;redirect:百度一下&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以实现从剪贴板直接跳转到<code>网页快开</code>，也即打开百度并搜索当前选中的文本内容。</p><p>除了使用简单的字符串匹配不同的内容，<code>超级剪贴板</code>还支持使用正则表达式，以<code>上传到图床</code>功能为例：</p><div class="language-json vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">{</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;id&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;custom.1663490864&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;title&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;上传到图床&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;icon&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;🚀&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;match&quot;</span><span style="color:#E1E4E8;">: [</span><span style="color:#9ECBFF;">&quot;image&quot;</span><span style="color:#E1E4E8;">, { </span><span style="color:#79B8FF;">&quot;type&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;file&quot;</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">&quot;regex&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;.(?:jpg|jpeg|png)$&quot;</span><span style="color:#E1E4E8;"> }],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#79B8FF;">&quot;command&quot;</span><span style="color:#E1E4E8;">: </span><span style="color:#9ECBFF;">&quot;redirect:上传到图床&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">{</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;id&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;custom.1663490864&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;title&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;上传到图床&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;icon&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;🚀&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;match&quot;</span><span style="color:#24292E;">: [</span><span style="color:#032F62;">&quot;image&quot;</span><span style="color:#24292E;">, { </span><span style="color:#005CC5;">&quot;type&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;file&quot;</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">&quot;regex&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;.(?:jpg|jpeg|png)$&quot;</span><span style="color:#24292E;"> }],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#005CC5;">&quot;command&quot;</span><span style="color:#24292E;">: </span><span style="color:#032F62;">&quot;redirect:上传到图床&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这个功能除了可以匹配图片，还可以将符合正则的图片文件匹配上，在匹配上的历史记录上展示<code>上传到图床</code>按钮，携带数据跳转到图床插件，一键上传。</p><p>需要注意的是，因为自定义功能按钮实现的是<strong>携带数据跳转不同插件</strong>，所以<code>redirect</code>后的内容并不应该是普通关键字（普通关键字仅能作为插件入口，而不能携带数据），而应该是<code>文本</code>/<code>图片</code>/<code>文件或文件夹</code>：</p><p><img src="`+h+'" alt=""><img src="'+m+'" alt=""></p><ul><li><code>id</code>: <code>String</code> 全局唯一 必须以<code>custom</code>开头 建议以时间戳为后缀</li><li><code>title</code>: <code>String</code> 鼠标悬停时展示的文本</li><li><code>icon</code>: <code>String</code> 展示在插件内的图标</li><li><code>match</code>: <code>&lt;String | Object&gt;[]</code> 匹配模式</li><li><code>command</code>: <code>String</code> 执行跳转的关键字 前缀<code>redirect:</code>是必须的</li></ul><p>在未来的版本更新中，<code>超级剪贴板</code>将开放更多自定义功能给高级用户，帮助你更高效率的管理、使用剪贴板。</p>',53);function P(w,S,j,T,M,A){const o=p("Badge");return t(),c("div",null,[b,g,s("ul",null,[_,s("li",null,[F,a("点击文本/图片/文件 直接进入预览/打开所在文件夹 "),n(o,{type:"warning",text:"插件会员"})]),s("li",null,[C,a("快速展开/收起预览面板 "),n(o,{type:"warning",text:"插件会员"})]),s("li",null,[v,a(),f,a(),x,a(),k,a("键盘操作模式下Vim快捷键 支持上下左右移动 "),n(o,{type:"warning",text:"插件会员"})])]),B])}const O=l(q,[["render",P]]);export{V as __pageData,O as default};
