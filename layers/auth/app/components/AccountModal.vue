<script setup lang="ts">
const { user } = useUserSession();

const { data: account, pending } = useFetch('/api/account');

const defaultFaction = computed<string | undefined | null>({
  get: () => account.value?.defaultFaction,
  set: async (faction) => {
    const previous = account.value!;
    account.value = { ...previous, defaultFaction: faction ?? undefined };

    const { success } = await fetchApi('/api/account', {
      method: 'PATCH',
      body: { defaultFaction: faction ?? null },
    });

    if (!success) {
      account.value = previous;
      return;
    }

    refreshPlayerStats();
  },
});
</script>

<template>
  <UModal :title="user?.displayName" description="Il tuo account">
    <UButton
      size="sm"
      :icon="AppIcons.USER"
      color="dark"
      aria-label="Account"
      square
    >
      Account
    </UButton>

    <template #body>
      <UIcon
        v-if="pending"
        :name="AppIcons.SPINNER"
        class="size-12 block mx-auto"
      />

      <div v-else-if="account" class="space-y-6">
        <UFormField
          label="Fazione default"
          description="Verrà selezionata in automatico quando registri una partita, sia da te che dai tuoi avversari."
        >
          <USelectMenu
            v-model="defaultFaction"
            :items="FACTIONS"
            placeholder="Ultima fazione usata"
            clear
            class="w-full"
          />
        </UFormField>

        <dl class="space-y-3">
          <div class="flex justify-between gap-4">
            <dt class="text-muted">Fazione più usata</dt>
            <dd class="font-semibold text-right">
              {{ account.mostUsedFaction ?? '-' }}
            </dd>
          </div>

          <div class="flex justify-between gap-4">
            <dt class="text-muted">Win rate totale</dt>
            <dd class="font-semibold">
              {{ account.winRate == null ? '-' : `${account.winRate}%` }}
            </dd>
          </div>

          <div class="flex justify-between gap-4">
            <dt class="text-muted">Partite giocate</dt>
            <dd class="font-semibold">{{ account.battles }}</dd>
          </div>
        </dl>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-between w-full gap-2">
        <UButton
          :to="logoutUrl()"
          :icon="AppIcons.LOCK_OPEN"
          color="dark"
          external
        >
          Logout
        </UButton>

        <UButton :to="accountUrl()" :icon="AppIcons.EDIT" external>
          Modifica account
        </UButton>
      </div>
    </template>
  </UModal>
</template>
