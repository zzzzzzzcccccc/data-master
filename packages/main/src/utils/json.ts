export function jsonToString<T>(target: T, defaultValue: string = '') {
  try {
    return JSON.stringify(target)
  } catch (e) {
    return defaultValue
  }
}

export function stringToJson<T>(target: string, defaultValue: T | null = null): T | null {
  try {
    return JSON.parse(target)
  } catch (e) {
    return defaultValue
  }
}
