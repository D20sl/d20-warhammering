<script setup lang="ts">
import noDataImage from '~/assets/img/no-data.webp';
</script>

<template>
  <img
    :src="noDataImage"
    alt="Nessun dato trovato"
    class="mx-auto block size-48 md:size-64"
  />
</template>
