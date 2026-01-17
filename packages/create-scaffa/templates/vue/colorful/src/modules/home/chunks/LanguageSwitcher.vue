<template>
  <Card class="p-6">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Globe class="h-5 w-5" />
        Language Switcher
      </CardTitle>
      <CardDescription> {{ t('common.hello') }} - Switch between languages </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex gap-2">
        <Button
          variant="outline"
          @click="changeLanguage('en')"
          :class="{ 'border-black dark:border-red-200': locale === 'en' }"
        >
          English
        </Button>
        <Button
          variant="outline"
          @click="changeLanguage('mm')"
          :class="{ 'border-black dark:border-red-200': locale === 'mm' }"
        >
          Myanmar
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
import { Globe } from 'lucide-vue-next'

const { t, locale } = useI18n()

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('scaffa-locale', lang)
}
</script>
