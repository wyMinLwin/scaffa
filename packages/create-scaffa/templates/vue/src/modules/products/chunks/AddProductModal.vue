<template>
  <div
    v-if="showAddModal"
    class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    @click.self="$emit('close')"
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
            :model-value="newProduct.title"
            @update:model-value="updateProduct('title', $event)"
            placeholder="Enter product name"
            :disabled="isPending"
            aria-label="Product name"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Description</label>
          <Input
            :model-value="newProduct.description"
            @update:model-value="updateProduct('description', $event)"
            placeholder="Enter product description"
            :disabled="isPending"
            aria-label="Product description"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Category</label>
          <Input
            :model-value="newProduct.category"
            @update:model-value="updateProduct('category', $event)"
            placeholder="Enter category"
            :disabled="isPending"
            aria-label="Product category"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Price</label>
          <Input
            :model-value="newProduct.price"
            @update:model-value="updateProduct('price', Number($event))"
            type="number"
            step="0.01"
            placeholder="0.00"
            :disabled="isPending"
            aria-label="Product price"
          />
        </div>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Button variant="outline" @click="$emit('close')" :disabled="isPending"> Cancel </Button>
        <Button @click="$emit('addProduct')" :disabled="isPending || !newProduct.title">
          {{ isPending ? 'Adding...' : 'Add Product' }}
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

defineProps<{
  showAddModal: boolean
  newProduct: {
    title: string
    description: string
    category: string
    price: number
  }
  isPending: boolean
}>()

const emit = defineEmits<{
  close: []
  addProduct: []
  updateProduct: [key: string, value: string | number]
}>()

const updateProduct = (key: string, value: string | number) => {
  emit('updateProduct', key, value)
}
</script>
