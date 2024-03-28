import { useTranslation as useI18nTranslation } from 'react-i18next'

export default function useTranslation() {
  const [t] = useI18nTranslation()

  return t
}
