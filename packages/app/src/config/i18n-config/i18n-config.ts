import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

function I18nConfig() {
  let _bootstrapped = false

  const initialize = async (lang: string) => {
    const { default: resources } = await import('./i18n-resources')
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
  }

  return {
    get bootstrapped() {
      return _bootstrapped
    },
    changeLanguage: async (lang: string = 'en-US') => {
      if (!_bootstrapped) {
        _bootstrapped = true
        await initialize(lang)
      }
      return i18n.changeLanguage(lang)
    },
  }
}

const i18nConfig = I18nConfig()

export default i18nConfig
