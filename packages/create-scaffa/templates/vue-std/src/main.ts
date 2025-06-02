import '@/config/axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import mm from '@/locales/mm.json'

const i18n = createI18n({
  locale: localStorage.getItem('marko-locale') || 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    mm: mm,
  },
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)

app.mount('#app')
