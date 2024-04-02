import { v4 as uuidV4 } from 'uuid'

export function generateUUID(replaceValue = /-/g, replaceWith = '') {
  return uuidV4().replace(replaceValue, replaceWith)
}
