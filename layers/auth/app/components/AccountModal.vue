<script setup lang="ts">
const { user } = useUserSession();

const { data: account, pending } = useFetch('/api/account');
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

      <dl v-else-if="account" class="space-y-3">
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
