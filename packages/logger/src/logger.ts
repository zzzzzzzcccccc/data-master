import { Logger as TsLogger, type ILogObj, type ISettingsParam } from 'tslog'

function Logger(options: ISettingsParam<ILogObj> = {}) {
  const defaultOptions = {
    ...options,
    prettyLogTemplate: '[{{logLevelName}}] {{dateIsoStr}} {{name}} ',
    prettyLogTimeZone: 'local',
  } as ISettingsParam<ILogObj>
  const instance = new TsLogger<ILogObj>(defaultOptions)

  const getLoggerInstance = (target: typeof instance) => {
    return {
      debug: (...args: unknown[]) => {
        target.debug(...args)
      },
      info: (...args: unknown[]) => {
        target.info(...args)
      },
      warning: (...args: unknown[]) => {
        target.warn(...args)
      },
      error: (...args: unknown[]) => {
        target.error(...args)
      },
    }
  }

  return {
    ...getLoggerInstance(instance),
    getSubLogger: (subName: string) => {
      const subInstance = instance.getSubLogger({ name: subName })
      return getLoggerInstance(subInstance)
    },
  }
}

export default Logger
