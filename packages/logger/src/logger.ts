import { Logger as TsLogger, type ILogObj, type ISettingsParam } from 'tslog'

function Logger(options: ISettingsParam<ILogObj> = {}) {
  const defaultOptions = {
    ...options,
    prettyLogTemplate: '[{{logLevelName}}] {{dateIsoStr}} {{name}} ',
  }
  const instance = new TsLogger<ILogObj>(defaultOptions)

  return {
    debug: (...args: unknown[]) => {
      instance.debug(...args)
    },
    info: (...args: unknown[]) => {
      instance.info(...args)
    },
    warning: (...args: unknown[]) => {
      instance.warn(...args)
    },
    error: (...args: unknown[]) => {
      instance.error(...args)
    },
  }
}

export default Logger
