<script setup lang="ts">
const props = defineProps<{
  seasons?: Season[];
}>();

// Can't use undefined: a removal of the season wouldn't update on the DB.
const model = defineModel<string | null>();

const selected = computed(() =>
  props.seasons?.find((s) => s.name === model.value),
);

const others = computed(() =>
  (props.seasons ?? []).filter((s) => s.name !== model.value),
);

const root = useTemplateRef('root');

function select(season: Season | null) {
  model.value = season?.name ?? null;
  root.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<template>
  <div
    v-if="seasons?.length"
    ref="root"
    class="flex scroll-mt-4 flex-col gap-4 text-sm sm:scroll-mt-6"
  >
    <section>
      <h3 class="mb-1 font-medium">Stagione selezionata</h3>

      <div
        class="flex h-32.5 overflow-hidden rounded-lg border border-accented"
      >
        <div class="flex w-32 shrink-0 items-center justify-center bg-black">
          <NuxtImg
            v-if="selected"
            :src="selected.coverImage"
            provider="none"
            class="aspect-video w-full object-contain"
          />
          <UIcon v-else :name="AppIcons.GLOBE" class="size-8 text-muted" />
        </div>

        <div
          class="flex min-w-0 flex-col items-start justify-between gap-2 p-3"
        >
          <div class="min-w-0 self-stretch">
            <p class="truncate font-semibold">
              {{ selected?.name ?? 'Nessuna stagione' }}
            </p>
            <p class="text-sm text-muted" :class="selected && 'line-clamp-2'">
              {{
                selected?.description ??
                'La partita non verrà associata ad una stagione.'
              }}
            </p>
          </div>

          <SeasonDetailsModal v-if="selected" :season="selected">
            <UButton size="xs" color="neutral" variant="outline">
              Dettagli
            </UButton>
          </SeasonDetailsModal>
        </div>
      </div>
    </section>

    <section>
      <h3 class="mb-1 font-medium">Altre stagioni</h3>

      <div class="grid grid-cols-2 gap-3">
        <!-- Touch screens have no hover, so tapping focuses the tile to show the overlay -->
        <div
          v-for="season in others"
          :key="season.name"
          role="group"
          :aria-label="season.name"
          tabindex="0"
          class="group relative aspect-video overflow-hidden rounded-lg border border-accented bg-black outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <NuxtImg
            :src="season.coverImage"
            provider="none"
            class="size-full object-contain"
          />

          <!-- pointer-events-none keeps the tap that reveals the overlay from also pressing a button under the finger.
               A mouse click also focuses the tile, so plain focus only opens the overlay on touch screens. -->
          <div
            class="pointer-events-none absolute inset-0 flex flex-col justify-center gap-1 sm:justify-between bg-black/80 p-2 opacity-0 transition-opacity group-focus-visible:pointer-events-auto group-focus-visible:opacity-100 group-has-focus-visible:pointer-events-auto group-has-focus-visible:opacity-100 pointer-coarse:group-focus-within:pointer-events-auto pointer-coarse:group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
          >
            <div class="hidden min-w-0 sm:block">
              <p class="truncate text-sm font-semibold">{{ season.name }}</p>
              <p class="truncate text-xs text-muted">
                {{ season.description }}
              </p>
            </div>

            <div
              class="flex flex-col gap-1 *:justify-center sm:flex-row sm:gap-2"
            >
              <UButton size="xs" @click="select(season)">Seleziona</UButton>
              <SeasonDetailsModal :season>
                <UButton size="xs" color="neutral" variant="outline">
                  Dettagli
                </UButton>
              </SeasonDetailsModal>
            </div>
          </div>
        </div>

        <button
          v-if="selected"
          type="button"
          class="flex aspect-video cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-accented bg-black text-sm text-muted transition-opacity hover:opacity-80"
          @click="select(null)"
        >
          <UIcon :name="AppIcons.GLOBE" class="size-8" />
          Nessuna stagione
        </button>
      </div>
    </section>
  </div>
</template>
