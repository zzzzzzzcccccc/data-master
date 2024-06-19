import Logger from '@dm/logger'
import { APP_NAME, jsonToString } from '@dm/core'
import * as electron from 'electron'
import { createStream, type RotatingFileStream } from 'rotating-file-stream'
import { type ILogObj, type ILogObjMeta } from 'tslog'

const options = {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  compress: 'gzip', // compress rotated files
}

let mainStream: RotatingFileStream | null = null
let renderStream: RotatingFileStream | null = null

const formatLog = (log: ILogObj & ILogObjMeta) => {
  const { _meta, ...logs } = log
  const meta = _meta
  const name = [...(meta?.parentNames || []), meta?.name || 'unknown name'].filter(Boolean).join(':')
  const msg =
    Object.values(logs || {})
      .map((v) => (['number', 'boolean', 'string'].includes(typeof v) ? v : jsonToString(v)))
      .join(' | ') || 'unknown msg'
  return `[${meta.logLevelName}] ${meta.date.toString()} ${name} ${msg}`
}

const createLogName = (fileName: string) => {
  const appPath = electron.app.getPath('appData') + `/${APP_NAME}`
  return `${appPath}/logs/${fileName}.log`
}

const logger = Logger({
  name: 'Main',
  minLevel: 0,
  attachedTransports: [
    (target) => {
      if (!mainStream) {
        mainStream = createStream(createLogName(`${new Date().toString()}-main`), options)
      }
      mainStream.write(`${formatLog(target)}\n`)
    },
  ],
})

const rendererLogger = Logger({
  name: 'Renderer',
  minLevel: 0,
  attachedTransports: [
    (target) => {
      if (!renderStream) {
        renderStream = createStream(createLogName(`${new Date().toString()}-renderer`), options)
      }
      renderStream.write(`${formatLog(target)}\n`)
    },
  ],
})

export { rendererLogger }

export default logger
