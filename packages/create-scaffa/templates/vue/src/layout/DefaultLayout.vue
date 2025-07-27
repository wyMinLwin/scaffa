<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Navbar />
    <main class="container mx-auto px-4 py-6">
      <RouterView />
    </main>
  </div>
</template>
