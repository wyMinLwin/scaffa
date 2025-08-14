<template>
  <Card class="mt-8">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Package class="h-5 w-5" />
        Recent Products ({{ data?.length || 0 }})
      </CardTitle>
      <CardDescription> Products loaded from the API </CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="space-y-2">
        <Skeleton class="h-12 w-full" />
        <Skeleton class="h-12 w-full" />
        <Skeleton class="h-12 w-full" />
      </div>
      <div v-else class="space-y-2 max-h-64 overflow-y-auto">
        <div
          v-for="(product, index) in data?.slice(0, 10)"
          :key="product.id"
          class="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
        >
          <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span class="text-sm font-semibold">{{ index + 1 }}</span>
          </div>
          <div class="flex-1">
            <p class="font-medium">{{ product.title }}</p>
            <p class="text-sm text-muted-foreground">{{ product.category }}</p>
          </div>
          <Badge variant="secondary">${{ product.price }}</Badge>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import api from '@/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Package } from 'lucide-vue-next'

const { data, isLoading } = api.products.getProducts.useQuery()
</script>
