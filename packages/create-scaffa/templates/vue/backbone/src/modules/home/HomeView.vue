<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import api from '@/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const { t, locale } = useI18n()
const input = ref('')
const queryClient = useQueryClient()

const changeLanguage = (lng: string) => {
  locale.value = lng
  localStorage.setItem('scaffa-locale', lng)
}

const { data: products, isLoading: productsLoading } = api.products.getProducts.useQuery()
const { data: todos, hasNextPage, fetchNextPage } = api.todos.getTodos.useInfiniteQuery()

const addProductMutation = api.products.addProduct.useMutation({
  onSuccess: (data) => {
    toast.success('Product added successfully')
    queryClient.setQueryData(['products'], (oldData: ProductType[] | undefined) => {
      return oldData ? [...oldData, data] : [data]
    })
    input.value = ''
  },
})

const addProduct = () => {
  if (!input.value) {
    toast.error('Please enter a product name')
    return
  }
  addProductMutation.mutate({
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
    weight: 0.3,
    dimensions: {
      width: 18,
      height: 20,
      depth: 8,
    },
  })
}
</script>

<template>
  <div>
    <h1>Template: vue-backbone</h1>
    <p>Tech Stack: Vue + Shadcn Vue</p>
    <p>{{ t('common.hello') }}</p>
    <div class="flex gap-2">
      <Button @click="changeLanguage('en')">English</Button>
      <Button @click="changeLanguage('mm')">Myanmar</Button>
    </div>

    <div class="flex space-x-2 my-3">
      <Input
        v-model="input"
        :disabled="addProductMutation.isPending.value"
        class="w-[200px]"
        placeholder="Product Name"
      />
      <Button :disabled="addProductMutation.isPending.value" @click="addProduct">
        Add Product
      </Button>
    </div>

    <h2>Products</h2>
    <div v-if="productsLoading">Loading...</div>
    <div v-else>
      <div v-for="item in products" :key="item.id">{{ item.id }}. {{ item.title }}</div>
    </div>

    <hr class="my-5" />

    <h2>Todos</h2>
    <div>
      <div v-for="(todo, todoIndex) in todos" :key="todo.id">
        {{ todoIndex + 1 }} . {{ todo.todo }}
      </div>
    </div>
    <Button v-if="hasNextPage" @click="() => fetchNextPage()">Next</Button>
    <span v-else>No more data...</span>
  </div>
</template>
