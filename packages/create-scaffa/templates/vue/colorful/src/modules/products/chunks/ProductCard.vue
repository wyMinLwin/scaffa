<template>
  <Card class="overflow-hidden hover:shadow-lg transition-shadow">
    <div class="aspect-square overflow-hidden bg-muted flex items-center justify-center relative">
      <img
        :src="getProductImage(product)"
        :alt="product.title"
        class="h-full w-full object-cover transition-transform hover:scale-105"
        @error="handleImageError"
      />
      <div
        class="fallback-icon text-muted-foreground hidden absolute inset-0 items-center justify-center"
      >
        <Package class="h-12 w-12" />
      </div>
    </div>
    <CardContent class="p-4">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <Badge variant="secondary">{{ product.category }}</Badge>
          <span class="text-sm text-muted-foreground">★ {{ product.rating }}</span>
        </div>
        <h3 class="font-semibold line-clamp-2">{{ product.title }}</h3>
        <p class="text-sm text-muted-foreground line-clamp-2">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <span class="text-lg font-bold">${{ product.price }}</span>
          <Badge :variant="product.stock > 0 ? 'default' : 'destructive'">
            {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-vue-next'
import { getProductImage } from '@/lib/images'

defineProps<{
  product: ProductType
}>()

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  const fallback = img.parentElement?.querySelector('.fallback-icon')

  if (fallback) {
    img.style.display = 'none'
    fallback.classList.remove('hidden')
    fallback.classList.add('flex')
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
