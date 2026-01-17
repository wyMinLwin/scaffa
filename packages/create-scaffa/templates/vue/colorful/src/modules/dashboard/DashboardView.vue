<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground">Welcome to your dashboard overview</p>
      </div>

      <StatsCards />

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RecentProducts />
        <RecentActivity />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsCards from './chunks/StatsCards.vue'
import RecentProducts from './chunks/RecentProducts.vue'
import RecentActivity from './chunks/RecentActivity.vue'
</script>
