export function jsonToString<T>(target: T, defaultValue: string = '', onError?: (e: unknown) => void): string {
  try {
    return JSON.stringify(target)
  } catch (e) {
    onError?.(e)
    return defaultValue
  }
}

export function stringToJson<T>(target: string, defaultValue: T, onError?: (e: unknown) => void): T {
  try {
    return JSON.parse(target)
  } catch (e) {
    onError?.(e)
    return defaultValue
  }
}
