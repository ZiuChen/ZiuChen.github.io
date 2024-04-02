import { BridgeMap } from './types'

export interface JSBridgeParams<T extends keyof BridgeMap> {
  namespace: T
  action: keyof BridgeMap[T]
  payload: BridgeMap[T][keyof BridgeMap[T]] extends { payload: infer P } ? P : never
}

/**
 * 注册 SDK 应用
 */
export function registerSdk() {
  window.addEventListener('message', ({ data, type }: MessageEvent) => {
    if (type === 'message') {
      const { params, result } = data
      const key = `${params.namespace}.${params.action}_${params.id}`
      const callback = postMessageCallbackMap.get(key)
      if (callback) {
        callback(result)
        postMessageCallbackMap.delete(key)
      }
    }
  })
}

const postMessageCallbackMap = new Map()

let uniqueId = 0

export function postMessage<T extends keyof BridgeMap>(
  params: JSBridgeParams<T>
): Promise<BridgeMap[T][keyof BridgeMap[T]] extends { result: infer R } ? R : never> {
  return new Promise((resolve) => {
    if (window.parent) {
      const id = uniqueId++
      const key = `${params.namespace}.${String(params.action)}_${id}`
      postMessageCallbackMap.set(key, resolve)
      window.parent.postMessage(
        {
          id,
          ...params
        },
        '*'
      )
    }
  })
}
