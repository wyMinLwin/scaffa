<template>
  <div class="container py-6">
    <!-- Hero Section -->
    <div class="flex flex-col items-center text-center space-y-4 py-12">
      <h1 class="text-4xl font-bold tracking-tight lg:text-6xl">
        Welcome to
        <span class="text-primary">Scaffa Vue</span>
      </h1>
      <p class="text-xl text-muted-foreground max-w-2xl">
        A modern Vue.js starter template with TypeScript, Tailwind CSS, shadcn-vue components, and
        best practices built-in.
      </p>
      <div class="flex gap-4 mt-6">
        <Button size="lg" @click="$router.push('/dashboard')"> Get Started </Button>
        <Button variant="outline" size="lg" @click="$router.push('/products')">
          View Products
        </Button>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-12">
      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Palette class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">Beautiful UI</h3>
        </div>
        <p class="text-muted-foreground">
          Pre-built components using shadcn-vue and Tailwind CSS for beautiful, accessible
          interfaces.
        </p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">Fast Development</h3>
        </div>
        <p class="text-muted-foreground">
          Hot module replacement, TypeScript support, and modern build tools for rapid development.
        </p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">Type Safe</h3>
        </div>
        <p class="text-muted-foreground">
          Full TypeScript integration with proper type definitions and compile-time error checking.
        </p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">Internationalization</h3>
        </div>
        <p class="text-muted-foreground">
          Built-in i18n support with Vue I18n for multi-language applications.
        </p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Database class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">State Management</h3>
        </div>
        <p class="text-muted-foreground">
          Pinia for state management and TanStack Query for server state management.
        </p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Smartphone class="h-6 w-6 text-primary" />
          </div>
          <h3 class="text-lg font-semibold">Responsive</h3>
        </div>
        <p class="text-muted-foreground">
          Mobile-first responsive design that works beautifully on all device sizes.
        </p>
      </Card>
    </div>

    <!-- API Demo Section -->
    <div class="py-12 border-t">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">API Integration Demo</h2>
        <p class="text-muted-foreground mt-2">
          Test the built-in API integration with TanStack Query
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <Card class="p-6">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <Globe class="h-5 w-5" />
              Language Switcher
            </CardTitle>
            <CardDescription> {{ t('common.hello') }} - Switch between languages </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex gap-2">
              <Button
                variant="outline"
                @click="changeLanguage('en')"
                :class="{ 'border-black dark:border-red-200': locale === 'en' }"
              >
                English
              </Button>
              <Button
                variant="outline"
                @click="changeLanguage('mm')"
                :class="{ 'border-black dark:border-red-200': locale === 'mm' }"
              >
                Myanmar
              </Button>
            </div>
          </CardContent>
        </Card>

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
              <Input v-model="input" placeholder="Enter product name..." :disabled="isPending" />
              <Button @click="addProduct" :disabled="isPending || !input" class="w-full">
                {{ isPending ? 'Adding...' : 'Add Product' }}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <!-- Products List -->
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { useI18n } from 'vue-i18n'
import { toast } from 'vue-sonner'
import api from '@/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Palette, Zap, Shield, Globe, Database, Smartphone, Package } from 'lucide-vue-next'

const { t, locale } = useI18n()
const queryClient = useQueryClient()

const changeLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('scaffa-locale', lang)
}

const { data, isLoading } = api.products.getProducts.useQuery()
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
