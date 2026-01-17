<template>
  <div class="flex flex-col items-center text-center space-y-4 py-12">
    <h1 class="text-4xl font-bold tracking-tight lg:text-6xl">
      Welcome to
      <span class="text-primary">Scaffa Vue</span>
    </h1>
    <p class="text-xl text-muted-foreground max-w-2xl">
      A modern Vue.js starter template with TypeScript, Tailwind CSS, shadcn-vue components, and
      best practices built-in.
    </p>
    <div class="flex gap-4 mt-6">
      <Button size="lg" @click="$router.push('/dashboard')"> Get Started </Button>
      <Button variant="outline" size="lg" @click="$router.push('/products')">
        View Products
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
</script>
