<template>
  <div>
    <Toaster />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Toaster } from "@/components/ui/toast";
</script>

<style scoped></style>
