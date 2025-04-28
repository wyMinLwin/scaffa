<script setup lang="ts">
import api from '@/api'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { useQueryClient } from '@tanstack/vue-query'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'

const { t, locale } = useI18n()
const changeLanguage = (lang: string) => {
  locale.value = lang
}

const queryClient = useQueryClient()

const { data, isLoading } = api.products.getProducts.useQuery()
const input = ref('')

const { mutate, isPending } = api.products.addProduct.useMutation({
  onSuccess: (product) => {
    queryClient.setQueryData(['products'], (oldData: ProductType[]) => {
      return [...oldData, product]
    })
    input.value = ''
    toast.success('Product added successfully!')
  },
})

const addProduct = () => {
  if (!input.value) return
  mutate({
    title: input.value,
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

    <div class="flex gap-2">
      <Input
        :disabled="isPending"
        class="w-40"
        v-model="input"
        placeholder="Type something..."
        aria-label="input field"
      />
      <Button :disabled="isPending" @click="addProduct()">Add Product</Button>
    </div>

    <br />

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(product, index) in data" :key="product.id">
        <p>{{ index + 1 + '.' + product.title }}</p>
      </div>
    </div>
  </section>
</template>
