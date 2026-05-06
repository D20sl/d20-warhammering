<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'Gestione stagioni' });

const { data, pending: loading, refresh } = useFetchApi('/api/admin/seasons');

const columns: TableColumn<Season>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { class: { td: 'font-semibold' } },
  },
  {
    id: 'startDate',
    header: 'Inizio',
    accessorFn: (row) => formatDate(row.startDate),
    meta: { class: { th: 'w-35' } },
  },
  {
    id: 'endDate',
    header: 'Fine',
    accessorFn: (row) => formatDate(row.endDate),
    meta: { class: { th: 'w-35' } },
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center' } },
  },
];
</script>

<template>
  <AdminTable :data :columns :loading searchable>
    <template #body-bottom>
      <tr>
        <td colspan="100%">
          <div class="flex justify-end p-4 border-t border-t-accented">
            <SeasonFormModal @submit="refresh">
              <UButton :icon="AppIcons.GLOBE">Crea nuova stagione</UButton>
            </SeasonFormModal>
          </div>
        </td>
      </tr>
    </template>

    <template #name-cell="{ row }">
      <div class="flex gap-4 items-center">
        <NuxtImg
          :src="row.original.coverImage"
          width="75"
          height="50"
          fit="contain"
          class="rounded-lg"
        />
        {{ row.original.name }}
      </div>
    </template>

    <template #actions-cell="{ row }">
      <div class="flex justify-center gap-2">
        <SeasonFormModal :season="row.original" @submit="refresh">
          <UTooltip text="Modifica">
            <UButton color="dark" :icon="AppIcons.EDIT" />
          </UTooltip>
        </SeasonFormModal>

        <DeleteModalButton
          description="Confermi di voler eliminare questa stagione dai record?"
          :endpoint="`/api/admin/seasons/${row.original.name}`"
          @delete="refresh"
        />
      </div>
    </template>
  </AdminTable>
</template>
