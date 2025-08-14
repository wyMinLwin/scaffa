<template>
  <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-12">
    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Palette class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">Beautiful UI</h3>
      </div>
      <p class="text-muted-foreground">
        Pre-built components using shadcn-vue and Tailwind CSS for beautiful, accessible interfaces.
      </p>
    </Card>

    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Zap class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">Fast Development</h3>
      </div>
      <p class="text-muted-foreground">
        Hot module replacement, TypeScript support, and modern build tools for rapid development.
      </p>
    </Card>

    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">Type Safe</h3>
      </div>
      <p class="text-muted-foreground">
        Full TypeScript integration with proper type definitions and compile-time error checking.
      </p>
    </Card>

    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Globe class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">Internationalization</h3>
      </div>
      <p class="text-muted-foreground">
        Built-in i18n support with Vue I18n for multi-language applications.
      </p>
    </Card>

    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Database class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">State Management</h3>
      </div>
      <p class="text-muted-foreground">
        Pinia for state management and TanStack Query for server state management.
      </p>
    </Card>

    <Card class="p-6">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Smartphone class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-semibold">Responsive</h3>
      </div>
      <p class="text-muted-foreground">
        Mobile-first responsive design that works beautifully on all device sizes.
      </p>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { Palette, Zap, Shield, Globe, Database, Smartphone } from 'lucide-vue-next'
</script>
