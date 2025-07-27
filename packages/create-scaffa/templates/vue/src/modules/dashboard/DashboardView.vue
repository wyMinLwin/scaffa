<template>
  <div class="container py-6">
    <div class="flex flex-col space-y-4">
      <div>
        <h1 class="text-3xl font-bold">Dashboard</h1>
        <p class="text-muted-foreground">Welcome to your dashboard overview</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Total Products</CardTitle>
            <Package class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ data?.length || 0 }}</div>
            <p class="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Active Users</CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+2350</div>
            <p class="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Sales</CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+12,234</div>
            <p class="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">Active Now</CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+573</div>
            <p class="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card class="col-span-4">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>You have {{ data?.length || 0 }} products in total.</CardDescription>
          </CardHeader>
          <CardContent>
            <div v-if="isLoading" class="space-y-2">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-full" />
            </div>
            <div v-else class="space-y-4">
              <div v-for="product in data?.slice(0, 5)" :key="product.id" class="flex items-center">
                <Avatar class="h-9 w-9">
                  <AvatarImage :src="getProductImage(product)" :alt="product.title" />
                  <AvatarFallback>{{ product.title.charAt(0).toUpperCase() }}</AvatarFallback>
                </Avatar>
                <div class="ml-4 space-y-1">
                  <p class="text-sm font-medium leading-none">{{ product.title }}</p>
                  <p class="text-sm text-muted-foreground">{{ product.category }}</p>
                </div>
                <div class="ml-auto font-medium">
                  <Badge variant="secondary">${{ product.price }}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Package, Users, CreditCard, Activity } from 'lucide-vue-next'
import { getProductImage } from '@/lib/images'

const { data, isLoading } = api.products.getProducts.useQuery()
</script>
