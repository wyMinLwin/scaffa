<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Todo List</h1>
          <p class="text-muted-foreground">Manage your tasks and stay organized</p>
        </div>
        <Button @click="openAddModal">
          <Plus class="mr-2 h-4 w-4" />
          Add Todo
        </Button>
      </div>

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

      <div class="grid gap-4 md:grid-cols-2">
        <!-- Pending Todos -->
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
                @click="toggleTodo(todo.id)"
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
                @click="deleteTodo(todo.id)"
                class="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 class="h-4 w-4" />
                <span class="sr-only">Delete todo</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <!-- Completed Todos -->
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
                @click="toggleTodo(todo.id)"
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
                @click="deleteTodo(todo.id)"
                class="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 class="h-4 w-4" />
                <span class="sr-only">Delete todo</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Add Todo Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
      @click.self="closeAddModal"
    >
      <Card class="w-full max-w-md">
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
          <CardDescription>Create a new task to stay organized</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div>
            <label class="text-sm font-medium">Task Title</label>
            <Input v-model="newTodo.title" placeholder="Enter task title" />
          </div>
          <div>
            <label class="text-sm font-medium">Description (optional)</label>
            <Input v-model="newTodo.description" placeholder="Enter task description" />
          </div>
          <div>
            <label class="text-sm font-medium">Priority</label>
            <select
              v-model="newTodo.priority"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </CardContent>
        <CardFooter class="flex gap-2">
          <Button variant="outline" @click="closeAddModal"> Cancel </Button>
          <Button @click="addTodo" :disabled="!newTodo.title"> Add Todo </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import { Plus, Clock, CheckCircle2, Check, Trash2 } from 'lucide-vue-next'

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
const newTodo = ref({
  title: '',
  description: '',
  priority: 'medium' as const,
})

const completedTodos = computed(() => todos.value.filter((todo) => todo.completed))
const pendingTodos = computed(() => todos.value.filter((todo) => !todo.completed))

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
