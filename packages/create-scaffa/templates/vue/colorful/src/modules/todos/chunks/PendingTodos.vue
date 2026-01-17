<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Clock class="h-5 w-5" />
        Pending Tasks
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-2">
      <div v-if="pendingTodos.length === 0" class="text-center py-8 text-muted-foreground">
        <CheckCircle2 class="mx-auto h-8 w-8 mb-2" />
        <p>No pending tasks!</p>
      </div>
      <div
        v-for="todo in pendingTodos"
        :key="todo.id"
        class="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
      >
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('toggleTodo', todo.id)"
          class="h-5 w-5 p-0 rounded-full border-2 border-muted-foreground hover:border-primary"
        >
          <span class="sr-only">Mark as complete</span>
        </Button>
        <div class="flex-1">
          <p class="font-medium">{{ todo.title }}</p>
          <p v-if="todo.description" class="text-sm text-muted-foreground">
            {{ todo.description }}
          </p>
        </div>
        <Badge :variant="getPriorityVariant(todo.priority)">
          {{ todo.priority }}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('deleteTodo', todo.id)"
          class="h-8 w-8 p-0 text-destructive hover:text-destructive"
        >
          <Trash2 class="h-4 w-4" />
          <span class="sr-only">Delete todo</span>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button/Button.vue'
import { Clock, CheckCircle2, Trash2 } from 'lucide-vue-next'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

defineProps<{
  pendingTodos: Todo[]
}>()

defineEmits<{
  toggleTodo: [id: number]
  deleteTodo: [id: number]
}>()

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'destructive'
    case 'medium':
      return 'default'
    case 'low':
      return 'secondary'
    default:
      return 'secondary'
  }
}
</script>
