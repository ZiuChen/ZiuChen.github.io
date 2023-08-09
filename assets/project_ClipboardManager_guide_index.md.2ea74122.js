import{_ as l,E as p,o as t,c,k as s,a,J as e,S as n}from"./chunks/framework.04e6e156.js";const r="/assets/gi3.c83cee76.png",i="/assets/gi3-2.8cc1f8a9.png",d="/assets/gi3-3.47dffc9b.png",D="/assets/sign-mac.2c3e272f.png",u="/assets/sign-mac-2.5861d44c.png",F="/assets/mac-chmod.bf888724.jpg",y="/assets/guide-jianguo-1.a7e6fa82.png",h="/assets/guide-jianguo-2.14924b1b.png",m="/assets/gi4.e4051a3e.png",b="/assets/gi5.f517b425.png",G=JSON.parse('{"title":"使用指南","description":"","frontmatter":{"navbar":false,"sidebar":false,"aside":false},"headers":[],"relativePath":"project/ClipboardManager/guide/index.md","filePath":"project/ClipboardManager/guide/index.md","lastUpdated":1691598239000}'),_={name:"project/ClipboardManager/guide/index.md"},C=s("h1",{id:"使用指南",tabindex:"-1"},[a("使用指南 "),s("a",{class:"header-anchor",href:"#使用指南","aria-label":'Permalink to "使用指南"'},"​")],-1),g=s("h2",{id:"快捷键一览",tabindex:"-1"},[a("快捷键一览 "),s("a",{class:"header-anchor",href:"#快捷键一览","aria-label":'Permalink to "快捷键一览"'},"​")],-1),A=n("<li>按下<code>空格</code>进入多选模式，连续向下选择 支持<strong>跨标签</strong>合并复制/粘贴</li><li><code>鼠标左键</code>复制并粘贴 <code>鼠标右键</code>仅复制</li><li><code>↑</code> <code>↓</code>选中历史记录 按下<code>↵</code>直接粘贴 <code>Ctrl+C</code>仅复制</li><li><code>←</code> <code>→</code>切换分类 <code>Tab</code>键连续切换分类</li><li><code>Ctrl+数字键</code>快速粘贴 <code>Alt+数字键</code>快速复制</li><li><code>输入任意字母或数字/Ctrl+F</code>聚焦搜索框并输入 支持使用<code>空格</code>同时检索多个关键词</li>",6),q=s("code",null,"Ctrl/Command+鼠标左键",-1),f=s("code",null,"`",-1),v=s("code",null,"H",-1),x=s("code",null,"J",-1),k=s("code",null,"K",-1),E=s("code",null,"L",-1),w=n('<h2 id="如何手动安装clipboard-event-handler" tabindex="-1">如何手动安装<code>clipboard-event-handler</code> <a class="header-anchor" href="#如何手动安装clipboard-event-handler" aria-label="Permalink to &quot;如何手动安装`clipboard-event-handler`&quot;">​</a></h2><p>新版 <code>超级剪贴板</code> 对剪贴板内容更新事件的监听，依赖于可执行文件：</p><ul><li>Windows系统: <code>clipboard-event-handler-win32.exe</code></li><li>Linux系统: <code>clipboard-event-handler-linux</code></li><li>MacOS系统: <code>clipboard-event-handler-mac</code></li></ul><p>插件每次启动时，将自动检查剪贴板数据文件所在目录下是否存在剪贴板监听程序，如存在，则使用性能更优秀的新的监听策略，如不存在，则仍然使用旧的策略。</p><hr><h3 id="_1-下载监听程序" tabindex="-1">1. 下载监听程序 <a class="header-anchor" href="#_1-下载监听程序" aria-label="Permalink to &quot;1. 下载监听程序&quot;">​</a></h3><p>请<a href="https://pan.baidu.com/s/14GJIXWDU2F4jsqDDq73aFg?pwd=Ziuc" target="_blank" rel="noreferrer">点击此处（百度网盘）</a>或访问<a href="https://github.com/sudhakar3697/node-clipboard-event/tree/master/platform" target="_blank" rel="noreferrer">node-clipboard-event</a>手动下载<strong>对应系统</strong>的文件，并将其移动到<strong>剪贴板数据文件所在目录</strong>下</p><p>插件使用的二进制文件拷贝自<a href="https://github.com/sudhakar3697/node-clipboard-event" target="_blank" rel="noreferrer">node-clipboard-event</a>，请避免从其它不可信的来源下载文件，并在下载文件后比较哈希，有能力的也可以从仓库源代码自行编译</p><h3 id="_2-找到剪贴板数据文件所在目录" tabindex="-1">2. 找到剪贴板数据文件所在目录 <a class="header-anchor" href="#_2-找到剪贴板数据文件所在目录" aria-label="Permalink to &quot;2. 找到剪贴板数据文件所在目录&quot;">​</a></h3><p>进入设置页（顶部导航栏/齿轮图标），点击数据库路径这一项右侧的打开按钮</p><h3 id="_3-将监听程序拷贝到目录中" tabindex="-1">3. 将监听程序拷贝到目录中 <a class="header-anchor" href="#_3-将监听程序拷贝到目录中" aria-label="Permalink to &quot;3. 将监听程序拷贝到目录中&quot;">​</a></h3><h4 id="windows" tabindex="-1">Windows: <a class="header-anchor" href="#windows" aria-label="Permalink to &quot;Windows:&quot;">​</a></h4><p><img src="'+r+'" alt=""></p><h4 id="linux" tabindex="-1">Linux: <a class="header-anchor" href="#linux" aria-label="Permalink to &quot;Linux:&quot;">​</a></h4><p><img src="'+i+'" alt=""></p><h4 id="mac" tabindex="-1">Mac: <a class="header-anchor" href="#mac" aria-label="Permalink to &quot;Mac:&quot;">​</a></h4><p><img src="'+d+'" alt=""></p><h3 id="_4-注意事项" tabindex="-1">4. 注意事项 <a class="header-anchor" href="#_4-注意事项" aria-label="Permalink to &quot;4. 注意事项&quot;">​</a></h3><h4 id="macos-的特殊配置" tabindex="-1">MacOS 的特殊配置 <a class="header-anchor" href="#macos-的特殊配置" aria-label="Permalink to &quot;MacOS 的特殊配置&quot;">​</a></h4><p>针对<code>MacOS</code>系统，在将剪贴板监听程序拷贝到指定目录后，请在重启插件后，<strong>进入设置页，检查监听程序是否生效</strong></p><p>如果监听程序未生效，请尝试以下操作，对监听程序进行签名与授权：</p><p><strong>1. 签名</strong></p><p>打开终端输入以下命令</p><div class="language-sh line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">sudo</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">codesign</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--force</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--deep</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--sign</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><img src="'+D+'" alt=""></p><p>然后将此目录中的<code>clipboard-event-handler-mac</code>文件拖入终端执行命令</p><p><img src="'+u+'" alt=""></p><p><strong>2. 授权</strong></p><p><em>左上角🍎</em> -&gt; <em>系统偏好设置</em> -&gt; <em>安全性与隐私</em> -&gt; <em>通用</em> -&gt; <em>点击允许</em></p><p><img src="'+F+'" alt=""></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>如果上述操作无法解决你的问题，请尝试从 <a href="https://github.com/wangyw6716/clipboard-event-handler-mac-apple-silicon-arm64-M1" target="_blank" rel="noreferrer">clipboard-event-handler-mac-apple-silicon-arm64-M1</a> 完成剪贴板监听程序的下载，并执行相同操作。</p><p>由于此仓库不在超级剪贴板开发者维护范围内，请自行注意辨别文件安全性。</p></div><h4 id="监听程序不生效如何排查" tabindex="-1">监听程序不生效如何排查？ <a class="header-anchor" href="#监听程序不生效如何排查" aria-label="Permalink to &quot;监听程序不生效如何排查？&quot;">​</a></h4><p>请务必完整按照教程完成安装，如果程序仍未生效，请按照如下方式排查：</p><ul><li>监听程序拷贝完成后，需要重启插件方可生效</li><li>设置页<code>剪贴板监听程序状态</code>选项是否为<code>已安装</code></li><li>系统进程管理器中是否存在<code>clipboard-event-handler-xxxxx</code>的进程</li></ul><p>使用中遇到任何问题，请尝试通过论坛或加入QQ群反馈</p><h2 id="如何实现多端同步" tabindex="-1">如何实现多端同步 <a class="header-anchor" href="#如何实现多端同步" aria-label="Permalink to &quot;如何实现多端同步&quot;">​</a></h2>',36),P={id:"webdav同步",tabindex:"-1"},S=s("a",{class:"header-anchor",href:"#webdav同步","aria-label":'Permalink to "WebDav同步 <Badge type="tip" text="^2.0.0" />"'},"​",-1),T=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"TIP"),s("p",null,[a("自"),s("code",null,"v2.0.0"),a("起，可以通过开通插件会员启用"),s("strong",null,"WebDav同步功能")])],-1),j=s("p",null,[a("👉👉👉"),s("a",{href:"./../vip/#webdav同步功能"},"插件会员/WebDav同步功能"),a("👈👈👈")],-1),B={id:"坚果云同步文件夹",tabindex:"-1"},M=s("a",{class:"header-anchor",href:"#坚果云同步文件夹","aria-label":'Permalink to "坚果云同步文件夹 <Badge type="warning" text="仅旧版本" />"'},"​",-1),N=n('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>以下方法仅适用于<code>v2.0.0</code>之前的版本</p><p>数据库文件默认是直接存放在用户文件夹根目录下的，如果需要使用同步功能，请使用插件内提供的<code>数据库路径自定义</code>功能，将数据库路径改为其他路径，而后才能通过下文中讲述的<code>同步文件夹</code>实现云同步。</p></div><p>到<a href="https://www.jianguoyun.com/#/" target="_blank" rel="noreferrer">坚果云官网</a>安装好软件后，找到<code>_utools_clipboard_manager_storage</code>文件所在的目录</p><p>右键目录，<code>坚果云</code>/<code>同步该文件夹</code>，将此文件夹加入到坚果云的同步服务中</p><p><img src="'+y+'" alt=""></p><p>这样，每次剪贴板内容更新都将自动触发坚果云的同步服务，将剪贴板数据同步到云端</p><p>其他安装了坚果云的设备也将自动同步更新</p><p><img src="'+h+`" alt=""></p><h2 id="如何迁移数据" tabindex="-1">如何迁移数据 <a class="header-anchor" href="#如何迁移数据" aria-label="Permalink to &quot;如何迁移数据&quot;">​</a></h2><p>剪贴板数据默认存放在</p><ul><li><code>Windows</code> <code>Linux</code>用户：<code>{home}\\_utools_clipboard_manager_storage</code></li><li><code>Mac</code>用户：<code>{userData}\\_utools_clipboard_manager_storage</code></li></ul><p>也可以在设置页中点击按钮打开数据库路径。要手动迁移数据，只需要在新设备上运行一次插件，而后将原设备上的数据文件拷贝并替换新设备中的数据文件即可</p><h2 id="如何创造自己的功能按钮" tabindex="-1">如何创造自己的功能按钮 <a class="header-anchor" href="#如何创造自己的功能按钮" aria-label="Permalink to &quot;如何创造自己的功能按钮&quot;">​</a></h2><p>从<code>v1.4.0</code>起，插件为用户提供了自定义功能按钮的能力</p><p>这让<code>超级剪贴板</code>真正变得“超级”起来，用户可以通过编写<code>json</code>实现<strong>携带数据跳转到任何其他插件</strong>，这项功能给<code>超级剪贴板</code>带来了无限可能。</p><p>插件中，默认内置了若干使用样例：</p><ul><li>讯飞OCR识别</li><li>百度搜索</li><li>百度识图</li><li>统计文本字数</li><li>颜色管理</li><li>识别图片中二维码</li><li>上传到图床</li><li>翻译</li></ul><p>下面我将从这些样例出发对这项功能做简单介绍：</p><p>这项功能的原理是<code>utools.redirect()</code>，在不分离插件的情况下，在不同插件之间的跳转体验是连贯的。</p><p>以<code>百度搜索</code>为例，是通过<code>网页快开</code>提供的关键词实现的，我们可以编写以下json：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">custom.1663490859</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">百度搜索</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">icon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">🔍</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">match</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">command</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">redirect:百度一下</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>可以实现从剪贴板直接跳转到<code>网页快开</code>，也即打开百度并搜索当前选中的文本内容。</p><p>除了使用简单的字符串匹配不同的内容，<code>超级剪贴板</code>还支持使用正则表达式，以<code>上传到图床</code>功能为例：</p><div class="language-json line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">custom.1663490864</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">上传到图床</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">icon</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">🚀</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">match</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">image</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">type</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">file</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">regex</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.(?:jpg|jpeg|png)$</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}],</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">command</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">redirect:上传到图床</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>这个功能除了可以匹配图片，还可以将符合正则的图片文件匹配上，在匹配上的历史记录上展示<code>上传到图床</code>按钮，携带数据跳转到图床插件，一键上传。</p><p>需要注意的是，因为自定义功能按钮实现的是<strong>携带数据跳转不同插件</strong>，所以<code>redirect</code>后的内容并不应该是普通关键字（普通关键字仅能作为插件入口，而不能携带数据），而应该是<code>文本</code>/<code>图片</code>/<code>文件或文件夹</code>：</p><p><img src="`+m+'" alt=""><img src="'+b+'" alt=""></p><ul><li><code>id</code>: <code>String</code> 全局唯一 必须以<code>custom</code>开头 建议以时间戳为后缀</li><li><code>title</code>: <code>String</code> 鼠标悬停时展示的文本</li><li><code>icon</code>: <code>String</code> 展示在插件内的图标</li><li><code>match</code>: <code>&lt;String | Object&gt;[]</code> 匹配模式</li><li><code>command</code>: <code>String</code> 执行跳转的关键字 前缀<code>redirect:</code>是必须的</li></ul><p>在未来的版本更新中，<code>超级剪贴板</code>将开放更多自定义功能给高级用户，帮助你更高效率的管理、使用剪贴板。</p>',28);function V(W,I,O,R,L,$){const o=p("Badge");return t(),c("div",null,[C,g,s("ul",null,[A,s("li",null,[q,a("点击文本/图片/文件 直接进入预览/打开所在文件夹 "),e(o,{type:"warning",text:"插件会员"})]),s("li",null,[f,a("快速展开/收起预览面板 "),e(o,{type:"warning",text:"插件会员"})]),s("li",null,[v,a(),x,a(),k,a(),E,a("键盘操作模式下Vim快捷键 支持上下左右移动 "),e(o,{type:"warning",text:"插件会员"})])]),w,s("h3",P,[a("WebDav同步 "),e(o,{type:"tip",text:"^2.0.0"}),a(),S]),T,j,s("h3",B,[a("坚果云同步文件夹 "),e(o,{type:"warning",text:"仅旧版本"}),a(),M]),N])}const Q=l(_,[["render",V]]);export{G as __pageData,Q as default};
