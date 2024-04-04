export function validatorNumber(_: unknown, value: string) {
  if (!value) {
    return Promise.resolve()
  }
  if (!/^[+-]?\d+$/.test(value)) {
    return Promise.reject('must be a number')
  }
  return Promise.resolve()
}
