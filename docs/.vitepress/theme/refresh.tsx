import { Button, notification } from 'ant-design-vue'

let lastHashmap: any = null

/**
 * 定期拉取 hashmap.json 文件
 * 如果有更新则弹出提醒刷新页面
 */
export function refresh() {
  // SSR or DEV 下不需要检查更新
  if (import.meta.env.SSR || import.meta.env.DEV) {
    return
  }

  loop()
}

/**
 * 每隔 5 分钟检查一次
 */
async function loop() {
  setTimeout(() => {
    loop()
  }, 1000 * 60 * 5)

  const res = await fetch('/hashmap.json').then((res) => res.json())

  if (!lastHashmap) {
    lastHashmap = res
    return
  }

  if (diff(lastHashmap, res)) {
    lastHashmap = res

    const lastCheckUpdate = localStorage.getItem('last-check-update')

    // 一小时内不重复提醒
    if (lastCheckUpdate && new Date().getTime() - Number(lastCheckUpdate) < 1000 * 60 * 60) {
      return
    }

    notification.info({
      message: '文档有更新',
      description: '请刷新页面以获取最新文档',
      btn: (
        <Button type="primary" onClick={() => window.location.reload()}>
          刷新页面
        </Button>
      )
    })

    localStorage.setItem('last-check-update', new Date().getTime().toString())
  }
}

/**
 * 比较两个对象的差异
 * 浅层比较
 */
function diff(o1: any, o2: any) {
  const keys = Object.keys(o1)
  const keys2 = Object.keys(o2)
  if (keys.length !== keys2.length) {
    return true
  }
  for (const key of keys) {
    if (o1[key] !== o2[key]) {
      return true
    }
  }
  return false
}
