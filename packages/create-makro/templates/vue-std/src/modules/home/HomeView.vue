<script setup lang="ts">
import api from '@/api'
import Button from '@/components/ui/button/Button.vue'
import { useQueryClient } from '@tanstack/vue-query'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const changeLanguage = (lang: string) => {
  locale.value = lang
}

const queryClient = useQueryClient()

const { data, isLoading } = api.products.getProducts.useQuery()

const { mutate } = api.products.addProduct.useMutation({
  onSuccess: (product) => {
    queryClient.setQueryData(['products'], (oldData: any) => {
      return [...oldData, product]
    })
  },
})

const addProduct = () => {
  mutate({
    title: 'Test Product',
    description: 'Test',
    category: 'Test',
    price: 129.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 200,
    tags: ['test', 'testing'],
    brand: 'TestBrand',
    sku: 'TestSKU123',
    weight: 0.3, // in kg
    dimensions: {
      width: 18, // in cm
      height: 20, // in cm
      depth: 8, // in cm
    },
  })
}
</script>

<template>
  <section class="container">
    <h1>{{ t('common.hello') }}</h1>
    <p>Welcome to the Home page</p>
    <div class="flex gap-2">
      <Button @click="changeLanguage('en')">English</Button>
      <Button @click="changeLanguage('mm')">Myanmar</Button>
    </div>

    <br />

    <div>
      <Button @click="addProduct()">Add Product</Button>
    </div>

    <br />

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(product, index) in data" :key="product.id">
        <p>{{ index + ' ' + product.title }}</p>
      </div>
    </div>
  </section>
</template>
