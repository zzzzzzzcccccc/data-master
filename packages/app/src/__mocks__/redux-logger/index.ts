export function createLogger() {
  return () => (next: any) => (action: any) => {
    return next?.(action)
  }
}
