<template>
  <div
    v-if="showAddModal"
    class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    @click.self="$emit('close')"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Todo</CardTitle>
        <CardDescription>Create a new task to stay organized</CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div>
          <label class="text-sm font-medium">Task Title</label>
          <Input
            :model-value="newTodo.title"
            @update:model-value="(value: string | number) => updateTodo('title', String(value))"
            placeholder="Enter task title"
            aria-label="Task title"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Description (optional)</label>
          <Input
            :model-value="newTodo.description"
            @update:model-value="
              (value: string | number) => updateTodo('description', String(value))
            "
            placeholder="Enter task description"
            aria-label="Task description"
          />
        </div>
        <div>
          <label class="text-sm font-medium">Priority</label>
          <select
            :value="newTodo.priority"
            @change="updateTodo('priority', ($event.target as HTMLSelectElement).value)"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Task priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </CardContent>
      <CardFooter class="flex gap-2">
        <Button variant="outline" @click="$emit('close')"> Cancel </Button>
        <Button @click="$emit('addTodo')" :disabled="!newTodo.title"> Add Todo </Button>
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
  newTodo: {
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
  }
}>()

const emit = defineEmits<{
  close: []
  addTodo: []
  updateTodo: [key: string, value: string]
}>()

const updateTodo = (key: string, value: string) => {
  emit('updateTodo', key, value)
}
</script>
