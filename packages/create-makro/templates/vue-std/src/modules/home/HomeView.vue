<script setup lang="ts">
import api from '@/api';
import Button from '@/components/ui/button/Button.vue';
import { useI18n } from 'vue-i18n';

  const {t, locale} = useI18n();
  const changeLanguage = (lang: string) => {
    locale.value = lang;
  };

  const {data,isLoading} = api.products.getProducts.useQuery();
</script>

<template>
  <section class="container">
    <h1>{{ t("common.hello") }}</h1>
    <p>Welcome to the Home page</p>
    <div class="flex gap-2">
      <Button @click="changeLanguage('en')">English</Button>
      <Button @click="changeLanguage('mm')">Myanmar</Button>
    </div>

    <br/>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="product in data" :key="product.id">
        <p>{{ product.title }}</p>
      </div>
    </div>
  </section>
</template>

