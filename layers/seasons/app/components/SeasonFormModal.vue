<script setup lang="ts">
import { parseDate, type CalendarDate } from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui';
import type * as v from 'valibot';

const props = defineProps<{
  season?: Season;
}>();

const emit = defineEmits<{
  submit: [];
}>();

type SeasonFormState = v.InferInput<typeof seasonFormSchema>;

function getDefaultState(): Partial<SeasonFormState> {
  return {
    name: props.season?.name ?? '',
    description: props.season?.description ?? '',
    startDate: props.season?.startDate,
    endDate: props.season?.endDate,
    coverImage: undefined,
  };
}

const state = ref<Partial<SeasonFormState>>(getDefaultState());

async function fetchCoverImageFile(url: string): Promise<File | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const blob = await res.blob();
    const filename = url.split('/').pop() || 'cover';
    return new File([blob], filename, { type: blob.type });
  } catch {
    return;
  }
}

async function resetForm() {
  state.value = getDefaultState();

  if (props.season?.coverImage) {
    const file = await fetchCoverImageFile(props.season.coverImage);
    if (file) state.value.coverImage = file;
  }
}

const startDate = computed<CalendarDate | undefined>({
  get: () =>
    state.value.startDate ? parseDate(state.value.startDate) : undefined,
  set: (val) => (state.value.startDate = val?.toString()),
});

const endDate = computed<CalendarDate | undefined>({
  get: () => (state.value.endDate ? parseDate(state.value.endDate) : undefined),
  set: (val) => (state.value.endDate = val?.toString()),
});

const toast = useToast();

const isEditMode = computed(() => !!props.season?.name);
const loading = ref(false);
const open = ref(false);

async function onSubmit(event: FormSubmitEvent<SeasonFormState>) {
  const { coverImage, ...rest } = event.data;

  const body = new FormData();
  body.append('data', JSON.stringify(rest));
  body.append('coverImage', coverImage!);

  loading.value = true;

  const { success } = await fetchApi(
    '/api/admin/seasons' + (isEditMode.value ? `/${props.season!.name}` : ''),
    {
      method: isEditMode.value ? 'PUT' : 'POST',
      body,
    },
  );

  loading.value = false;

  if (!success) return;

  toast.add({
    title: 'Stagione registrata',
    color: 'success',
  });

  open.value = false;

  emit('submit');
}
</script>

<template>
  <FormModal
    v-model:open="open"
    title="Registra stagione"
    :description="`La stagione verrà ${isEditMode ? 'modificata nel' : 'aggiunta al'} database`"
    :state
    :schema="seasonFormSchema"
    :loading
    @open="resetForm"
    @submit="onSubmit"
  >
    <slot />

    <template #fields>
      <UFormField label="Nome" name="name" required>
        <UInput v-model="state.name" autofocus class="max-w-full w-75" />
      </UFormField>

      <UFormField label="Descrizione" name="description" required>
        <UTextarea
          v-model="state.description"
          :rows="5"
          autoresize
          class="max-w-full w-75"
        />
      </UFormField>

      <UFormField label="Immagine di copertina" name="coverImage" required>
        <UFileUpload
          v-model="state.coverImage"
          accept="image/jpeg, image/png, image/webp"
          label="Droppa qui la foto"
          description="JPG, PNG, o WEBP"
          class="max-w-full w-75"
        />
      </UFormField>

      <UFormField label="Inizio" name="startDate">
        <InputDate v-model="startDate" class="w-50" />
      </UFormField>

      <UFormField label="Fine" name="endDate">
        <InputDate v-model="endDate" class="w-50" />
      </UFormField>
    </template>
  </FormModal>
</template>
