import { RpcRequestResponse } from '../types'

type Result<R> = Omit<RpcRequestResponse<R>, 'code'> & { isError: boolean }

export async function safePromiseCall<R = unknown>(
  fn: () => Promise<R>,
  onError?: (error: unknown) => void,
): Promise<Result<R>> {
  try {
    const result = await fn()
    return { data: result, error: null, isError: false }
  } catch (error) {
    onError?.(error)
    return { data: null, error, isError: true }
  }
}

export function safeCall<R = void>(fn: () => R, onError?: (error: unknown) => void): Result<R> {
  try {
    const result = fn()
    return { data: result, error: null, isError: false }
  } catch (error) {
    onError?.(error)
    return { data: null, error, isError: true }
  }
}
