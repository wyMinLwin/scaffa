<template>
  <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <Card v-for="i in 8" :key="i">
      <CardContent class="p-4">
        <Skeleton class="h-48 w-full mb-4" />
        <Skeleton class="h-4 w-3/4 mb-2" />
        <Skeleton class="h-4 w-1/2" />
      </CardContent>
    </Card>
  </div>

  <div
    v-else-if="filteredProducts.length > 0"
    class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
  </div>

  <div v-else class="text-center py-12">
    <Package class="mx-auto h-12 w-12 text-muted-foreground" />
    <h3 class="mt-4 text-lg font-semibold">No products found</h3>
    <p class="text-muted-foreground">
      {{
        searchQuery
          ? 'Try adjusting your search query.'
          : 'Get started by adding your first product.'
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Package } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'

defineProps<{
  filteredProducts: ProductType[]
  isLoading: boolean
  searchQuery: string
}>()
</script>
