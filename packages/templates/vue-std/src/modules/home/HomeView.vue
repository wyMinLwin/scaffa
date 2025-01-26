<script setup lang="ts">
import api from '@/api';
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
      <button class="bg-yellow-400 text-black h-8 px-2 rounded-md font-medium" @click="changeLanguage('en')">English</button>
      <button class="bg-yellow-400 text-black h-8 px-2 rounded-md font-medium" @click="changeLanguage('mm')">Myanmar</button>
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

