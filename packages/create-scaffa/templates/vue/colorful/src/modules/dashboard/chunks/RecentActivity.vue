<template>
  <Card class="col-span-3">
    <CardHeader>
      <CardTitle>Recent Activity</CardTitle>
      <CardDescription>Your recent activities and updates.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div class="flex items-center">
          <span class="flex h-2 w-2 rounded-full bg-sky-500"></span>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">Product added</p>
            <p class="text-sm text-muted-foreground">2 minutes ago</p>
          </div>
        </div>
        <div class="flex items-center">
          <span class="flex h-2 w-2 rounded-full bg-green-500"></span>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">User registered</p>
            <p class="text-sm text-muted-foreground">5 minutes ago</p>
          </div>
        </div>
        <div class="flex items-center">
          <span class="flex h-2 w-2 rounded-full bg-orange-500"></span>
          <div class="ml-4 space-y-1">
            <p class="text-sm font-medium leading-none">Order processed</p>
            <p class="text-sm text-muted-foreground">12 minutes ago</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>
