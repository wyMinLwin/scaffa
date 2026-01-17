<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <ProductsHeader v-model:search-query="searchQuery" @open-add-modal="openAddModal" />

      <ProductsGrid
        :filtered-products="filteredProducts"
        :is-loading="isLoading"
        :search-query="searchQuery"
      />
    </div>

    <AddProductModal
      :show-add-modal="showAddModal"
      :new-product="newProduct"
      :is-pending="isPending"
      @close="closeAddModal"
      @add-product="addProduct"
      @update-product="updateNewProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import api from '@/api'
import ProductsHeader from './chunks/ProductsHeader.vue'
import ProductsGrid from './chunks/ProductsGrid.vue'
import AddProductModal from './chunks/AddProductModal.vue'

const queryClient = useQueryClient()
const { data, isLoading } = api.products.getProducts.useQuery()

const searchQuery = ref('')
const showAddModal = ref(false)
const newProduct = ref({
  title: '',
  description: '',
  category: '',
  price: 0,
})

const filteredProducts = computed(() => {
  if (!data.value || !searchQuery.value) return data.value || []

  return data.value.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const { mutate, isPending } = api.products.addProduct.useMutation({
  onSuccess: (product) => {
    queryClient.setQueryData(['products'], (oldData: ProductType[]) => {
      return [...(oldData || []), product]
    })
    closeAddModal()
    toast.success('Product added successfully!')
  },
  onError: () => {
    toast.error('Failed to add product')
  },
})

const openAddModal = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
  newProduct.value = {
    title: '',
    description: '',
    category: '',
    price: 0,
  }
}

const updateNewProduct = (key: string, value: string | number) => {
  if (key === 'title') {
    newProduct.value.title = String(value)
  } else if (key === 'description') {
    newProduct.value.description = String(value)
  } else if (key === 'category') {
    newProduct.value.category = String(value)
  } else if (key === 'price') {
    newProduct.value.price = Number(value)
  }
}

const addProduct = () => {
  if (!newProduct.value.title) return

  mutate({
    title: newProduct.value.title,
    description: newProduct.value.description,
    category: newProduct.value.category,
    price: newProduct.value.price,
    discountPercentage: 0,
    rating: 4.5,
    stock: 100,
    tags: [newProduct.value.category],
    brand: 'Custom',
    sku: `SKU${Date.now()}`,
    weight: 0.5,
    dimensions: {
      width: 10,
      height: 10,
      depth: 10,
    },
  })
}
</script>
