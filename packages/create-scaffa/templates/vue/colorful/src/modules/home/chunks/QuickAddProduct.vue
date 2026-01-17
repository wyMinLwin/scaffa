<template>
  <Card class="p-6">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Package class="h-5 w-5" />
        Quick Add Product
      </CardTitle>
      <CardDescription> Add a new product to test the API integration </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-3">
        <Input
          v-model="input"
          placeholder="Enter product name..."
          :disabled="isPending"
          aria-label="Product name input"
        />
        <Button @click="addProduct" :disabled="isPending || !input" class="w-full">
          {{ isPending ? 'Adding...' : 'Add Product' }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import api from '@/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Package } from 'lucide-vue-next'

const queryClient = useQueryClient()
const input = ref('')

const { mutate, isPending } = api.products.addProduct.useMutation({
  onSuccess: (product) => {
    queryClient.setQueryData(['products'], (oldData: ProductType[]) => {
      return [...(oldData || []), product]
    })
    input.value = ''
    toast.success('Product added successfully!')
  },
  onError: () => {
    toast.error('Failed to add product')
  },
})

const addProduct = () => {
  if (!input.value) return
  mutate({
    title: input.value,
    description: 'Sample product description',
    category: 'Sample Category',
    price: 29.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 100,
    tags: ['sample', 'demo'],
    brand: 'Sample Brand',
    sku: `SKU${Date.now()}`,
    weight: 0.5,
    dimensions: {
      width: 10,
      height: 10,
      depth: 5,
    },
  })
}
</script>
