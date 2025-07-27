<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Products</h1>
          <p class="text-muted-foreground">Manage your product inventory</p>
        </div>
        <div class="flex gap-2">
          <Input v-model="searchQuery" placeholder="Search products..." class="w-[250px]" />
          <Button @click="openAddModal">
            <Plus class="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div v-if="isLoading" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card v-for="i in 8" :key="i">
          <CardContent class="p-4">
            <Skeleton class="h-48 w-full mb-4" />
            <Skeleton class="h-4 w-3/4 mb-2" />
            <Skeleton class="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card
          v-for="product in filteredProducts"
          :key="product.id"
          class="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div
            class="aspect-square overflow-hidden bg-muted flex items-center justify-center relative"
          >
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
      </div>

      <div v-if="!isLoading && filteredProducts.length === 0" class="text-center py-12">
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
    </div>

    <!-- Add Product Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      @click.self="closeAddModal"
    >
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>Create a new product in your inventory</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium">Product Name</label>
            <Input
              v-model="newProduct.title"
              placeholder="Enter product name"
              :disabled="isPending"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Description</label>
            <Input
              v-model="newProduct.description"
              placeholder="Enter product description"
              :disabled="isPending"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Category</label>
            <Input
              v-model="newProduct.category"
              placeholder="Enter category"
              :disabled="isPending"
            />
          </div>
          <div>
            <label class="text-sm font-medium">Price</label>
            <Input
              v-model.number="newProduct.price"
              type="number"
              step="0.01"
              placeholder="0.00"
              :disabled="isPending"
            />
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button variant="outline" @click="closeAddModal" :disabled="isPending"> Cancel </Button>
          <Button @click="addProduct" :disabled="isPending || !newProduct.title">
            {{ isPending ? 'Adding...' : 'Add Product' }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import api from '@/api'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Package, Plus } from 'lucide-vue-next'
import { getProductImage } from '@/lib/images'

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
