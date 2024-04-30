function numberToString(target: string | number | bigint, defaultValue = '0', onError?: (e: unknown) => void): string {
  try {
    if (typeof target === 'string') {
      return target
    }
    return target.toString()
  } catch (e) {
    onError?.(e)
    return defaultValue
  }
}

export default numberToString
