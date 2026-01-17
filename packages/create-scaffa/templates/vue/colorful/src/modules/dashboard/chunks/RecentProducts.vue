<template>
  <Card class="col-span-4">
    <CardHeader>
      <CardTitle>Recent Products</CardTitle>
      <CardDescription>You have {{ data?.length || 0 }} products in total.</CardDescription>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="space-y-2">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
      </div>
      <div v-else class="space-y-4">
        <div v-for="product in data?.slice(0, 5)" :key="product.id" class="flex items-center">
          <Avatar class="h-9 w-9">
            <AvatarImage :src="getProductImage(product)" :alt="product.title" />
            <AvatarFallback>{{ product.title.charAt(0).toUpperCase() }}</AvatarFallback>
          </Avatar>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">{{ product.title }}</p>
            <p class="text-sm text-muted-foreground">{{ product.category }}</p>
          </div>
          <div class="ml-auto font-medium">
            <Badge variant="secondary">${{ product.price }}</Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import api from '@/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getProductImage } from '@/lib/images'

const { data, isLoading } = api.products.getProducts.useQuery()
</script>
