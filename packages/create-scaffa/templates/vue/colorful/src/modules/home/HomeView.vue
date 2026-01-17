<template>
  <div class="container py-6">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Features Grid -->
    <FeaturesGrid />

    <!-- API Demo Section -->
    <div class="py-12 border-t">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold">API Integration Demo</h2>
        <p class="text-muted-foreground mt-2">
          Test the built-in API integration with TanStack Query
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <LanguageSwitcher />
        <QuickAddProduct />
      </div>

      <!-- Products List -->
      <ProductsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeroSection from './chunks/HeroSection.vue'
import FeaturesGrid from './chunks/FeaturesGrid.vue'
import LanguageSwitcher from './chunks/LanguageSwitcher.vue'
import QuickAddProduct from './chunks/QuickAddProduct.vue'
import ProductsList from './chunks/ProductsList.vue'
</script>
