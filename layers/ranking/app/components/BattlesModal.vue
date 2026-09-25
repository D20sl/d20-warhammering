<script setup lang="ts">
defineProps<{
  stats: PlayerStats;
}>();
</script>

<template>
  <UModal :title="stats.player" description="Lista battaglie">
    <slot />

    <template #body>
      <div class="space-y-4">
        <BattleInfo
          v-for="battle of stats.battles"
          :key="battle.id"
          :player="stats.player"
          :battle
        />
      </div>
    </template>
  </UModal>
</template>
