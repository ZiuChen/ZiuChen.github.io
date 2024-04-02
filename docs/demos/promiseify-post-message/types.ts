/**
 * 基座与 SDK 共享同一份类型定义
 */
export interface BridgeMap {
  user: {
    getUserToken: {
      payload: { userId: string }
      result: string
    }
  }
}
