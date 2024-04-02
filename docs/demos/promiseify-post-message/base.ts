import get from 'lodash-es/get'
import { FuncMap } from './types'
import { JSBridgeParams } from './sdk'

/**
 * 注册 SDK 基座
 */
export function registerBase(target: Window) {
  window.addEventListener('message', async (e) => {
    const params = e.data as JSBridgeParams<any>
    const namespace = params.namespace
    const action = params.action
    const callback = get(callbackMap, [namespace, action])
    if (callback) {
      const result = await callback(params.payload)
      target.postMessage(
        {
          params,
          result
        },
        '*'
      )
    }
  })
}

type Namespace = keyof FuncMap
type Action = keyof FuncMap[Namespace]
type Payload = FuncMap[Namespace][Action] extends { payload: infer P } ? P : never
type Result = FuncMap[Namespace][Action] extends { result: infer R } ? R : never

const callbackMap: Record<
  Namespace,
  {
    [key in Action]: (payload: Payload) => Result
  }
> = {
  user: {
    getUserToken: ({ userId }) => {
      return 'token:' + userId
    }
  }
}
