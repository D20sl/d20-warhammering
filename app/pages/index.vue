<script setup lang="ts">
useHead({
  title: 'Home',
});

definePageMeta({
  layout: {
    name: 'default',
    props: { isHome: true },
  },
});

const { loggedIn } = useUserSession();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <UButton to="/ranking" size="xl" :icon="AppIcons.TROPHY_OUTLINE">
      Classifica Lega
    </UButton>

    <BattleFormModal v-if="loggedIn">
      <UButton size="xl" color="secondary" :icon="AppIcons.SWORDS_OUTLINE">
        Registra partita
      </UButton>
    </BattleFormModal>
  </div>
</template>
