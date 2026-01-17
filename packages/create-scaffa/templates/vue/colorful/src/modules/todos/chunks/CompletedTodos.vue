<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <CheckCircle2 class="h-5 w-5" />
        Completed Tasks
      </CardTitle>
    </CardHeader>
    <CardContent class="space-y-2">
      <div v-if="completedTodos.length === 0" class="text-center py-8 text-muted-foreground">
        <Clock class="mx-auto h-8 w-8 mb-2" />
        <p>No completed tasks yet!</p>
      </div>
      <div
        v-for="todo in completedTodos"
        :key="todo.id"
        class="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors opacity-75"
      >
        <Button
          variant="ghost"
          size="sm"
          @click="$emit('toggleTodo', todo.id)"
          class="h-5 w-5 p-0 rounded-full bg-primary text-primary-foreground"
        >
          <Check class="h-3 w-3" />
          <span class="sr-only">Mark as incomplete</span>
        </Button>
        <div class="flex-1">
          <p class="font-medium line-through">{{ todo.title }}</p>
          <p v-if="todo.description" class="text-sm text-muted-foreground line-through">
            {{ todo.description }}
          </p>
        </div>
        <Badge variant="secondary"> Completed </Badge>
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
import { CheckCircle2, Clock, Check, Trash2 } from 'lucide-vue-next'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

defineProps<{
  completedTodos: Todo[]
}>()

defineEmits<{
  toggleTodo: [id: number]
  deleteTodo: [id: number]
}>()
</script>
