<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold">Todo List</h1>
      <p class="text-muted-foreground">Manage your tasks and stay organized</p>
    </div>
    <Button @click="$emit('openAddModal')">
      <Plus class="mr-2 h-4 w-4" />
      Add Todo
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Plus } from 'lucide-vue-next'

defineEmits<{
  openAddModal: []
}>()
</script>
