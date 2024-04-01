import i18n, { type InitOptions } from 'i18next'
import { logger as baseLogger } from '../../utils'
import { initReactI18next } from 'react-i18next'
import { type Locale } from 'antd/es/locale'

const logger = baseLogger.getSubLogger('I18nConfig')

function I18nConfig() {
  let _lang = ''
  let _bootstrapped = false
  const _configuration: {
    resources: InitOptions['resources']
    antdLocales: Record<string, Locale>
  } = {
    resources: {},
    antdLocales: {},
  }

  const initialize = async (lang: string) => {
    logger.debug(`Start initialize i18n for ${lang}`)

    _lang = lang

    const [resourcesModule, antdLocalesModule] = await Promise.all([
      import('./i18n-resources'),
      import('../antd-locales'),
    ])
    const resources = resourcesModule.default
    const antdLocales = antdLocalesModule.default

    _configuration.resources = resources
    _configuration.antdLocales = antdLocales

    await i18n.use(initReactI18next).init({
      lng: lang,
      fallbackLng: 'en-US',
      resources,
      keySeparator: false,
      supportedLngs: Object.keys(resources),
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })

    logger.debug(`Success initialize i18n for ${lang}`)
  }

  return {
    get configuration() {
      return _configuration
    },
    changeLanguage: async (lang: string = 'en-US') => {
      if (!_bootstrapped) {
        _bootstrapped = true
        await initialize(lang)
      }

      if (lang !== _lang) {
        _lang = lang
        logger.debug(`Change i18n to ${lang}`)
        await i18n.changeLanguage(lang)
      }
    },
  }
}

const i18nConfig = I18nConfig()

export default i18nConfig
