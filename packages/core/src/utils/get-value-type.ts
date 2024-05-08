function getValueType<T>(value: T) {
  const type = Object.prototype.toString.call(value)
  const typeMapper: Record<string, string> = {
    '[object String]': 'string',
    '[object Number]': 'number',
    '[object BigInt]': 'number',
    '[object Boolean]': 'boolean',
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Date]': 'date',
  }

  return typeMapper[type] || 'unknown'
}

export default getValueType
