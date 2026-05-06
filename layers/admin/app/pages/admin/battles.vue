<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

useHead({ title: 'Gestione battaglie' });

const { data, pending, refresh } = useFetchApi('/api/admin/battles');

const columns: TableColumn<Battle>[] = [
  {
    id: 'date',
    header: 'Data',
    accessorFn: (row) => formatDate(row.date),
    meta: { class: { th: 'w-30' } },
  },
  {
    accessorFn: (row) => `${row.player1}\n${row.player2}`,
    id: 'players',
    header: 'Giocatori',
    meta: { class: { th: 'w-100' } },
  },
  {
    id: 'points',
    header: 'Punti',
    meta: { class: { th: 'w-30' } },
  },
  {
    accessorFn: (row) => `${row.player1Faction}\n${row.player2Faction}`,
    id: 'factions',
    header: 'Fazioni',
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center' } },
  },
];

function getWinner({ original: battle }: TableRow<Battle>) {
  if (battle.player1Points > battle.player2Points) return 1;
  if (battle.player1Points < battle.player2Points) return 2;
  return 0;
}
</script>

<template>
  <AdminTable
    :data
    :columns
    :pending
    :ui="{ td: 'space-x-2' }"
    searchable
    search-placeholder="Cerca giocatore, fazione o data..."
  >
    <template #date-header="{ column }">
      <UButton
        color="neutral"
        variant="ghost"
        :icon="getSortIcon(column.getIsSorted())"
        @click="handleTableColumnSorting(column)"
      >
        Data
      </UButton>
    </template>

    <template #players-cell="{ row }">
      <UBadge
        :icon="
          {
            0: BattleOutcomeIcons.TIE,
            1: BattleOutcomeIcons.WIN,
            2: BattleOutcomeIcons.LOSS,
          }[getWinner(row)]
        "
      >
        {{ row.original.player1 }}
      </UBadge>

      <UBadge
        color="secondary"
        :icon="
          {
            0: BattleOutcomeIcons.TIE,
            1: BattleOutcomeIcons.LOSS,
            2: BattleOutcomeIcons.WIN,
          }[getWinner(row)]
        "
      >
        {{ row.original.player2 }}
      </UBadge>
    </template>

    <template #points-cell="{ row }">
      <UBadge>{{ row.original.player1Points }}</UBadge>
      <UBadge color="secondary">{{ row.original.player2Points }}</UBadge>
    </template>

    <template #factions-cell="{ row }">
      <UBadge>{{ row.original.player1Faction }}</UBadge>
      <UBadge color="secondary">{{ row.original.player2Faction }}</UBadge>
    </template>

    <template #actions-cell="{ row }">
      <div class="flex justify-center gap-2">
        <BattleFormModal :battle="row.original" @submit="refresh">
          <UTooltip text="Modifica">
            <UButton color="dark" :icon="AppIcons.EDIT" />
          </UTooltip>
        </BattleFormModal>

        <DeleteModalButton
          description="Confermi di voler eliminare questa partita dai record?"
          :endpoint="`/api/admin/battles/${row.original.id}`"
          @delete="refresh"
        />
      </div>
    </template>
  </AdminTable>
</template>
