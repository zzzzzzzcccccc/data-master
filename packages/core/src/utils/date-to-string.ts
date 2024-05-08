function dateToString<T>(target: T, defaultMethod = 'toString', onError?: (e: unknown) => void) {
  try {
    // @ts-ignore
    const date = new Date(target)
    // @ts-ignore
    return date[defaultMethod]()
  } catch (e) {
    onError?.(e)
    return 'date to string some error'
  }
}

export default dateToString
