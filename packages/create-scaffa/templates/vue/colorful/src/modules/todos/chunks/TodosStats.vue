<template>
  <div class="grid gap-4 md:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Total Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold">{{ todos.length }}</div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Completed</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-green-600">{{ completedTodos.length }}</div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle class="text-sm font-medium text-muted-foreground">Pending</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-2xl font-bold text-orange-600">{{ pendingTodos.length }}</div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

defineProps<{
  todos: Todo[]
  completedTodos: Todo[]
  pendingTodos: Todo[]
}>()
</script>
