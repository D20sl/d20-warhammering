<script setup lang="ts">
import type { ModalProps } from '@nuxt/ui';

const props = withDefaults(
  defineProps<
    Pick<ModalProps, 'description'> & {
      endpoint: `/api/${string}/${string}`;
    }
  >(),
  {
    description: 'Confermi di voler eliminare questo elemento dai record?',
  },
);

const emit = defineEmits<{
  delete: [];
}>();

const deleting = ref(false);
const toast = useToast();

async function deleteItem(close: () => void) {
  deleting.value = true;

  const { success } = await fetchApi(props.endpoint, {
    method: 'DELETE',
  });

  deleting.value = false;

  if (!success) return;

  toast.add({ title: 'Eliminazione riuscita' });

  emit('delete');
  close();
}
</script>

<template>
  <ConfirmModal
    :description
    confirm-text="Elimina"
    confirm-color="secondary"
    :confirm-pending="deleting"
    @confirm="deleteItem"
  >
    <UTooltip text="Elimina">
      <UButton color="dark" :icon="AppIcons.DELETE" />
    </UTooltip>
  </ConfirmModal>
</template>
