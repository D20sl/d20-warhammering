<script setup lang="ts">
import type { NuxtError } from '#app';

useHead({
  title: 'Error',
});

defineProps<{ error: NuxtError }>();
</script>

<template>
  <UError
    class="h-svh"
    :error
    :clear="{ to: '/', external: true }"
    :ui="{
      statusCode: 'text-white bg-secondary px-3 py-2 rounded-md',
    }"
  />
</template>
