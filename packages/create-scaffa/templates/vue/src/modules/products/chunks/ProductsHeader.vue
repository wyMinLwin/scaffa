<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Products</h1>
      <p class="text-muted-foreground">Manage your product inventory</p>
    </div>
    <div class="flex gap-2">
      <Input
        :model-value="searchQuery"
        @update:model-value="handleSearchUpdate"
        placeholder="Search products..."
        class="w-[250px]"
        aria-label="Search products"
      />
      <Button @click="$emit('openAddModal')">
        <Plus class="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Plus } from 'lucide-vue-next'

defineProps<{
  searchQuery: string
}>()

const emit = defineEmits<{
  openAddModal: []
  'update:searchQuery': [value: string]
}>()

const handleSearchUpdate = (value: string | number) => {
  emit('update:searchQuery', String(value))
}
</script>
