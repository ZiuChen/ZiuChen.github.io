---
navbar: false
sidebar: auto
sidebarDepth: 2
---

# 使用指南

## 如何迁移数据

剪贴板数据存放在

- `Windows` `Linux`用户：`{home}\_utools_clipboard_manager_storage`
- `Mac`用户：`{userData}\_utools_clipboard_manager_storage`

要手动迁移数据，只需要在新设备上运行一次插件，而后将原设备上的数据文件拷贝并替换新设备中的数据文件即可

## 如何实现多端同步

::: warning
数据库文件默认是直接存放在用户文件夹根目录下的，如果需要使用同步功能，请使用插件内提供的`数据库路径自定义`功能，将数据库路径改为其他路径，而后才能通过下文中讲述的`同步文件夹`实现云同步。
:::

### 坚果云

到[坚果云官网](https://www.jianguoyun.com/#/)安装好软件后，找到`_utools_clipboard_manager_storage`文件所在的目录

右键目录，`坚果云`/`同步该文件夹`，将此文件夹加入到坚果云的同步服务中

![](./../assets/img2.png)

这样，每次剪贴板内容更新都将自动触发坚果云的同步服务，将剪贴板数据同步到云端

其他安装了坚果云的设备也将自动同步更新

![](../assets/img3.png)

### OneDrive

> 有待测试

## 如何创造自己的功能按钮

从`v1.4.0`起，插件为用户提供了自定义功能按钮的能力

这让`超级剪贴板`真正变得“超级”起来，用户可以通过编写`json`实现**携带数据跳转到任何其他插件**，这项功能给`超级剪贴板`带来了无限可能。

插件中，默认提供了若干使用样例：

- 讯飞OCR识别
- 百度搜索
- 百度识图
- 统计文本字数
- 颜色管理
- 识别图片中二维码
- 上传到图床
- 翻译

下面我将从这些样例出发对这项功能做简单介绍：

这项功能的原理是`utools.redirect()`，在不分离插件的情况下，在不同插件之间的跳转体验是连贯的。

以`百度搜索`为例，是通过`网页快开`提供的关键词实现的，我们可以编写以下json：

```json
{
  "id": "custom.1663490859",
  "title": "百度搜索",
  "icon": "🔍",
  "match": ["text"],
  "command": "redirect:百度一下"
}
```

可以实现从剪贴板直接跳转到`网页快开`，也即打开百度并搜索当前选中的文本内容。

除了使用简单的字符串匹配不同的内容，`超级剪贴板`还支持使用正则表达式，以`上传到图床`功能为例：

```json
{
  "id": "custom.1663490864",
  "title": "上传到图床",
  "icon": "🚀",
  "match": ["image", { "type": "file", "regex": ".(?:jpg|jpeg|png)$" }],
  "command": "redirect:上传到图床"
}
```

这个功能除了可以匹配图片，还可以将符合正则的图片文件匹配上，在匹配上的历史记录上展示`上传到图床`按钮，携带数据跳转到图床插件，一键上传。

- `id`: `String` 全局唯一 必须以`custom`开头 建议以时间戳为后缀
- `title`: `String` 鼠标悬停时展示的文本
- `icon`: `String` 展示在插件内的图标
- `match`: `<String | Object>[]` 匹配模式
- `command`: `String` 执行跳转的关键字 前缀`redirect:`是必须的

在未来的版本更新中，`超级剪贴板`将开放更多自定义功能给高级用户，帮助你更高效率的管理、使用剪贴板。


## 如何手动安装`clipboard-event-handler-linux`

如果你是Linux用户，并且剪贴板监听程序未能成功启动，请手动下载 `clipboard-event-handler-linux` 并将其移动到`usr/bin`目录下：

> 由于插件打包后缺少执行权限，无法正确执行剪贴板监听程序 `clipboard-event-handler-linux` 所以需要手动将此文件移出后添加执行权限

```sh
# 克隆仓库
git clone https://github.com/sudhakar3697/node-clipboard-event.git
cd node-clipboard-event/platform
# 修改文件执行权限
sudo chmod +x ./clipboard-event-handler-linux
# 拷贝文件至/usr/bin
sudo cp ./clipboard-event-handler-linux /usr/bin
```

参考：[https://github.com/sudhakar3697/node-clipboard-event/issues/10](https://github.com/sudhakar3697/node-clipboard-event/issues/10)
