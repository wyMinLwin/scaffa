<template>
  <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center mx-auto">
      <div class="mr-4 hidden md:flex">
        <RouterLink to="/" class="mr-6 flex items-center space-x-2">
          <span class="hidden font-bold sm:inline-block">{{ appName }}</span>
        </RouterLink>
        <nav class="flex items-center space-x-6 text-sm font-medium">
          <RouterLink
            to="/"
            class="transition-colors hover:text-foreground/80"
            :class="route.path === '/' ? 'text-foreground' : 'text-foreground/60'"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/dashboard"
            class="transition-colors hover:text-foreground/80"
            :class="route.path === '/dashboard' ? 'text-foreground' : 'text-foreground/60'"
          >
            Dashboard
          </RouterLink>
          <RouterLink
            to="/products"
            class="transition-colors hover:text-foreground/80"
            :class="route.path === '/products' ? 'text-foreground' : 'text-foreground/60'"
          >
            Products
          </RouterLink>
          <RouterLink
            to="/todos"
            class="transition-colors hover:text-foreground/80"
            :class="route.path === '/todos' ? 'text-foreground' : 'text-foreground/60'"
          >
            Todos
          </RouterLink>
        </nav>
      </div>

      <!-- Mobile menu button -->
      <Button
        variant="ghost"
        class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        @click="showMobileMenu = !showMobileMenu"
      >
        <Menu class="h-6 w-6" />
        <span class="sr-only">Toggle Menu</span>
      </Button>

      <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div class="w-full flex-1 md:w-auto md:flex-none">
          <!-- Add search or other components here -->
        </div>
        <nav class="flex items-center space-x-2">
          <ThemeToggle />
          <Avatar class="h-8 w-8">
            <AvatarImage
              src="https://via.placeholder.com/32x32/f3f4f6/6b7280?text=U"
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="showMobileMenu" class="border-b md:hidden">
      <nav class="container grid gap-2 p-4">
        <RouterLink
          to="/"
          class="block px-2 py-1 text-lg font-semibold"
          @click="showMobileMenu = false"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/dashboard"
          class="block px-2 py-1 text-lg font-semibold"
          @click="showMobileMenu = false"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/products"
          class="block px-2 py-1 text-lg font-semibold"
          @click="showMobileMenu = false"
        >
          Products
        </RouterLink>
        <RouterLink
          to="/todos"
          class="block px-2 py-1 text-lg font-semibold"
          @click="showMobileMenu = false"
        >
          Todos
        </RouterLink>
      </nav>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ThemeToggle from '@/components/ThemeToggle.vue'

const route = useRoute()
const showMobileMenu = ref(false)
const appName = 'Scaffa Vue'
</script>
