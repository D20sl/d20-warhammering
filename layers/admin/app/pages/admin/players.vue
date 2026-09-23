<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'Gestione giocatori' });

const { data, pending: loading, refresh } = useFetchApi('/api/admin/players');

const columns: TableColumn<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { class: { td: 'font-semibold' } },
  },
  {
    id: 'linked',
    header: 'Collegamento a Keycloak',
    meta: { class: { th: 'w-60 text-center', td: 'text-center' } },
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center', td: 'text-center' } },
  },
];

const deletingName = ref<string>();

const toast = useToast();

async function deletePlayer(name: string, close: () => void) {
  deletingName.value = name;

  const { success } = await fetchApi(
    `/api/admin/players/${encodeURIComponent(name)}`,
    { method: 'DELETE' },
  );

  deletingName.value = undefined;

  if (!success) return;

  toast.add({ title: 'Giocatore eliminato' });

  refresh();
  close();
}
</script>

<template>
  <AdminTable :data :columns :loading searchable>
    <template #linked-cell="{ row }">
      <UBadge
        v-if="row.original.keycloakId"
        variant="soft"
        color="success"
        label="Collegato"
      />
      <UBadge v-else variant="soft" color="error" label="Scollegato" />
    </template>

    <template #actions-cell="{ row }">
      <ConfirmModal
        :description="`Confermi di voler eliminare ${row.original.name}? Verranno cancellate anche tutte le sue partite.`"
        confirm-text="Elimina"
        confirm-color="secondary"
        :confirm-pending="deletingName === row.original.name"
        @confirm="(close) => deletePlayer(row.original.name, close)"
      >
        <UTooltip text="Elimina">
          <UButton color="dark" :icon="AppIcons.DELETE" />
        </UTooltip>
      </ConfirmModal>
    </template>
  </AdminTable>
</template>
