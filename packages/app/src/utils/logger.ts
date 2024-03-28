import Logger from '@db-gui/logger'

const logger = Logger({
  name: 'App',
  minLevel: +import.meta.env.VITE_LOG_LEVEL,
})

export default logger
