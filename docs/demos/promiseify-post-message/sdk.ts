import { FuncMap } from './types'

export interface JSBridgeParams<T extends keyof FuncMap> {
  namespace: T
  action: keyof FuncMap[T]
  payload: FuncMap[T][keyof FuncMap[T]] extends { payload: infer P } ? P : never
}

/**
 * 注册 SDK 应用
 */
export function registerSdk() {
  window.addEventListener('message', messageHandler)
}

const postMessageCallbackMap = new Map()

function messageHandler({ data, type }: MessageEvent) {
  if (type === 'message') {
    const { params, result } = data
    const key = [params.namespace, params.action, params.id].join('.')
    const callback = postMessageCallbackMap.get(key)
    if (callback) {
      callback(result)
      postMessageCallbackMap.delete(key)
    }
  }
}

let uniqueId = 0

export function postMessage<T extends keyof FuncMap>(
  params: JSBridgeParams<T>
): Promise<FuncMap[T][keyof FuncMap[T]] extends { result: infer R } ? R : never> {
  return new Promise((resolve) => {
    if (window.parent) {
      const id = uniqueId++
      const key = [params.namespace, params.action, id].join('.')
      postMessageCallbackMap.set(key, resolve)
      const _params = structuredClone(params)
      // @ts-expect-error - id is private field.
      _params.id = id
      window.parent.postMessage(_params, '*')
    }
  })
}
