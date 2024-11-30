import{_ as e,o as l,c as o,ag as r}from"./chunks/framework.D__0zeO9.js";const u=JSON.parse('{"title":"Q&A","description":"","frontmatter":{"navbar":false,"sidebar":false,"aside":false},"headers":[],"relativePath":"project/ClipboardManager/statement/index.md","filePath":"project/ClipboardManager/statement/index.md","lastUpdated":1732987248000}'),t={name:"project/ClipboardManager/statement/index.md"};function i(n,a,s,d,p,h){return l(),o("div",null,a[0]||(a[0]=[r('<h1 id="q-a" tabindex="-1">Q&amp;A <a class="header-anchor" href="#q-a" aria-label="Permalink to &quot;Q&amp;A&quot;">​</a></h1><h2 id="如何设置快捷键快速打开插件" tabindex="-1">如何设置快捷键快速打开插件 <a class="header-anchor" href="#如何设置快捷键快速打开插件" aria-label="Permalink to &quot;如何设置快捷键快速打开插件&quot;">​</a></h2><p>uTools 个人中心 / 全局快捷键 / 将 <code>Clipboard</code> 设置为你想要的快捷键</p><p>即可通过快捷键快速唤出超级剪贴板插件</p><h2 id="剪贴板记录丢失" tabindex="-1">剪贴板记录丢失 <a class="header-anchor" href="#剪贴板记录丢失" aria-label="Permalink to &quot;剪贴板记录丢失&quot;">​</a></h2><p>一般是由于插件退出后台运行导致的, 插件需要保持后台运行才能记录剪贴板, 请检查:</p><ul><li>是否正确设置了插件<strong>跟随主程序启动</strong></li><li>是否手动清理或关闭了后台插件 <ul><li>在独立窗口模式下关闭插件（uTools 机制：关闭独立窗口则退出插件）</li><li>使用了 <code>clear</code> 命令</li><li>在插件列表主动退出了插件</li></ul></li><li>插件在高频复制的场景下，可能会漏掉某些记录</li></ul><p>使用中遇到任何问题，请通过论坛反馈</p><h2 id="插件启动时闪退" tabindex="-1">插件启动时闪退 <a class="header-anchor" href="#插件启动时闪退" aria-label="Permalink to &quot;插件启动时闪退&quot;">​</a></h2><p>使用二进制监听器时，插件首次启动会自动隐藏到后台，重新唤起插件即可</p><h2 id="插件启动时报错-白屏" tabindex="-1">插件启动时报错/白屏 <a class="header-anchor" href="#插件启动时报错-白屏" aria-label="Permalink to &quot;插件启动时报错/白屏&quot;">​</a></h2><p>请尝试以下方法：</p><ol><li>完全退出插件后重新启动插件</li><li>重新启动 uTools</li><li>格式化 uTools 内的插件数据 (个人中心/数据存储) 这不会清空你的本地数据</li><li>删除本地数据库目录（全局搜索 <code>super-clipboard-data</code> 文件夹）</li></ol><p>如果上述方法都无法解决你的问题，欢迎论坛回帖交流具体情况</p><h2 id="自动粘贴-自动上屏-功能失灵了" tabindex="-1">自动粘贴（自动上屏）功能失灵了 <a class="header-anchor" href="#自动粘贴-自动上屏-功能失灵了" aria-label="Permalink to &quot;自动粘贴（自动上屏）功能失灵了&quot;">​</a></h2><p>目前已知：自动粘贴功能在 <code>Windows微信</code> 的聊天输入框内是不可用的。在其他场景下，此功能都能够正常使用</p><p>此外，建议你保持 uTools 与插件版本更新，避免使用旧版 uTools 导致兼容性问题</p><h2 id="我对这个插件的安全性有担忧-插件偷窃我的隐私怎么办" tabindex="-1">我对这个插件的安全性有担忧, 插件偷窃我的隐私怎么办? <a class="header-anchor" href="#我对这个插件的安全性有担忧-插件偷窃我的隐私怎么办" aria-label="Permalink to &quot;我对这个插件的安全性有担忧, 插件偷窃我的隐私怎么办?&quot;">​</a></h2><p>首先, 我写这个插件不是为了获取你的隐私的, 我对你的隐私没有兴趣, 这一点你完全可以放心;</p><p>其次 uTools 官方在插件上架前会对代码进行审查, 如果插件有高危行为, 那也不会过审;</p><p>再其次, uTools 大部分用户是程序员, 如果我真的在代码里藏了&quot;毒&quot;, 那他们也有办法发现, 如果你真的对你的隐私十分关心, 可以选择从<a href="https://githubcom/ZiuChen/ClipboardManager" target="_blank" rel="noreferrer">开源仓库</a>下载代码自行构建</p><h2 id="开源版本和插件市场版本的区别" tabindex="-1">开源版本和插件市场版本的区别? <a class="header-anchor" href="#开源版本和插件市场版本的区别" aria-label="Permalink to &quot;开源版本和插件市场版本的区别?&quot;">​</a></h2><p>开源版本后续将只提供必要的BUG修复, 不再添加新功能</p><ul><li>开源版本: 包含<strong>完整的基本功能</strong>, 可以自行构建开源版本, 通过安装离线插件方式使用</li><li>市场版本: 包含<strong>后续更新的新功能</strong>、<strong>插件会员功能</strong>, 可以直接从插件应用市场安装</li></ul><h2 id="为什么不开源了-为什么要开始收费" tabindex="-1">为什么不开源了, 为什么要开始收费? <a class="header-anchor" href="#为什么不开源了-为什么要开始收费" aria-label="Permalink to &quot;为什么不开源了, 为什么要开始收费?&quot;">​</a></h2><p>目前由我个人维护的开源版本已经趋于稳定, 可以满足绝大部分场景的需求</p><ul><li>代码开源的出发点不是为了让不愿付费的人白嫖开发者的劳动, 而是为开发提供更多的经验和思路, 开源的代码已经启发了一些开发者上架了自己的剪贴板插件应用</li><li>开发和维护插件需要时间和精力, 插件付费可以鼓励我更积极的更新</li><li>目前插件内已有的基本功能都不会转为收费, 可以放心使用</li></ul>',27)]))}const b=e(t,[["render",i]]);export{u as __pageData,b as default};