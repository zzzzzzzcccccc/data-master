import { RpcRequestResponse } from '../types'

type Result<R> = Omit<RpcRequestResponse<R>, 'code'>

export async function safePromiseCall<R = unknown>(fn: () => Promise<R>): Promise<Result<R>> {
  try {
    const result = await fn()
    return { data: result, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export function safeCall<R = void>(fn: () => R): Result<R> {
  try {
    const result = fn()
    return { data: result, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
