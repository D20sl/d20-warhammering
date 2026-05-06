<script setup lang="ts" generic="T extends TableData">
import type { TableData, TableProps, TableSlots } from '@nuxt/ui';

const { searchable, searchPlaceholder, ...props } = defineProps<
  Omit<
    TableProps<T>,
    'loading' | 'loadingColor' | 'loadingAnimation' | 'sticky'
  > & {
    pending?: TableProps<T>['loading'];
    pendingColor?: TableProps<T>['loadingColor'];
    pendingAnimation?: TableProps<T>['loadingAnimation'];
    searchable?: boolean;
    searchPlaceholder?: string;
  }
>();

defineSlots<TableSlots<T>>();

const ui = useMergedSlotClasses(props.ui, {
  td: 'text-white',
  base: 'table-fixed',
  thead: 'h-15',
});

const globalFilter = ref('');
</script>

<template>
  <UTable
    v-bind="props"
    v-model:global-filter="globalFilter"
    :loading="pending"
    :loading-color="pendingColor"
    :loading-animation="pendingAnimation"
    :ui
    class="w-full bg-night rounded-lg"
    sticky
  >
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name v-bind="slotData" />
    </template>

    <template v-if="searchable" #body-top>
      <tr class="sticky top-15 bg-default/75 backdrop-blur z-1">
        <td colspan="100%">
          <div class="px-1 py-2 border-b border-b-accented">
            <SearchInput
              v-model="globalFilter"
              :placeholder="searchPlaceholder"
            />
          </div>
        </td>
      </tr>
    </template>

    <template #loading>Caricamento...</template>
    <template #empty>
      {{ data ? 'La ricerca non ha prodotto risultati' : 'Nessun dato' }}
    </template>
  </UTable>
</template>
