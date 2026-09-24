<script setup lang="ts">
useHead({
  title: 'Admin',
});
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <h1 class="text-xl text-center flex justify-center items-center gap-2">
        <UIcon :name="AppIcons.SETTINGS" class="mt-0.5" />
        Admin Dashboard
      </h1>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 *:justify-center">
        <UButton
          to="/admin/battles"
          size="xl"
          color="dark"
          :icon="AppIcons.SWORDS"
        >
          Partite
        </UButton>

        <UButton
          to="/admin/players"
          size="xl"
          color="dark"
          :icon="AppIcons.USER"
        >
          Giocatori
        </UButton>

        <UButton
          to="/admin/seasons"
          size="xl"
          color="dark"
          :icon="AppIcons.GLOBE_FILL"
        >
          Stagioni
        </UButton>

        <UButton disabled size="xl" color="dark" :icon="AppIcons.VIDEOGAME">
          Categorie
        </UButton>
      </div>
    </div>
  </UCard>
</template>
