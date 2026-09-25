<script setup lang="ts">
const props = defineProps<{
  season: Season;
}>();

const { data: playerStats } = useFetchPlayerStats({ lazy: true });

const standings = computed(() =>
  getSeasonStandings(playerStats.value ?? [], props.season.name),
);

const podium = computed(() => standings.value.slice(0, 3));

const battleCount = computed(
  () =>
    // Each battle is listed once under each of its two players.
    new Set(standings.value.flatMap((s) => s.battles.map((b) => b.id))).size,
);

const PODIUM_COLORS = ['text-amber-300', 'text-blue-200', 'text-amber-500'];
</script>

<template>
  <UModal :title="season.name" fullscreen>
    <slot />

    <template #body>
      <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div class="flex flex-col gap-4 md:sticky md:top-0 md:self-start">
          <div class="aspect-video overflow-hidden rounded-lg bg-black">
            <NuxtImg
              :src="season.coverImage"
              provider="none"
              class="size-full object-contain"
            />
          </div>

          <dl class="space-y-3">
            <div class="flex justify-between">
              <dt class="text-muted">Inizio</dt>
              <dd class="font-semibold">
                {{ formatDate(season.startDate) || '-' }}
              </dd>
            </div>

            <div class="flex justify-between">
              <dt class="text-muted">Fine</dt>
              <dd class="font-semibold">
                {{ formatDate(season.endDate) || 'In corso' }}
              </dd>
            </div>

            <div class="flex justify-between">
              <dt class="text-muted">Partite giocate</dt>
              <dd class="font-semibold">
                {{ battleCount }}
              </dd>
            </div>
          </dl>

          <section>
            <h3 class="mb-3 font-semibold">Podio</h3>

            <ol v-if="podium.length" class="space-y-2">
              <li
                v-for="(player, index) in podium"
                :key="player.player"
                class="flex items-center gap-3 rounded-lg border border-accented p-3"
              >
                <UIcon
                  :name="AppIcons.TROPHY"
                  class="size-7 shrink-0"
                  :class="PODIUM_COLORS[index]"
                />
                <span class="min-w-0 flex-1 truncate font-semibold">
                  {{ player.player }}
                </span>
                <span class="shrink-0 text-sm text-muted">
                  {{ player.score }}
                  {{ player.score === 1 ? 'Punto' : 'Punti' }} Lega
                </span>
              </li>
            </ol>

            <p v-else class="text-sm text-muted">
              Nessuna partita registrata in questa stagione
            </p>
          </section>
        </div>

        <section>
          <h3 class="mb-3 font-semibold">Descrizione</h3>
          <p class="whitespace-pre-line text-muted">
            {{ season.description }}
          </p>
        </section>
      </div>
    </template>
  </UModal>
</template>
