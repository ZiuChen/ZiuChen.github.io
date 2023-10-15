import{_ as i,C as n,o as s,c,k as e,a as l,H as o,Q as a}from"./chunks/framework.4001cd3b.js";const r="/assets/vip-webdav.2e7c539c.png",d="/assets/vip-highlight.e3827906.png",B=JSON.parse('{"title":"插件会员","description":"","frontmatter":{"navbar":false,"sidebar":false,"aside":false},"headers":[],"relativePath":"project/ClipboardManager/vip/index.md","filePath":"project/ClipboardManager/vip/index.md","lastUpdated":1697384672000}'),p={name:"project/ClipboardManager/vip/index.md"},h=a('<h1 id="插件会员" tabindex="-1">插件会员 <a class="header-anchor" href="#插件会员" aria-label="Permalink to &quot;插件会员&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>超级剪贴板是一款 “随心所欲” 的软件。您可以永久免费使用它。</p><p>但是，如果您真的喜欢它，您可以付费支持它的发展。作为答谢，您将获得更多更方便的功能。这取决于您，如果您不想，也没关系。谢谢你，祝你有美好的一天！☀️</p></div><h2 id="会员权益" tabindex="-1">会员权益 <a class="header-anchor" href="#会员权益" aria-label="Permalink to &quot;会员权益&quot;">​</a></h2>',3),u=e("strong",null,"插件会员",-1),_=e("code",null,"WebDav数据多端同步",-1),b=e("code",null,"支持保存2000条历史记录",-1),g=e("code",null,"不限制历史记录过期时间",-1),m=e("code",null,"文本/图片/文件预览增强, 按住Ctrl/Command点击 解锁更多操作",-1),f=e("code",null,"键盘操作模式 Vim快捷键",-1),v=e("code",null,"简洁模式 隐藏页面中不必要的组件与元素",-1),k=e("code",null,"自定义分类排序",-1),x=e("code",null,"预览页代码高亮 预览快捷键",-1),q=e("code",null,"关闭剪贴板图片记录",-1),T=e("code",null,"插件使用统计",-1),C=e("li",null,[e("strong",null,"...")],-1),D=e("strong",null,"uTools会员",-1),y=e("code",null,"插件使用统计",-1),N=a('<h2 id="会员定价" tabindex="-1">会员定价 <a class="header-anchor" href="#会员定价" aria-label="Permalink to &quot;会员定价&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><ul><li><strong>插件会员为大版本买断制，购买后即可享用当前版本(2.x)后续所有更新的会员内容</strong></li><li>插件会员为虚拟商品，购买后不支持退款</li><li>插件会员的价格是浮动的，随着功能和权益的增加，不排除涨价的可能</li><li>购买插件会员后若未能及时到账，请<a href="https://jq.qq.com/?_wv=1027&amp;k=fURjGVJr" target="_blank" rel="noreferrer">加入QQ群</a>反馈</li></ul></div><p>插件会员定价<code>9.9元</code>，登录 uTools 账号后，点击插件导航栏中个人中心图标进入购买页面</p><p>购买后可使用会员功能，不购买不影响基本功能的使用，希望大家多多理解，按需购买</p><h2 id="webdav同步功能" tabindex="-1">WebDav同步功能 <a class="header-anchor" href="#webdav同步功能" aria-label="Permalink to &quot;WebDav同步功能&quot;">​</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>如果剪贴板数据体积过大，可能出现同步时间过长、同步失败等问题</p><p>建议及时删除保存在超级剪贴板内的图片，或<strong>关闭记录图片到剪贴板</strong></p></div><p>插件会员支持通过WebDav同步剪贴板数据</p><p>获取服务器地址、账号、密钥后，仅需在<strong>插件内的设置页面</strong>添加WebDav配置</p><p>每次本地数据库发生变化，都会将最新数据同步到同步到服务器（须开启插件内的自动同步 否则需要手动同步）</p><p><img src="'+r+'" alt="WebDav"></p><ul><li>如果配置了WebDav 则每天第一次进入插件时会自动从服务器拉取最新数据</li><li>如果设置了自动同步 每次本地数据变化将自动同步本地数据到服务器 <ul><li>插件会缓存云端数据文件的ETag 如果云端数据有更新 则采用云端数据覆盖本地数据</li><li>数据文件的上传和下载都开启了gzip以节省流量与带宽</li><li><strong>清空本地数据库的同时也会触发云端文件清空</strong></li><li>可以选择<strong>关闭图片记录</strong> 以降低同步的数据文件体积 提高同步效率</li></ul></li><li>插件仅在每次启动时主动从云端拉取数据 云端数据的更新不会自动同步到本地</li><li>可以通过点击工具栏按钮主动拉取云端数据到本地或上传数据到云端</li></ul><p>相关链接：</p><ul><li><a href="https://infini-cloud.net/en/" target="_blank" rel="noreferrer">Infini Cloud</a> （国内可用 无限制）</li><li><a href="https://help.jianguoyun.com/?tag=webdav" target="_blank" rel="noreferrer">坚果云 WebDav</a>（国内可用 限制调用次数）</li><li><a href="https://www.zhihu.com/question/347182171" target="_blank" rel="noreferrer">2022年还有哪些支持WebDAV的网盘？</a></li></ul><h2 id="代码高亮功能" tabindex="-1">代码高亮功能 <a class="header-anchor" href="#代码高亮功能" aria-label="Permalink to &quot;代码高亮功能&quot;">​</a></h2><p>插件使用Shiki作为代码高亮库，为了压缩插件体积、提高代码执行效率，其相关依赖都将从CDN动态加载</p><p>支持在设置页修改代码高亮的主题、可选语言、CDN地址，<strong>设置的首个语言为展开预览后的默认语言</strong></p><p><img src="'+d+'" alt="HighLight"></p><ul><li>默认CDN地址: <code>https://unpkg.com/shiki@0.14.1/</code></li><li>默认主题: <code>one-dark-pro</code></li><li>默认语言: <code>javascript</code> <code>css</code> <code>html</code> <code>json</code> <code>markdown</code> <code>php</code> <code>python</code> <code>ruby</code> <code>shellscript</code> <code>sql</code> <code>java</code> <code>c</code> <code>cpp</code> <code>csharp</code> <code>go</code></li></ul><p>更多可用主题/语言，见Github仓库：<a href="https://github.com/shikijs/shiki" target="_blank" rel="noreferrer">Shiki</a></p><h2 id="更多内容" tabindex="-1">更多内容 <a class="header-anchor" href="#更多内容" aria-label="Permalink to &quot;更多内容&quot;">​</a></h2><p><a href="./../statement/">疑难解答</a></p>',21);function P(w,V,W,j,S,A){const t=n("Badge");return s(),c("div",null,[h,e("ul",null,[e("li",null,[u,e("ul",null,[e("li",null,[_,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[b,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[g,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[m,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[f,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[v,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[k,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[x,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[q,l(),o(t,{type:"tip",text:"已上线"})]),e("li",null,[T,l(),o(t,{type:"tip",text:"已上线"})]),C])]),e("li",null,[D,e("ul",null,[e("li",null,[y,l(),o(t,{type:"tip",text:"已上线"})])])])]),N])}const R=i(p,[["render",P]]);export{B as __pageData,R as default};
