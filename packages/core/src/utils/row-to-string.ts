import getValueType from './get-value-type'
import dateToString from './date-to-string'

function rowToString(row: Record<string, unknown>) {
  if (!row) return row

  const keys = Object.keys(row)
  const len = keys.length
  const values: Record<string, unknown> = {}

  if (len <= 0) {
    return values
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const value = row[key]
    const valueType = getValueType(value)
    if (valueType === 'string') {
      values[key] = value
    } else if (['array', 'object'].indexOf(valueType) > -1) {
      values[key] = JSON.stringify(value)
    } else if (valueType === 'number') {
      values[key] = value?.toString?.() || value
    } else if (valueType === 'date') {
      values[key] = dateToString(value)
    } else {
      values[key] = value
    }
  }

  return values
}

export default rowToString
