
import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import mm from '@/locales/mm.json'

export const i18n = createI18n({
  locale: localStorage.getItem('scaffa-locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    mm: mm,
  },
})
