<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <TodosHeader @open-add-modal="openAddModal" />

      <TodosStats :todos="todos" :completed-todos="completedTodos" :pending-todos="pendingTodos" />

      <div class="grid gap-4 md:grid-cols-2">
        <PendingTodos
          :pending-todos="pendingTodos"
          @toggle-todo="toggleTodo"
          @delete-todo="deleteTodo"
        />
        <CompletedTodos
          :completed-todos="completedTodos"
          @toggle-todo="toggleTodo"
          @delete-todo="deleteTodo"
        />
      </div>
    </div>

    <AddTodoModal
      :show-add-modal="showAddModal"
      :new-todo="newTodo"
      @close="closeAddModal"
      @add-todo="addTodo"
      @update-todo="updateNewTodo"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import TodosHeader from './chunks/TodosHeader.vue'
import TodosStats from './chunks/TodosStats.vue'
import PendingTodos from './chunks/PendingTodos.vue'
import CompletedTodos from './chunks/CompletedTodos.vue'
import AddTodoModal from './chunks/AddTodoModal.vue'

interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

const todos = ref<Todo[]>([
  {
    id: 1,
    title: 'Complete project documentation',
    description: 'Write comprehensive docs for the Vue project',
    completed: false,
    priority: 'high',
    createdAt: new Date(),
  },
  {
    id: 2,
    title: 'Review pull requests',
    description: 'Check and approve pending PRs',
    completed: true,
    priority: 'medium',
    createdAt: new Date(),
  },
  {
    id: 3,
    title: 'Update dependencies',
    description: 'Upgrade to latest versions',
    completed: false,
    priority: 'low',
    createdAt: new Date(),
  },
])

const showAddModal = ref(false)
const newTodo = ref<{
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}>({
  title: '',
  description: '',
  priority: 'medium',
})

const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
const pendingTodos = computed(() => todos.value.filter((todo) => !todo.completed))

const openAddModal = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
  newTodo.value = {
    title: '',
    description: '',
    priority: 'medium',
  }
}

const updateNewTodo = (key: string, value: string) => {
  if (key === 'title') {
    newTodo.value.title = value
  } else if (key === 'description') {
    newTodo.value.description = value
  } else if (key === 'priority') {
    newTodo.value.priority = value as 'low' | 'medium' | 'high'
  }
}

const addTodo = () => {
  if (!newTodo.value.title) return

  const todo: Todo = {
    id: Date.now(),
    title: newTodo.value.title,
    description: newTodo.value.description,
    completed: false,
    priority: newTodo.value.priority,
    createdAt: new Date(),
  }

  todos.value.push(todo)
  closeAddModal()
  toast.success('Todo added successfully!')
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    toast.success(todo.completed ? 'Todo completed!' : 'Todo marked as pending')
  }
}

const deleteTodo = (id: number) => {
  const index = todos.value.findIndex((t) => t.id === id)
  if (index > -1) {
    todos.value.splice(index, 1)
    toast.success('Todo deleted successfully!')
  }
}
</script>
