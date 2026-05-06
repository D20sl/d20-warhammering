<script setup lang="ts">
useHead({
  title: 'Classifica',
});

const { data: stats, pending: pendingStats } = useFetchApi(
  '/api/player-stats',
  { lazy: true },
);

const { data: seasons, pending: pendingSeasons } = useFetchApi('/api/seasons', {
  lazy: true,
});

const season = ref<Season>();

const items = computed<PlayerStats[]>(() =>
  (stats.value ?? []).filter((s) => {
    if (!s.battles.length) return false;

    if (season.value) {
      const seasonMatch = s.battles.some(
        (b) => b.season === season.value?.name,
      );

      if (!seasonMatch) return false;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return true;

    const playerMatch = s.player.toLowerCase().includes(searchTerm);
    if (playerMatch) return true;

    const factionMatch = s.factions.some((f) =>
      f.name.toLowerCase().includes(searchTerm),
    );
    if (factionMatch) return true;

    return false;
  }),
);

async function scrollIntoAccordionItem(indexStr?: string | string[]) {
  const index = +indexStr!;
  if (Number.isNaN(index)) return;

  await delay(50);

  document
    .querySelector('.ranking-' + index)
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const searchInput = ref('');
</script>

<template>
  <UCard class="overflow-auto w-full" :ui="{ body: 'pt-0! pb-2! space-y-2' }">
    <div class="filters">
      <div>
        <SearchInput
          v-model="searchInput"
          placeholder="Cerca giocatore o fazione..."
        />
      </div>

      <div class="flex gap-2 items-center">
        <USelectMenu
          v-model="season"
          :items="seasons"
          :filter-fields="['name', 'description']"
          :loading="pendingSeasons"
          :disabled="pendingSeasons"
          label-key="name"
          placeholder="Stagione"
          class="w-50 shrink-0"
          clear
        />

        <span v-if="season" class="truncate text-muted text-sm min-w-0 flex-1">
          {{ season.description }}
        </span>
      </div>
    </div>

    <UIcon
      v-if="pendingStats"
      :name="AppIcons.SPINNER"
      class="size-20 block mx-auto mt-4 mb-2"
    />

    <UAccordion
      v-else-if="items.length"
      value-key="player"
      label-key="player"
      :items
      :unmount-on-hide="false"
      :ui="{ label: 'text-lg truncate' }"
      @update:model-value="scrollIntoAccordionItem"
    >
      <template #leading="{ index }">
        <UIcon
          v-if="index < 3"
          :name="AppIcons.TROPHY"
          size="28px"
          class="shrink-0"
          :class="['text-amber-300', 'text-blue-200', 'text-amber-500'][index]"
        />
        <span v-else class="text-lg">{{ index + 1 }}.</span>
      </template>

      <template #body="{ item, index }">
        <RankingInfo :stats="item" :class="'ranking-' + index" />
      </template>
    </UAccordion>

    <p v-else class="text-muted text-sm text-center py-4">
      {{
        stats?.length
          ? 'La ricerca non ha prodotto risultati'
          : 'Nessun dato disponibile'
      }}
    </p>
  </UCard>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.filters {
  @apply sticky top-0 -mx-4 bg-night z-10 mb-0;

  & > div {
    @apply p-2 border-b border-b-accented;
  }
}
</style>
